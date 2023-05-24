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
      return this.getOne(id);
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

  async getUserTaskById(idU, idT) { // agregado el 23/05
    try {
      const task = await this.#table.findOne({
        where: {
          id: idT,
          UserId: idU
        }
      });
      if (!task) {
        throw new Error("que onda");
      }
      return task;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}