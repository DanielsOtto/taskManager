import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import userList from '../../repositories/user.repository/index.js';
import { comparePassword } from '../../utils/hashPass.js';


export async function login() {
  try {
    passport.use('local-login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    }, async (req, email, password, done) => {
      const user = await userList.findByEmail(email);
      if (!user) return done(null, false, { message: 'User not found' });
    }));
    if (!(await comparePassword(password))) {
      // contraseñas distintas
      return done(null, false);
    }
    //contraseñas correctas
    return done(null, user);

  } catch (e) {
    console.log(e);
  }
}