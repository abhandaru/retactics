class Game < ActiveRecord::Base
  has_many :games_players
  has_many :players, :through => :games_players
  has_many :turns
end
