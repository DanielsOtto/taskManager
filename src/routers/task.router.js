import { auth } from '../middlewares/auth.middleware.js';
import taskController from '../controllers/tasks/index.js';
import { createRouter } from '../utils/router.js';

const routerTask = createRouter();

routerTask.get('/', taskController.getAll); // listar las tareas
routerTask.get('/:id', taskController.getOne); // listar 1 tarea
routerTask.post('/', taskController.createTask);//crear tareas
routerTask.put('/:id', taskController.editTask); //editar tareas
routerTask.delete('/:id', taskController.deleteTask); // eliminar tarea

export default routerTask;