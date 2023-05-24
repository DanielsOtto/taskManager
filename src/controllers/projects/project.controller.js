import projectService from '../../services/project.services/index.js';

// validaciones - SON NECESARIAS
// errores ..

export class ProjectController {

  async getAll(req, res, next) {
    try {
      const projs = await projectService.getAll();
      res.status(200).json({ projects: projs });
    } catch (e) {
      console.error(e);
      res.status(404).json({ projects: 'No projects' });
      // throw e;
    }
  }

  async getOne({ params }, res, next) {
    const { id } = params;
    try {
      const project = await projectService.getOne(id);
      res.status(200).json({ project: project });
    } catch (e) {
      console.error(e);
      res.status(404).json({ project: 'Not found' });
      // throw e;
    }
  }

  async saveOne({ body }, res, next) {
    try {
      const project = await projectService.saveOne(body);
      res.status(201).json({ project: project });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async editOne({ body, params }, res, next) {
    const { id } = params;
    // validar body
    try {
      const edited = await projectService.editOne(id, body);
      res.status(200).json({ Edit: edited });
      // const project = await projectService
    } catch (e) {
      console.error(e);
      // throw e;
      res.status(404).json("wrong ID")
    }
  }

  async addTask({ params, body }, res, next) {
    const { id_project } = params;
    const { idT } = body;
    try {
      const task = await projectService.addTask(id_project, idT);
      res.status(200).json({ task: task });
    } catch (e) {
      console.error(e);
      res.status(400).json(e.message);
      // next(e);
    }
  }

  async getTasksProject({ params }, res, next) { // nuevo 24/05
    const { id_project } = params;
    try {
      const tasks = await projectService.getTasksProject(id_project);
      res.status(200).json({ tasks: tasks });
    } catch (e) {
      console.error(e);
      res.status(404).json(e.message);
    }
  }

  async deleteProject({ params }, res, next) {
    const { id } = params;
    try {
      await projectService.deleteProject(id);
      res.status(200).json('Deleted project');
    } catch (e) {
      console.error(e);
      res.status(400).json(e)
    }
  }

  async deleteTaskInProject({ params, body }, res, next) {
    const { id_project } = params;
    const { idT } = body;
    try {
      await projectService.deleteTaskInProject(id_project, idT);
      res.status(200).json(`Task deleted in project with ID: ${id_project}`);
    } catch (e) {
      console.error(e);
      res.status(400).json(e);
    }
  }
}