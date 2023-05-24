import { logger } from '../../config/pino.js';
import { generateToken } from '../../utils/auth.js';
import { comparePassword, encryptPassword } from '../../utils/hashPass.js';


export class SessionService {
  #userRepository;
  constructor(userList) {
    this.#userRepository = userList;
  }

  async createUser({ email, password, name, lastname }) {
    try {
      const pass = encryptPassword(password);
      const user = await this.#userRepository.createUser(email, pass, name, lastname);
      if (!user) {
        throw new Error('credenciales incorrectas ?')
      }
      const token = generateToken(user.id, user.email);
      return {
        user,
        token
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async authenticateUser({ email, password }) {
    try {
      const user = await comparePassword(email, password);
      if (!user) {
        throw new Error('credenciales invalidas');
      }
      return generateToken(user);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}