import passport from 'passport';
import userList from '../../repositories/user.repository/index.js';

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userList.findByPk(id);
    // manejador de error DONDE ? ACA o hayaa! 
    if (!user) throw new Error('credenciales erroneas');

    done(null, user);
  } catch (e) {
    console.log(e);
    throw e;
  }
})