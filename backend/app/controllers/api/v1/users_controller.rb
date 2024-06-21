require 'rspotify'

module Api
  module V1
    class UsersController < ApplicationController
      extend SpotifyAuth
      include SessionsHelper
      include UserLogin

      def show
        @user = User.find(params[:id])
        render json: @user, only: [:name, :introduction, :avatar]
      end

      def edit
        @user = User.find(params[:id])
        render json: @user, only: [:name, :introduction, :avatar]
      end

      # ユーザー作成
      # ユーザー作成時には、like_tunesも一緒に登録する
      def create
        decoded_code = Base64.decode64(spotify_login_params[:code])
        code_verifier = spotify_login_params[:code_verifier]
        tokens = SpotifyAuth.fetch_spotify_tokens(decoded_code, code_verifier)
        access_token = tokens[:access_token]
        refresh_token = tokens[:refresh_token]

        user_create_params = SpotifyAuth.fetch_authenticated_user_data(access_token)
        spotify_id = user_create_params[:spotify_id]
        SpotifyAuth.fetch_saved_tracks(spotify_id, access_token, user_create_params)

        existing_user = User.find_by(spotify_id: spotify_id)

        if existing_user
          update_result = update_user_and_like_tunes(existing_user, refresh_token, user_create_params)
          update_session_expiration(spotify_login_params[:is_persistent])

          render json: {
            user: update_result[:user].as_json(except: :refresh_token),
            session_id: update_result[:session_id]
          }, status: :ok
        else
          User.transaction do
            @user = User.create!(
              name: user_create_params[:name],
              avatar: user_create_params[:avatar],
              spotify_id: user_create_params[:spotify_id],
              refresh_token: refresh_token
            )

            user_create_params[:like_tunes].each do |like_tune|
              existing_record = Tune.find_by(spotify_uri: like_tune[:spotify_uri])

              if existing_record.nil?
                @user.like_tunes.create!(
                  name: like_tune[:name],
                  artist: like_tune[:artist],
                  album: like_tune[:album],
                  images: like_tune[:images],
                  spotify_uri: like_tune[:spotify_uri],
                  preview_url: like_tune[:preview_url],
                  added_at: like_tune[:added_at]
                )
              else
                @user.like_tunes << existing_record
              end
            end

            log_in(@user)
            update_session_expiration(spotify_login_params[:is_persistent])
          end

          render json: {
            user: @user.as_json(except: :refresh_token),
            session_id: session[:session_id]
          }, status: :created
        end
      rescue StandardError => e
        Rails.logger.error "An error occurred: #{e.message}"
        Rails.logger.error e.backtrace.join("\n")
        render json: { error: e.message }, status: :unprocessable_entity
      end

      def update
        @user = User.find(params[:id])
        if @user.update(user_update_params)
          render json: @user
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @user = User.find(params[:id])
        if current_user == @user
          reset_session
          session_key = "session:#{request.session_options[:id]}"
          RedisClient.current.del(session_key)
        end
        @user.destroy
        render json: { message: 'User deleted' }, status: :ok
      end

      private

      def spotify_login_params
        params.require(:user).permit(:code, :code_verifier, :is_persistent)
      end

      def user_update_params
        params.require(:user).permit(:name, :introduction, :avatar)
      end
    end
  end
end
