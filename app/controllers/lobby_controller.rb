class LobbyController < ApplicationController
  
  def index
    redirect_to :root if(!current_player)
  end
  
  def updates
    updates = { }
    updates[:open_games] = Game.where(:winner_id => nil)
    render :json => updates.to_json(:include => {
      :players => { :only => [:username, :rating, :wins, :losses, :ties] }
    })
  end
  
end