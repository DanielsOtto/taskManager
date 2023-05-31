import { logger } from '../../config/pino.js';
import sessionService from '../../services/session.services/index.js';


export class SessionController {
  async register({ body }, res, next) {
    try {
      const obj = await sessionService.createUser(body);
      res.status(201).header('Authorization', obj.token).json({ user: obj.user });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }

  async login({ body }, res, next) {
    try {
      const token = await sessionService.authenticateUser(body);
      res.status(200).header('Authorization', token).json({ token: token });
    } catch (e) {
      logger.error(e);
      next(e);
    }
  }
}