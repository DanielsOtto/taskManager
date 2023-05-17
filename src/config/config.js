import SequelizeStore from 'connect-session-sequelize';
import dotenv from 'dotenv';
import db from '../database/sequelize.db.js';

// // dotenv.config({
// //   path:
// //     process.env.NODE_ENV === 'prod'
// //       ? '.env'
// //       : 'env.dev'
// // });
dotenv.config();

// // export const sqlObject = {
// //   host: 'localhost',
// //   user: 'root',
// //   database: 'tasks'
// // }; no va


export const HASH_SECRET = process.env.HASH_SECURITY + process.env.SALT_ROUNDS + process.env.LINE_SECRET;

// // const sequelizeStore = new SequelizeStore({
// //   db: db, // Indica la instancia de Sequelize que estás utilizando
// //   table: 'sessions' // Nombre de la tabla que almacenará las sesiones
// // })

// // sequelizeStore.sync()

// // anuladas las sessiones desde la ruta, no anda, no se que error me da
// // export const SESSION_OPTIONS = {
// //   secret: 'unsecretomagico',
// //   resave: true,
// //   saveUninitialized: true,
// //   store: sequelizeStore,
// //   cookie: {
// //     maxAge: 600000 // Tiempo de vida de la cookie en milisegundos
// //   }
// // }

// jwt
export const TOKEN_SECRET = process.env.TOKEN_SECRET;
export const EXPIRES_IN = 60 * 60 * 2;


export const ADMIN = 'test@test.com';