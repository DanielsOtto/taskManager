import { UserService } from './user.services.js';
import userList from '../../repositories/user.repository/index.js';

const userService = new UserService(userList);
export default userService;