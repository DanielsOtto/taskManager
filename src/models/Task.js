import { DataTypes, UUIDV4 } from 'sequelize';
import db from '../database/sequelize.db.js';
// EL ID LO CREAMOS EN EL SERVICIO


const Task = db.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    allowNull: false,
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
}, { tableName: 'tasks' });


export default Task;