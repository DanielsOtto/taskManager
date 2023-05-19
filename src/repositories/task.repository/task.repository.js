export class TaskList {
  #table;
  constructor(table) {
    this.#table = table;
  }

  async createTask(name, description) {
    try {
      const task = await this.#table.create({
        name,
        description
      });
      return task;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getAll() {
    try {
      return await this.#table.findAll();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getOne(id) {
    try {
      return await this.#table.findByPk(id);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async editTask(id, name, description, done) {
    try {
      await this.#table.update({
        name,
        description,
        done
      }, {
        where: {
          id
        }
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async deleteTask(id) {
    try {
      await this.#table.destroy({
        where: {
          id
        }
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}