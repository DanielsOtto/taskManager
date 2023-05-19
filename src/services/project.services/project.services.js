import { logger } from '../../config/pino.js';
// errores

// INDEX CREADO

export class ProjectService {
  #projectRepository;
  constructor(projectList) {
    this.#projectRepository = projectList;
  }

  async getAll() {
    try {
      return await this.#projectRepository.getAll();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getOne(id) {
    try {
      return await this.#projectRepository.getOne(id);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async saveOne({ name, description }) {
    try {
      return await this.#projectRepository.saveOne(name, description);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async editOne(id, body) {
    try {
      const project = await this.#projectRepository.getOne(id);
      if (!body.name) {
        body.name = project.name;
      }
      if (!body.description) {
        body.description = project.description;
      }
      if (!body.done) {
        body.done = project.done;
      }

      const editProject = await this.#projectRepository.editOne(id, body);
      return (editProject);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async addTask(idProject, idTask) {
    try {
      return await this.#projectRepository.addTask(idProject, idTask);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async deleteProject(id) {
    try {
      await this.#projectRepository.deleteProject(id);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async deleteTaskInProject(idProject, idTask) {
    try {
      await this.#projectRepository.deleteTaskInProject(idProject, idTask);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}