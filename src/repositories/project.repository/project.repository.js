// listo el index -
export class ProjectList {
  #table;
  #taskTable;
  constructor(table, taskTable) {
    this.#table = table;
    this.#taskTable = taskTable;
  }

  async getAll() {
    try {
      const projects = await this.#table.findAll();
      console.log(projects);
      if (projects.length === 0) {
        throw new Error('No hay proyectos');
      }
      return projects;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getOne(id) {
    try {
      const project = await this.#table.findByPk(id);
      if (!project) {
        throw new Error('ID incorrecto - No existe ese proyecto');
      }
      return project;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async saveOne(name, description) {
    try {
      const project = await this.#table.create({
        name,
        description
      });
      return project;
    } catch (e) {
      throw new Error(e);
    }
  }

  async editOne(id, { name, description, done }) {
    try {
      const project = await this.#table.update({
        name,
        description,
        done
      }, {
        where: {
          id
        }
      });
      return project;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async addTask(idProject, idTask) {
    try {
      const project = await this.getOne(idProject);
      const task = await this.#taskTable.findByPk(idTask);
      await project.addTask(task);
      return task;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async deleteProject(id) {
    try {
      await this.#table.destroy({
        where: {
          id
        }
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async deleteTaskInProject(idProject, idTask) {
    try {
      const project = await this.getOne(idProject);
      const task = await this.#taskTable.findByPk(idTask);
      const queonda = await project.removeTask(task);
      console.log(queonda);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}