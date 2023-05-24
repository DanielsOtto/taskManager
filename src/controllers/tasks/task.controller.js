import taskService from '../../services/task.services/index.js'

export class TaskController {

  async createTask({ body }, res, next) {
    try {
      const task = await taskService.createTask(body);
      res.status(201).json({ task: task });
    } catch (e) {
      console.error(e);
      res.status(400).json(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const tasks = await taskService.getAll();
      res.status(200).json({ Tasks: tasks });
    } catch (e) {
      console.error(e);
      res.status(404).json(e);
    }
  }

  async getOne({ params }, res, next) {
    const { id } = params;
    try {
      const task = await taskService.getOne(id);
      res.status(200).json({ task: task });
    } catch (e) {
      console.error(e);
      res.status(404).json(e);
    }
  }

  async editTask({ params, body }, res, next) {
    const { id } = params;
    try {
      const update = await taskService.editTask(id, body);
      res.status(200).json({ 'Update': update });
    } catch (e) {
      console.error(e);
      res.status(400).json(e);
    }
  }

  async deleteTask({ params }, res, next) {
    const { id } = params;
    try {
      await taskService.deleteTask(id);
      res.status(200).json('Deleted task!');
    } catch (e) {
      console.error(e);
      res.status(400).json(e);
    }
  }
}