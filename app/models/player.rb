class Player < ActiveRecord::Base
  acts_as_authentic
  after_initialize :init_defaults
    
  has_many :games_players
  has_many :games, :through => :games_players

  def init_defaults
    self.rating  ||= 750
    self.wins    ||= 0
    self.losses  ||= 0
    self.ties    ||= 0
    self.color = "blue" if(!self.color || self.color.empty?)
  end
end
