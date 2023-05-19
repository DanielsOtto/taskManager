import User from '../../models/User.js';
import db from '../../database/sequelize.db.js';
import { UserList } from './users.repository.js';
import projectList from '../../repositories/project.repository/index.js';
import taskList from '../../repositories/task.repository/index.js';


const userList = new UserList(User, db, projectList, taskList);
export default userList;