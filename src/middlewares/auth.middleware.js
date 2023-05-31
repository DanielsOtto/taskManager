import { logger } from '../config/pino.js';
import { verifyToken } from '../utils/auth.js';
import { ForbiddenAccess } from '../errors/ForbiddenAccess.js';
//ready

export function auth(req, res, next) {
  const token = req.header('Authorization');
  try {
    if (!token) {
      throw new ForbiddenAccess('Nonexistent token!'); // 403
    } else {
      const verified = verifyToken(token);
      req.user = verified;
      next();
    }
  } catch (e) {
    logger.error(e);
    throw e;
  }
}