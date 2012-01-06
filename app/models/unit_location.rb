class UnitLocation < ActiveRecord::Base
  belongs_to :formation
  belongs_to :unit
end
