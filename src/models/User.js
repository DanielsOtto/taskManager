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


// User.hasMany(Task, { // un User va a tener muchas tareas
//   foreignKey: 'taskID', // crea el atributo taskID en Task
//   sourceKey: 'id' // y lo enlaza con el id del User
// });

// Task.belongsTo(User, { // Muchas Task pueden pertenecer a un solo User
//   foreignKey: 'taskID',
//   targetKey: 'id'
// });


export default User;
// va a revisar las inserciones de manera segura