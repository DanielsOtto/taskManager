import { logger } from '../config/pino.js';
import { verifyToken } from '../utils/auth.js';


export function auth(req, res, next) {
  const token = req.header('Authorization');
  try {
    if (!token) {
      throw new Error("token inexistente");
    } else {
      const verified = verifyToken(token);
      req.user = verified;
      next();
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
}