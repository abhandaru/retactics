class CreateUnitLocations < ActiveRecord::Migration
  def self.up
    create_table :unit_locations do |t|
      t.integer :formation_id
      t.integer :unit_id
      t.integer :row
      t.integer :col

      t.timestamps
    end
  end

  def self.down
    drop_table :unit_locations
  end
end
