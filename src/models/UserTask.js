import { DataTypes, UUIDV4 } from 'sequelize';
import db from '../database/sequelize.db.js';
import User from './User.js';
import Task from './Task.js';

const UserTask = db.define('UserTask', {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true
  }
}, { tableName: 'users_tasks' });

User.belongsToMany(Task, { through: UserTask, foreignKey: 'userId' });
Task.belongsToMany(User, { through: UserTask, foreignKey: 'taskId' });
export default UserTask;