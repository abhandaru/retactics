class Player < ActiveRecord::Base
  acts_as_authentic
  
  has_many :games_players
  has_many :games, :through => :games_players
end
