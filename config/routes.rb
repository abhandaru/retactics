Retactics::Application.routes.draw do
  resources :games_players

  resources :players
  resources :turns
  resources :games

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  match 'arena' => 'arena#index'
  match 'lobby' => 'lobby#index'
end
