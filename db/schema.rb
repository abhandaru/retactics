# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20111230223604) do

  create_table "games", :force => true do |t|
    t.integer  "turn_count"
    t.datetime "start_time"
    t.datetime "end_time"
    t.integer  "winner_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "players", :force => true do |t|
    t.string   "username"
    t.integer  "wins"
    t.integer  "losses"
    t.integer  "ties"
    t.integer  "rating"
    t.string   "color"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "turns", :force => true do |t|
    t.integer  "game_id"
    t.integer  "number"
    t.integer  "player_id"
    t.boolean  "moved"
    t.boolean  "attacked"
    t.boolean  "turned"
    t.integer  "duration"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
