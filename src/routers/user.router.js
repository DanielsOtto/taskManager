import { createRouter } from '../utils/router.js';
import { auth } from '../middlewares/auth.middleware.js';
import userController from '../controllers/user/index.js';

const routerUser = createRouter();
// CONECTADA  EN  SERVER

routerUser.get('/info', auth, userController.userInfo); // user info
// routerSession.get('/projects', auth ,); //devuelve los proyectos del usuario
// routerSession.post() // agregar proyectos al user
// routerSession.post() // eliminar proyectos del user
// routerSession.post() // modificar estado tarea  terminado/en curso

// agregar rol admin ?
export default routerUser;
