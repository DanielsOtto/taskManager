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
      if (projects.length === 0) {
        throw new Error('No hay proyectos');
      }
      return projects;
    } catch (e) {
      console.error(e);
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
      console.error(e);
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
      console.error(e);
      throw new Error(e);
    }
  }

  async editOne(id, { name, description, done }) {
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

  async getTasksProject(idProject) { // new 24/05
    try {
      const project = await this.getOne(idProject);
      const tasks = await project.getTasks({
        attributes: ['id', 'name', 'description', 'done'],
        joinTableAttributes: [],
      });
      if (!tasks) throw new Error('el proyecto no tiene tareas');
      return tasks;
    } catch (e) {
      console.error(e);
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
      console.error(e);
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
      console.error(e);
      throw e;
    }
  }

  async deleteTaskInProject(idProject, idTask) {
    try {
      const project = await this.getOne(idProject);
      const task = await this.#taskTable.findByPk(idTask);
      const response = await project.removeTask(task);
      if (response === 0) throw new Error('No se elimino nada!');
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getUserProject(idP) { // agregado 23/05 
    try {
      const project = await this.#table.findOne({
        where: {
          id: idP,
        }
      });
      if (!project) {
        throw new Error('PROJECT repositorio no se encontro nada');
      }
      return project;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}