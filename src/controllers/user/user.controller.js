import userService from '../../services/user.services/index.js'

export class UserController {

  async userInfo({ user }, res, next) {
    try {
      const users = await userService.getInfo(user);
      res.status(200).json({ info: users });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async saveProject({ user, body }, res, next) {
    const { idP } = body;
    const { id } = user;
    try {
      const project = await userService.saveProject(id, idP);
      res.status(200).json({ Project: project });
    } catch (e) {
      console.error(e);
      res.status(400).json(e.message);
    }
  }

  async getAllProjects({ user }, res, next) {
    const { id } = user;
    try {
      const projects = await userService.getAllProjects(id);
      res.status(200).json({ Projects: projects });
    } catch (e) {
      console.error(e);
      res.status(404).json(e.message);
    }
  }

  async getProjectById({ user, params }, res, next) {
    const { id } = user;
    const { idP } = params;
    try {
      const project = await userService.getProjectById(id, idP);
      res.status(200).json({ project: project });
    } catch (e) {
      console.error(e);
      res.status(404).json(e.message);
    }
  }

  async deleteUserProject({ params, user }, res, next) {
    const { idP } = params;
    const { id } = user;
    try {
      await userService.deleteUserProject(id, idP);
      res.status(200).json('Project deleted!');
    } catch (e) {
      console.error(e);
      res.status(400).json(e.message);
    }
  }

  async saveTask({ user, body }, res, next) { // quiero modificar esto
    // la idea es que solo agregue una tarea si 
    // tanto la tarea como el usuario estan vinculados con el mismo 
    // PROYECTO
    const { id } = user;
    const { idTask } = body;
    try {
      const task = await userService.saveTask(id, idTask);
      res.status(200).json({ Task: task });
    } catch (e) {
      console.error(e);
      res.status(400).json(e.message);
    }
  }

  async getAllTasks({ user }, res, next) {
    const { id } = user;
    try {
      const tasks = await userService.getAllTasks(id);
      res.status(200).json({ 'Added task ': tasks });
    } catch (e) {
      console.error(e);
      res.status(404).json('no se encontro nada');
    }
  }

  async getUserTaskById({ user, params }, res, next) {
    const { id } = user;
    const { idT } = params;
    try {
      const task = await userService.getUserTaskById(id, idT);
      res.status(200).json(task);
    } catch (e) {
      console.error(e);
      res.status(404).json('no se encontro nada');
    }
  }

  async deleteUserTask({ user, params }, res, next) {
    const { id } = user;
    const { idT } = params;
    try {
      const task = await userService.deleteUserTask(id, idT);
      res.status(200).json({ 'Deleted task': task });
    } catch (e) {
      console.error(e);
      res.status(400).json('no se pudo borrar nada');
    }
  }
}