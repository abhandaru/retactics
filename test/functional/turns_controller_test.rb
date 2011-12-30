require 'test_helper'

class TurnsControllerTest < ActionController::TestCase
  setup do
    @turn = turns(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:turns)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create turn" do
    assert_difference('Turn.count') do
      post :create, :turn => @turn.attributes
    end

    assert_redirected_to turn_path(assigns(:turn))
  end

  test "should show turn" do
    get :show, :id => @turn.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @turn.to_param
    assert_response :success
  end

  test "should update turn" do
    put :update, :id => @turn.to_param, :turn => @turn.attributes
    assert_redirected_to turn_path(assigns(:turn))
  end

  test "should destroy turn" do
    assert_difference('Turn.count', -1) do
      delete :destroy, :id => @turn.to_param
    end

    assert_redirected_to turns_path
  end
end
