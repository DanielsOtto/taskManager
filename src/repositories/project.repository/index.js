import Project from '../../models/Project.js';
import Task from '../../models/Task.js';
import { ProjectList } from './project.repository.js';

const projectList = new ProjectList(Project, Task);
export default projectList;

// HAY Q PASARLE EL MODELO NO UNA INSTANCIA