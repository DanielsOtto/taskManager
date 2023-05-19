import { SessionService } from './session.services.js';
import userList from '../../repositories/user.repository/index.js';

const sessionService = new SessionService(userList);
export default sessionService;