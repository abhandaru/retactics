class CreatePlayerSessions < ActiveRecord::Migration
  def self.up
    create_table :player_sessions do |t|
      t.timestamps
    end
  end

  def self.down
    drop_table :player_sessions
  end
end
