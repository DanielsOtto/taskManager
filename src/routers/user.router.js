import { createRouter } from '../utils/router.js';
import { auth } from '../middlewares/auth.middleware.js';
import userController from '../controllers/user/index.js';

const routerUser = createRouter();
// CONECTADA  EN  SERVER

routerUser.use(auth);
routerUser.get('/info', userController.userInfo); // user info

routerUser.get('/project', userController.getAllProjects); //listar los proyectos del usuario
routerUser.post('/project', userController.saveProject); // agregar proyectos al user -- 
routerUser.delete('/project/:idP', userController.deleteUserProject); // eliminar proyectos del user

routerUser.get('/task', userController.getAllTasks); // listar las tareas del user
routerUser.post('/task', userController.saveTask); // agregar tareas del user
routerUser.delete('/:idT/task', userController.deleteUserTask) // eliminar tareas del user

//-- tags
// routerUser.get() // ver tags del usuario
// routerUser.get() // ver tag del usuario
// routerUser.get() // crear tag de la task del User
// routerUser.get() // editar tag de la task del User
// routerUser.get() // borrar tag de la task del User

// routerUser.post() // modificar estado tarea  terminado/en curso

export default routerUser;
