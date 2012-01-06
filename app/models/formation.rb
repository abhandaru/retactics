class Formation < ActiveRecord::Base
  belongs_to :player
  has_many :unit_locations
  has_many :units, :through => :unit_locations
end
