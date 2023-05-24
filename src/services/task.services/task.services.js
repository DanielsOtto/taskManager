import { logger } from '../../config/pino.js';

export class TaskServices {
  #taskRepository;
  constructor(taskList) {
    this.#taskRepository = taskList;
  }

  async createTask({ name, description }) {
    try {
      return await this.#taskRepository.createTask(name, description);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getAll() {
    try {
      return await this.#taskRepository.getAll();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getOne(id) {
    try {
      return await this.#taskRepository.getOne(id);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async editTask(id, { name, description, done }) {
    try {
      return await this.#taskRepository.editTask(id, name, description, done);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async deleteTask(id) {
    try {
      await this.#taskRepository.deleteTask(id);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}