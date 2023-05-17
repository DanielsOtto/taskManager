import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../../models/User.js';
import { encryptPassword } from '../../utils/hashPass.js';
import userList from '../../repositories/user.repository/index.js';

// SERIALIZACION pasar un solo valor para que guarde passport, pero que con ese dato se pueda identificar el usuario (ID)


passport.use('local-register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  console.log(req.body);
  const { name, lastname } = req.body;
  console.log(email, password, name, lastname);
  try {
    // const user = await userList.findByEmail({ email });
    const user = await User.findOne({
      where: {
        email: email
      }
    });
    if (!user) {
      const pass = encryptPassword(password);
      const newUser = {
        email,
        password: pass,
        name,
        lastname
      };
      // await userList.createUser(newUser);
      await User.create(newUser);
      return done(null, newUser);
    }
    else {
      return done(null, false, { message: 'El correo electrónico ya está registrado' }); // no hubo error. pero el email esta registrado
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
}
));

export default passport;