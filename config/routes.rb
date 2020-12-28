Rails.application.routes.draw do

  devise_for :users, :controllers => { registrations: 'registrations'}
  root 'application#home'
  
  namespace :v1, defaults: { format: 'json' } do
    get 'cin', to: 'cin#search'
    get 'cin/search_history', to: 'cin#search_history' 
  end

  get '*page', to: 'application#home', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
