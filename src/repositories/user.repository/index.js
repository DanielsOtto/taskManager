import User from '../../models/User.js';
import db from '../../database/sequelize.db.js';
import { UserList } from './users.repository.js';

const userList = new UserList(User, db); // es correcto esto ? - si
export default userList;