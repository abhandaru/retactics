class CreatePlayers < ActiveRecord::Migration
  def self.up
    create_table :players do |t|
      t.string :username
      t.string :email
      t.string :crypted_password
      t.string :password_salt
      t.string :persistence_token
      
      t.integer :wins
      t.integer :losses
      t.integer :ties
      t.integer :rating
      t.string :color

      t.timestamps
    end
  end

  def self.down
    drop_table :players
  end
end
