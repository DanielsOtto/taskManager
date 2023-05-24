import { DataTypes, UUIDV4 } from 'sequelize';
import db from '../database/sequelize.db.js';
import Project from './Project.js';
import Task from './Task.js';


const ProjectTask = db.define('ProjectTask', {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true
  }
}, { tableName: 'projects_tasks' });

Task.belongsToMany(Project, { through: ProjectTask, foreignKey: 'taskId' });
Project.belongsToMany(Task, { through: ProjectTask, foreignKey: 'projectId' });
export default ProjectTask;