const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;


const GOOGLE_CLIENT_ID = '83181114508-1l1n1th3k7koshk9vvoifomi0tgdqrgm.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(null, profile );   //user 
    // });
  }
));

passport.serializeUser(function (user, done) {
    done(null, user);
})

passport.deserializeUser(function (user, done) {
    done(null, user);
})