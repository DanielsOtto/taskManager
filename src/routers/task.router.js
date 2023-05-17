import { auth } from '../middlewares/auth.middleware.js';
import { createRouter } from '../utils/router.js';
//controladores

const routerTask = createRouter();

// TAREAS: creación,
//     edición,
//     eliminación,
//     lista de tareas,
//         tareas completadas,
//             tareas pendientes,
//                 tareas asignadas a un usuario.

// routerTask.post('/', );//crear tareas
routerTask.put('editar tareas')
routerTask.delete('eliminar tareas')
routerTask.get('listar tareas')
routerTask.put('tarea completada')
routerTask.put('tarea pendiente')
routerTask.put('asignar tareas')
