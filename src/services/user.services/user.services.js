import { logger } from '../../config/pino.js';


export class UserService {
  #userList;
  constructor(userList) {
    this.#userList = userList;
  }

  async getInfo({ id }) {
    try {
      return await this.#userList.findByPk(id);
    } catch (error) {
      console.log(e);
      throw e;
    }
  }

  async saveProject(id, id_project) {
    try {
      return await this.#userList.saveProject(id, id_project);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getAllProjects(id) {
    try {
      return await this.#userList.getAllUserProjects(id); // cambiado el nombre 23/05
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getProjectById(id, idP) {
    try {
      return await this.#userList.getProjectById(id, idP);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async deleteUserProject(id, idP) {
    try {
      return await this.#userList.deleteUserProject(id, idP);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async saveTask(id, idTask) { // quiero modificar esto
    try {
      return await this.#userList.saveTask(id, idTask);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getAllTasks(id) {
    try {
      return await this.#userList.getAllTasks(id);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getUserTaskById(idU, idT) {
    try {
      return await this.#userList.getUserTaskById(idU, idT);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async deleteUserTask(id, idTask) {
    try {
      return await this.#userList.deleteUserTask(id, idTask);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}