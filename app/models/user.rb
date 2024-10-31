class User < ApplicationRecord
    validates :github_uid, presence: true, uniqueness: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true, uniqueness: true
  
    def self.from_omniauth(access_token)
      github_uid = access_token.uid
      data = access_token.info
      email = data['email']
  
      User.find_or_create_by(email:, github_uid:)
    end
  end