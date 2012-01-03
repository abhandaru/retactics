# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)

players = Player.create([
  { :username => 'adu', :wins => 42, :losses => 2, :ties => 1, :rating => 1027, :color => 'blue' },
  { :username => 'nubber', :wins => 21, :losses => 26, :ties => 2, :rating => 730, :color => 'green' }
])