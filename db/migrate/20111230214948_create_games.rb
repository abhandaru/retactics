class CreateGames < ActiveRecord::Migration
  def self.up
    create_table :games do |t|
      t.integer :capacity
      t.datetime :start_time
      t.datetime :end_time
      t.boolean :finished
      t.integer :winner_id
      t.integer :turn_count

      t.timestamps
    end
  end

  def self.down
    drop_table :games
  end
end
