module Api
  module V1
    class CommunitiesController < ApplicationController
      include SessionsHelper
      include RenderUserJson

      def index
        @communities = Community.order(updated_at: :desc)
        @communities.each(&:update_avatar_url)
        render json: @communities
      end

      def show
        @community = Community.find(params[:id])
        @community.update_avatar_url
        # @communityのmembersのavatar_urlを取得
        @community.update_member_avatars
        render json: @community.as_json(
          include: ['members'],
          methods: [:playlist_tunes_count]
        )
      end

      def edit
        @community = Community.find(params[:id])
        @community.update_avatar_url
        render json: @community.as_json
      end

      def create
        @community = build_community
        if @community.save
          create_membership
          add_like_tunes_to_playlist
          current_user.update_avatar_url
          render json: {
            community: @community,
            user: current_user.as_json(
              except: [:refresh_token, :email, :password_digest],
              include: {
                communities: {
                  only: [:id]
                },
                like_tunes: {
                  only: [:id]
                },
                check_tunes: {
                  only: [:id]
                }
              }
            )
          }, status: :created
        else
          render json: @community.errors, status: :unprocessable_entity
        end
      end

      def update
        @community = Community.find(params[:id])
        # current_userがcommunityのメンバーに含まれているか確認
        return render json: { error: '権限がありません' }, status: :forbidden unless @community.members.include?(current_user)

        # リクエストに:communityが含まれている場合、community_paramsを更新
        if @community.update(community_params)
          @community.update_avatar_url
          render json: @community
        else
          render json: @community.errors, status: :unprocessable_entity
        end
      end

      def update_avatar
        @community = Community.find(params[:community_id])
        @community.avatar = params[:key]
        @community.save
        render json: @community, status: :ok
      end

      def destroy
        @community = Community.find(params[:id])
        @community.destroy
      end

      private

      def community_params
        params.require(:community).permit(:name, :introduction, :playlist_name)
      end

      def build_community
        Community.new(
          name: "#{current_user.name}のコミュニティ",
          introduction: "",
          avatar: "",
          playlist_name: "#{current_user.name}のプレイリスト"
        )
      end

      def create_membership
        @community.memberships.create(user_id: current_user.id)
      end

      # コミュニティに参加したmemberのlike_tunesをplaylistに追加
      def add_like_tunes_to_playlist
        if current_user&.like_tunes.present?
          current_user.like_tunes.each do |like_tune|
            Playlist.create(community_id: @community.id, tune_id: like_tune.id)
          end
        end
      end
    end
  end
end
