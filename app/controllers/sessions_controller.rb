class SessionsController < ApplicationController
  def create
    @user = User.from_omniauth(request.env['omniauth.auth'])
    if @user.persisted?
      session[:user_id] = @user.id
      redirect_to dashboard_path, notice: "Logged in as #{@user.email}"
    else
      redirect_to root_url, alert: 'Failure'
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end
end