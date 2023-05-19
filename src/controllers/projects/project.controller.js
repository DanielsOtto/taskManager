import projectService from '../../services/project.services/index.js';

// validaciones - SON NECESARIAS
// errores ..

export class ProjectController {

  async getAll(req, res, next) {
    try {
      const projs = await projectService.getAll();
      res.status(200).json({ Projects: projs });
    } catch (e) {
      console.error(e);
      res.status(404).json({ Projects: 'No projects' });
      // throw e;
    }
  }

  async getOne({ params }, res, next) {
    const { id } = params;
    try {
      const project = await projectService.getOne(id);
      res.status(200).json({ Project: project });
    } catch (e) {
      console.error(e);
      res.status(404).json({ Project: 'Not found' });
      // throw e;
    }
  }

  async saveOne({ body }, res, next) {
    try {
      const project = await projectService.saveOne(body);
      res.status(201).json({ projectCreated: project });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async editOne({ body, params }, res, next) {
    const { id } = params;
    // validar body
    try {
      await projectService.editOne(id, body);
      res.status(200).json({ Edit: body });
      // const project = await projectService
    } catch (e) {
      console.error(e);
      // throw e;
      res.status(404).json("wrong ID")
    }
  }

  async addTask({ params, body }, res, next) {
    const { id_project } = params;
    const { id } = body;
    try {
      const task = await projectService.addTask(id_project, id);
      res.status(200).json(task);
    } catch (e) {
      console.error(e);
      res.status(400).json(e.message);
      // next(e);
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
    const { id } = body;
    try {
      await projectService.deleteTaskInProject(id_project, id);
      res.status(200).json(`Task deleted in project with ID: ${id_project}`);
    } catch (e) {
      console.error(e);
      res.status(400).json(e);
    }
  }
}