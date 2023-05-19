import { ProjectService } from './project.services.js';
import projectList from '../../repositories/project.repository/index.js';

const projectService = new ProjectService(projectList);
export default projectService;