import { createRouter } from '../utils/router.js';
import { auth } from '../middlewares/auth.middleware.js';
import userController from '../controllers/user/index.js';

const routerUser = createRouter();
// CONECTADA  EN  SERVER

routerUser.use(auth);
routerUser.get('/info', userController.userInfo); // user info

routerUser.get('/project', userController.getAllProjects); //listar los proyectos del usuario
routerUser.get('/project/:idP', userController.getProjectById); //listar los proyectos del usuario
routerUser.post('/project', userController.saveProject); // agregar proyectos al user -- 
routerUser.delete('/project/:idP', userController.deleteUserProject); // eliminar proyectos del user

routerUser.get('/task', userController.getAllTasks); // listar las tareas del user
routerUser.get('/task/:idT', userController.getUserTaskById); // listar las tareas del user
routerUser.post('/task', userController.saveTask); // agregar tareas del user
// solo si ya esta asociado al proyecto -- MODIFICAR ESTO!
routerUser.delete('/:idT/task', userController.deleteUserTask) // eliminar tareas del user

export default routerUser;
