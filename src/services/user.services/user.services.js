import { logger } from '../../config/pino.js';
import userList from '../../repositories/user.repository/index.js';


export class UserService {

  async getInfo({ id }) {
    try {
      return await userList.findByPk(id);
    } catch (error) {
      console.log(e);
      throw e;
    }
  }


}