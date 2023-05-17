import { logger } from '../../config/pino.js';
import { UserService } from './user.services.js';

const userService = new UserService();
export default userService;