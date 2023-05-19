import { auth } from '../middlewares/auth.middleware.js';
import { createRouter } from '../utils/router.js';
// controller

const routerTag = createRouter();

// // routerTag.get('/') // ver etiquetas
// // routerTag.get('/') // ver 1 etiqueta
// routerTag.get('/') // crear etiquetas -- mal, las crea el usuario/task
// routerTag.get('/') // ver etiquetas
// routerTag.get('/') // ver etiquetas


//no va esto, la etiqueta la hace el usuario, en funcion de su tarea asignada