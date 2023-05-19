import { logger } from '../../config/pino.js';
import taskList from '../../repositories/task.repository/index.js';
import { TaskServices } from './task.services.js';

const taskService = new TaskServices(taskList);
export default taskService;