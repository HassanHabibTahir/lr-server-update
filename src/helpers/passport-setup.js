const constants = require('../../config/constants');
// passport-setup.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../app/Models/users');;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
   
    const existingUser = await User.findOne({ googleId: profile.id });
    
    if (existingUser) {
      // User already exists
      return done(null, existingUser);
    }
    
    // If new user
    const newUser = await new User({
      googleId: profile.id,
      email: profile.emails[0].value,
      userName: profile.displayName
      // You can add more fields as per your user model
    }).save();

    done(null, newUser);
  }
));

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
