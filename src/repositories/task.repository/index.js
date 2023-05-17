import Task from '../../models/Task.js';
import { TaskList } from './task.repository.js';

const taskList = new TaskList(Task);
export default taskList;