class Game < ActiveRecord::Base
  after_initialize :init_defaults
    
  has_many :games_players
  has_many :players, :through => :games_players
  has_many :turns
  
  def init_defaults
    self.capacity ||= 2
    self.finished   = false if(!self.finished)
  end
end
