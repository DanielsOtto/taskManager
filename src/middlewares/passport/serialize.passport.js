import passport from 'passport';

passport.serializeUser((user, done) => {
  done(null, user.id);
});