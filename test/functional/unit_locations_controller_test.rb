require 'test_helper'

class UnitLocationsControllerTest < ActionController::TestCase
  setup do
    @unit_location = unit_locations(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:unit_locations)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create unit_location" do
    assert_difference('UnitLocation.count') do
      post :create, :unit_location => @unit_location.attributes
    end

    assert_redirected_to unit_location_path(assigns(:unit_location))
  end

  test "should show unit_location" do
    get :show, :id => @unit_location.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @unit_location.to_param
    assert_response :success
  end

  test "should update unit_location" do
    put :update, :id => @unit_location.to_param, :unit_location => @unit_location.attributes
    assert_redirected_to unit_location_path(assigns(:unit_location))
  end

  test "should destroy unit_location" do
    assert_difference('UnitLocation.count', -1) do
      delete :destroy, :id => @unit_location.to_param
    end

    assert_redirected_to unit_locations_path
  end
end
