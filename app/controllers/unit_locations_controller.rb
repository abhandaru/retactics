class UnitLocationsController < ApplicationController
  # GET /unit_locations
  # GET /unit_locations.xml
  def index
    @unit_locations = UnitLocation.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @unit_locations }
    end
  end

  # GET /unit_locations/1
  # GET /unit_locations/1.xml
  def show
    @unit_location = UnitLocation.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @unit_location }
    end
  end

  # GET /unit_locations/new
  # GET /unit_locations/new.xml
  def new
    @unit_location = UnitLocation.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @unit_location }
    end
  end

  # GET /unit_locations/1/edit
  def edit
    @unit_location = UnitLocation.find(params[:id])
  end

  # POST /unit_locations
  # POST /unit_locations.xml
  def create
    @unit_location = UnitLocation.new(params[:unit_location])

    respond_to do |format|
      if @unit_location.save
        format.html { redirect_to(@unit_location, :notice => 'Unit location was successfully created.') }
        format.xml  { render :xml => @unit_location, :status => :created, :location => @unit_location }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @unit_location.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /unit_locations/1
  # PUT /unit_locations/1.xml
  def update
    @unit_location = UnitLocation.find(params[:id])

    respond_to do |format|
      if @unit_location.update_attributes(params[:unit_location])
        format.html { redirect_to(@unit_location, :notice => 'Unit location was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @unit_location.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /unit_locations/1
  # DELETE /unit_locations/1.xml
  def destroy
    @unit_location = UnitLocation.find(params[:id])
    @unit_location.destroy

    respond_to do |format|
      format.html { redirect_to(unit_locations_url) }
      format.xml  { head :ok }
    end
  end
end
