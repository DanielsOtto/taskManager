import { DataTypes } from 'sequelize';
import db from '../database/sequelize.db.js';
import Task from './Task.js';
import Tag from './Tag.js';


const TaskTag = db.define('TaskTag', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  }
}, { tableName: 'task_tags' });

Task.belongsToMany(Tag, { through: TaskTag, foreignKey: 'taskId' });
Tag.belongsToMany(Task, { through: TaskTag, foreignKey: 'tagId' });

export default TaskTag;