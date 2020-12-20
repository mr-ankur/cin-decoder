Rails.application.routes.draw do

  root 'application#home'
  
  namespace :v1, defaults: { format: 'json' } do
    get 'cin', to: 'cin#index' 
    get 'cin/search_history', to: 'cin#search_history' 
  end

  get '*page', to: 'application#home', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
