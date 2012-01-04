class ProfileController < ApplicationController
  
  def index
    redirect_to :login if(!current_player)
  end
  
end