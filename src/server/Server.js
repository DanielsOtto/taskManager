import morgan from 'morgan';
import express from 'express';
import db from '../database/sequelize.db.js';
import routerSession from '../routers/session.router.js';
import routerUser from '../routers/user.router.js';
import routerProject from '../routers/project.router.js';
import routerTask from '../routers/task.router.js';
// // import passport from 'passport';
// // import session from 'express-session';
// // import { SESSION_OPTIONS } from '../config/config.js';
// // import '../models/User.js'; // no va, es solo para ver si anda 


export class Server {
  #app;
  #server;
  constructor() {
    this.#app = express();

    this.dbConnection();

    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await db.sync();
      console.log('Database online!');
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  middlewares() {
    this.#app.use(morgan('dev'));
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    // this.#app.use(session(SESSION_OPTIONS));
    // this.#app.use(passport.initialize());
    // this.#app.use(passport.session());
  }

  routes() {
    this.#app.use('/api/sessions/', routerSession);
    this.#app.use('/api/users/', routerUser);
    this.#app.use('/api/projects/', routerProject) // projects
    this.#app.use('/api/tasks/', routerTask); // tasks
    // this.#app.use('/ruta5')
    // this.#app.use('/manejador Errores')
    // this.#app.use('/wrong rutas')
  }

  async connect({ port = 0 }) {
    return new Promise((resolve, reject) => {
      this.#server = this.#app.listen(port, () => {
        console.log(`Conectado al puerto ${port}`);
        resolve({ port });
      });
      this.#server.on('error', e => {
        console.log(`error al conectarse ${e}`);
        reject(e);
      });
    });
  }

  async disconnect() {
    return new Promise((resolve, reject) => {
      this.#server.close(e => {
        if (e) {
          console.log(`error al desconectarse ${e}`);
          reject(e);
        } else {
          resolve(e);
        }
      });
    });
  }
}