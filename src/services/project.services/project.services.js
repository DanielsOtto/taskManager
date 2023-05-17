import { logger } from '../../config/pino.js';
import projectList from '../../repositories/project.repository/index.js';
// errores

// INDEX CREADO

export class ProjectService {

  async getAll() {
    try {
      return await projectList.getAll();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getOne(id) {
    try {
      return await projectList.getOne(id);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async saveOne({ name, description }) {
    try {
      return await projectList.saveOne(name, description);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async editOne(id, body) {
    try {
      const project = await projectList.getOne(id);
      if (!body.name) {
        body.name = project.name;
      }
      if (!body.description) {
        body.description = project.description;
      }
      if (!body.done) {
        body.done = project.done;
      }

      const editProject = await projectList.editOne(id, body);
      return (editProject);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async addTask(idProject, idTask) {
    try {
      return await projectList.addTask(idProject, idTask);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async deleteProject(id) {
    try {
      await projectList.deleteProject(id);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async deleteTaskInProject(idProject, idTask) {
    try {
      await projectList.deleteTaskInProject(idProject, idTask);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}