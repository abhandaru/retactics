class CreateFormations < ActiveRecord::Migration
  def self.up
    create_table :formations do |t|
      t.integer :player_id
      t.boolean :public
      t.text :notes

      t.timestamps
    end
  end

  def self.down
    drop_table :formations
  end
end
