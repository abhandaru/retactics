class LobbyController < ApplicationController
  
  def index
    redirect_to :root if(!current_player)
  end
  
  def updates
    updates = { }
    updates[:open_games] = Game.where(:finished => false)
    render :json => updates.to_json(:include => {
      :players => { :only => [:id, :username, :rating, :wins, :losses, :ties] }
    })
  end
  
end