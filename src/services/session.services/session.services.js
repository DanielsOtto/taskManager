import { logger } from '../../config/pino.js';
import { Unauthorized } from '../../errors/Unauthorized.js';
import { generateToken } from '../../utils/auth.js';
import { comparePassword, encryptPassword } from '../../utils/hashPass.js';
// ready 

export class SessionService {
  #userRepository;
  constructor(userList) {
    this.#userRepository = userList;
  }

  async createUser({ email, password, name, lastname }) {
    try {
      const pass = encryptPassword(password);
      const user = await this.#userRepository.createUser(email, pass, name, lastname);
      const token = generateToken(user.id, user.email);
      return {
        user,
        token
      };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async authenticateUser({ email, password }) {
    try {
      const user = await comparePassword(email, password);
      if (!user) throw new Unauthorized('Invalid credentials!');
      return generateToken(user);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}