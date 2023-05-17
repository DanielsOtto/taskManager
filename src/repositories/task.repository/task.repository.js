export class TaskList {
  #table;
  constructor(table) {
    this.#table = table;
  }

  async createTask() {
    try {
      const task = await this.#table.create({
        name,
        description
      });
      return task;
    } catch (e) {
      // console.log(e);
      throw e;
    }
  }

  async getOne(id) {
    try {
      const task = await this.#table.findByPk(id);
      console.log(task);
      return task;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}