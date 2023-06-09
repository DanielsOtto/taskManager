import { DataTypes } from 'sequelize';
import db from '../database/sequelize.db.js';


const User = db.define('User', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Email already in use!'
    },
    validate: {
      isEmail: {
        args: true,
        msg: 'Invalid email format'
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { tableName: 'users' });

export default User;