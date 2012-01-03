class CreateGamesPlayers < ActiveRecord::Migration
  def self.up
    create_table :games_players do |t|
      t.integer :player_id
      t.integer :game_id

      t.timestamps
    end
  end

  def self.down
    drop_table :games_players
  end
end
