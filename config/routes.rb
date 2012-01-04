Retactics::Application.routes.draw do
  resources :players
  resources :turns
  resources :games
  resources :games_players
  resources :player_sessions
  
  match 'login' => 'player_sessions#new', :as => :login
  match 'logout' => 'player_sessions#destroy', :as => :logout
  match 'register' => 'players#new', :as => :register

  match 'profile' => 'profile#index', :as => :profile
  match 'arena' => 'arena#index'
  match 'lobby' => 'lobby#index'
  root :to => 'profile#index'
  
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action
end
