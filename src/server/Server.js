import morgan from 'morgan';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import db from '../database/sequelize.db.js';
import specs from '../config/swaggerConfig.js';
import routerUser from '../routers/user.router.js';
import routerTask from '../routers/task.router.js';
import routerSession from '../routers/session.router.js';
import routerProject from '../routers/project.router.js';
import '../models/UserTask.js';
import '../models/ProjectTask.js';
import '../models/UserProject.js';
import { errorHandler } from '../middlewares/errorHandler.middleware.js';
import { errorMiddleware } from '../middlewares/errorMiddleware.js';
import { logger } from '../config/pino.js';


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
      logger.info('Database online!');
    } catch (e) {
      logger.error(e);
      throw new Error(e);
    }
  }

  middlewares() {
    this.#app.use(morgan('dev'));
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.#app.use('/api/sessions/', routerSession);
    this.#app.use('/api/users/', routerUser);
    this.#app.use('/api/projects/', routerProject) // projects
    this.#app.use('/api/tasks/', routerTask); // tasks
    this.#app.use(errorMiddleware, errorHandler);
    this.#app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    // this.#app.use('/wrong rutas')
  }

  async connect({ port = 0 }) {
    return new Promise((resolve, reject) => {
      this.#server = this.#app.listen(port, () => {
        logger.info(`Conectado al puerto ${port}`);
        resolve({ port });
      });
      this.#server.on('error', e => {
        logger.error(`error al conectarse ${e}`);
        reject(e);
      });
    });
  }

  async disconnect() {
    return new Promise((resolve, reject) => {
      this.#server.close(e => {
        if (e) {
          logger.info(`error al desconectarse ${e}`);
          reject(e);
        } else {
          resolve(e);
        }
      });
    });
  }
}