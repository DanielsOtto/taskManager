import sessionController from '../controllers/session/index.js'
import { createRouter } from '../utils/router.js';
// import passport from '../middlewares/passport/register.passport.js';

const routerSession = createRouter();
// routerSession.post('/register', passport.authenticate('local-register', { session: false }), userController.register); // createUser
routerSession.post('/register', sessionController.register); // createUser
routerSession.post('/login', sessionController.login); // auth user




export default routerSession;