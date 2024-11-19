Rails.application.config.middleware.use OmniAuth::Builder do
  #provider :github, Rails.application.credentials[:GITHUB_KEY], Rails.application.credentials[:GITHUB_SECRET], scope: 'user:email', redirect_uri: 'http://localhost:3000/users/auth/github/callback'
  
  #provider :google_oauth2, Rails.application.credentials[:GOOGLE_CLIENT_ID],Rails.application.credentials[:GOOGLE_CLIENT_SECRET]
  #provider :twitter2, Rails.application.credentials[:TWITTER_CLIENT_ID], Rails.application.credentials[:TWITTER_CLIENT_SECRET], callback_path: '/auth/twitter2/callback', scope: "tweet.read users.read"   
end