class CreateTurns < ActiveRecord::Migration
  def self.up
    create_table :turns do |t|
      t.integer :game_id
      t.integer :number
      t.integer :player_id
      t.boolean :moved
      t.boolean :attacked
      t.boolean :turned
      t.integer :duration

      t.timestamps
    end
  end

  def self.down
    drop_table :turns
  end
end
