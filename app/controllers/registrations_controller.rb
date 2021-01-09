class RegistrationsController < Devise::RegistrationsController

    before_action :configure_permitted_parameters

    def new
        super
    end

    def create
        super
    end

    protected

    def configure_permitted_parameters
        attributes = [:full_name, :role, :email]
        devise_parameter_sanitizer.permit(:sign_up, keys: attributes)
    end

end