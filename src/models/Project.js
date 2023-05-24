import { DataTypes } from 'sequelize';
import db from '../database/sequelize.db.js';
// import Task from './Task.js';
// EL ID LO CREA EL MODELO

const Project = db.define('Project', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  done: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, { tableName: 'projects' });


// Project.hasMany(Task);
export default Project;
// Project.belongsToMany(User, { through: UserProject });