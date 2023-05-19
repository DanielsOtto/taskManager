export class UserList {
  #table;
  #db;
  #tableProject;
  #tableTask;
  constructor(table, db, tableProject, taskList) {
    this.#table = table;
    this.#db = db;
    this.#tableProject = tableProject;
    this.#tableTask = taskList;
  }

  async createUser(email, password, name, lastname) {
    const transaction = await this.#db.transaction();
    try {
      const newUser = await this.#table.create({
        email,
        password,
        name,
        lastname
      }, { transaction });
      console.log(newUser);
      await transaction.commit();

      return newUser;
    } catch (e) {
      console.error(e);
      await transaction.rollback();
      // throw e;
    }
  }

  async findByEmail(email, validate = true) {
    try {
      const user = await this.#table.findOne({ where: { email: email } });
      if (validate) {
        if (!user) {
          throw new Error('Usuario inexistente');
        }
      }
      return user;
      // manejador errores true or false
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async findByPk(id) {
    try {
      return await this.#table.findByPk(id);
      // manejador errores
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getUser(id) {
    try {
      return await this.findByPk(id);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async saveProject(id, idProject) {
    try {
      const user = await this.getUser(id);
      const project = await this.#tableProject.getOne(idProject);
      user && project && await user.addProject(project);

      return project;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getAllProjects(id) {
    try {
      const user = await this.getUser(id);
      return await user.getProjects();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async deleteUserProject(id, idP) {
    try {
      const user = await this.getUser(id);
      const project = await this.#tableProject.getOne(idP);
      user && project && await user.removeProject(project);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async saveTask(id, idTask) {
    try {
      const user = await this.getUser(id);
      const task = await this.#tableTask.getOne(idTask);
      user && task && await user.addTask(task);
      return task;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getAllTasks(id) {
    try {
      const user = await this.getUser(id);
      return await user.getTasks();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async deleteUserTask(id, idTask) {
    console.log("deleteUserTask");
    console.log(idTask);
    try {
      const user = await this.getUser(id);
      const task = await this.#tableTask.getOne(idTask);
      console.log(task);
      user && task && await user.removeTask(task);

      return task;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }


}