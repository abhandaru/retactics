# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)
units = Unit.create([
  { :name => "Knight" }
])

formations = Formation.create([
  { :player_id => 1, :public => true, :notes => "my first formation" },
  { :player_id => 2, :public => true, :notes => "my second formation" }  
])

unit_locations = UnitLocation.create([
  { :formation_id => 1, :unit_id => 1, :row => 2, :col => 6 },
  { :formation_id => 2, :unit_id => 1, :row => 3, :col => 7 } 
]);