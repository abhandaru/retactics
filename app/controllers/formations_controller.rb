class FormationsController < ApplicationController
  # GET /formations
  # GET /formations.xml
  def index
    @formations = Formation.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @formations }
    end
  end

  # GET /formations/1
  # GET /formations/1.xml
  def show
    @formation = Formation.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @formation }
    end
  end

  # GET /formations/new
  # GET /formations/new.xml
  def new
    @formation = Formation.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @formation }
    end
  end

  # GET /formations/1/edit
  def edit
    @formation = Formation.find(params[:id])
  end

  # POST /formations
  # POST /formations.xml
  def create
    @formation = Formation.new(params[:formation])

    respond_to do |format|
      if @formation.save
        format.html { redirect_to(@formation, :notice => 'Formation was successfully created.') }
        format.xml  { render :xml => @formation, :status => :created, :location => @formation }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @formation.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /formations/1
  # PUT /formations/1.xml
  def update
    @formation = Formation.find(params[:id])

    respond_to do |format|
      if @formation.update_attributes(params[:formation])
        format.html { redirect_to(@formation, :notice => 'Formation was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @formation.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /formations/1
  # DELETE /formations/1.xml
  def destroy
    @formation = Formation.find(params[:id])
    @formation.destroy

    respond_to do |format|
      format.html { redirect_to(formations_url) }
      format.xml  { head :ok }
    end
  end
end
