Rails.application.routes.draw do
  root "pages#landing"
  
  # oauth
  get 'auth/github/callback', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
 

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
