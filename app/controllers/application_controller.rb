class ApplicationController < ActionController::Base
  def home
    respond_to do |format|
      format.html {render 'layouts/home' }
      format.any { redirect_to :root }
    end
  end
end
