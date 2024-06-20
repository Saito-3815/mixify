class ApplicationController < ActionController::API
  protected

  # セッションの有効期限を設定するヘルパーメソッド
  def update_session_expiration(is_persistent_param)
    is_persistent = ActiveModel::Type::Boolean.new.cast(is_persistent_param)
    request.session_options[:expire_after] = is_persistent ? 30.days : 1.hour
  end
end
