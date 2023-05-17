import { DataTypes } from 'sequelize';
import db from '../database/sequelize.db.js';
import User from './User.js';
import Project from './Project.js';


const UserProject = db.define('UserProject', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  }
}, { tableName: 'users_projects' });

// User.belongsToMany(Project, { through: UserProject });
User.belongsToMany(Project, { through: UserProject, foreignKey: 'userId' });
Project.belongsToMany(User, { through: UserProject, foreignKey: 'projectId' });
// Project.belongsToMany(User, { through: UserProject });

export default UserProject;