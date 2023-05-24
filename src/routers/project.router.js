import { checkPermission } from '../middlewares/checkPermission.middleware.js';
import projectController from '../controllers/projects/index.js';
import { createRouter } from '../utils/router.js';
// NO esta conectada en server


const routerProject = createRouter();

routerProject.get('/', projectController.getAll); // ver todos los proyectos -- todos 
routerProject.get('/:id', projectController.getOne); // ver un proyecto -- todos
// routerProject.use(checkPermission); // falta lo del ROL
routerProject.post('/', projectController.saveOne); // crear proyecto -- admin
routerProject.put('/:id', projectController.editOne); // editar proyecto -- admin
routerProject.get('/:id_project/task', projectController.getTasksProject) // ver tareas del proyecto -- new 24/05
routerProject.post('/:id_project/task', projectController.addTask); // agrego tarea al proyecto -- admin
routerProject.delete('/:id_project/task', projectController.deleteTaskInProject); // elimino tarea al proyecto -- admin
routerProject.delete('/:id', projectController.deleteProject) // elimino proyecto x id -- admin


export default routerProject;