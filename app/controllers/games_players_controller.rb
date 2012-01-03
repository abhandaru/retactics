class GamesPlayersController < ApplicationController
  # GET /games_players
  # GET /games_players.xml
  def index
    @games_players = GamesPlayer.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @games_players }
    end
  end

  # GET /games_players/1
  # GET /games_players/1.xml
  def show
    @games_player = GamesPlayer.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @games_player }
    end
  end

  # GET /games_players/new
  # GET /games_players/new.xml
  def new
    @games_player = GamesPlayer.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @games_player }
    end
  end

  # GET /games_players/1/edit
  def edit
    @games_player = GamesPlayer.find(params[:id])
  end

  # POST /games_players
  # POST /games_players.xml
  def create
    @games_player = GamesPlayer.new(params[:games_player])

    respond_to do |format|
      if @games_player.save
        format.html { redirect_to(@games_player, :notice => 'Games player was successfully created.') }
        format.xml  { render :xml => @games_player, :status => :created, :location => @games_player }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @games_player.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /games_players/1
  # PUT /games_players/1.xml
  def update
    @games_player = GamesPlayer.find(params[:id])

    respond_to do |format|
      if @games_player.update_attributes(params[:games_player])
        format.html { redirect_to(@games_player, :notice => 'Games player was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @games_player.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /games_players/1
  # DELETE /games_players/1.xml
  def destroy
    @games_player = GamesPlayer.find(params[:id])
    @games_player.destroy

    respond_to do |format|
      format.html { redirect_to(games_players_url) }
      format.xml  { head :ok }
    end
  end
end
