import { EmailAlreadyRegisterError } from '../../errors/EmailAlreadyRegister.js';
import sessionService from '../../services/session.services/index.js';
// validators

export class SessionController {

  async register({ body }, res, next) {
    try {
      const token = await sessionService.createUser(body);
      res.status(201).header('Authorization', token).json({ ok: 'User created!' });
    } catch (e) {
      console.log(e);
      if (e.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ message: 'Email already exists' });
        // throw new EmailAlreadyRegisterError(body.email);
      } else {
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  async login({ body }, res, next) {
    try {
      const token = await sessionService.authenticateUser(body);
      res.status(201).header('Authorization', token).json({ token: token });
    } catch (e) {
      console.log(e);
      res.json({ message: 'Ocurrió un error' });
    }
  }
}

