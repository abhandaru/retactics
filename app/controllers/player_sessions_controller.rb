class PlayerSessionsController < ApplicationController

  # GET /user_sessions/new
  # GET /user_sessions/new.xml
  def new
    @player_session = PlayerSession.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @player_session }
    end
  end

  # POST /user_sessions
  # POST /user_sessions.xml
  def create
    @player_session = PlayerSession.new(params[:player_session])

    respond_to do |format|
      if @player_session.save
        format.html { redirect_to(:profile, :notice => 'Login Successful!') }
        format.xml  { render :xml => @player_session, :status => :created, :location => @player_session }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @player_session.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /user_sessions/1
  # DELETE /user_sessions/1.xml
  def destroy
    @player_session = PlayerSession.find
    @player_session.destroy

    respond_to do |format|
      format.html { redirect_to(:root, :notice => 'You have been logged out.') }
      format.xml  { head :ok }
    end
  end
end
