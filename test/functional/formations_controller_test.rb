require 'test_helper'

class FormationsControllerTest < ActionController::TestCase
  setup do
    @formation = formations(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:formations)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create formation" do
    assert_difference('Formation.count') do
      post :create, :formation => @formation.attributes
    end

    assert_redirected_to formation_path(assigns(:formation))
  end

  test "should show formation" do
    get :show, :id => @formation.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @formation.to_param
    assert_response :success
  end

  test "should update formation" do
    put :update, :id => @formation.to_param, :formation => @formation.attributes
    assert_redirected_to formation_path(assigns(:formation))
  end

  test "should destroy formation" do
    assert_difference('Formation.count', -1) do
      delete :destroy, :id => @formation.to_param
    end

    assert_redirected_to formations_path
  end
end
