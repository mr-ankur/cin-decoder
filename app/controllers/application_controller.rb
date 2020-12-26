class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  
  def home
    @default_props = {
      auth: {
        currentUser: current_user ? current_user.attributes.merge(
          last_sign_in_at: current_user.last_sign_in_at,
          current_sign_in_at: current_user.current_sign_in_at,
        ) : nil,
      },
    }
    respond_to do |format|
      format.html {render 'layouts/home' }
      format.any { redirect_to :root }
    end
  end
end
