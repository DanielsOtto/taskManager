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

  async getAllUserProjects(id) { // cambiado el nombre 23/05
    try {
      const user = await this.getUser(id);
      return await user.getProjects();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getProjectById(idUser, idProject) {
    try {
      return await this.#tableProject.getUserProject(idProject);
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

  // async saveTask(id, idTask) { // quiero modificar esto -- ORIGINAL
  //   try {
  //     const user = await this.getUser(id);
  //     // WTF WTF WTF WTF
  //     // una PROYECTO tiene varias tareas /-/ una TAREA le pertenece a un proyecto
  //     // una Usuario tiene varias tareas  /-/ una TAREA le pertenece a un usuario

  //     // aca le asigno una tarea a un usuario
  //     // un Proyecto TIENE un usuario
  //     const task = await this.#tableTask.getOne(idTask);
  //     user && task && await user.addTask(task);
  //     return task;
  //   } catch (e) {
  //     console.error(e);
  //     throw e;
  //   }
  // } 

  async saveTask(userId, taskId) { // -- NUEVO 
    try {
      const user = await this.getUser(userId);
      if (!user) {
        throw new Error('El usuario no existe');
      }
      const projects = await user.getProjects();
      if (projects && projects.length > 0) {
        for (let project of projects) {
          const tasks = await project.getTasks({
            where: {
              id: taskId
            }
          });
          if (tasks && tasks.length > 0) {
            const task = tasks[0];
            await user.addTask(task);
          }
        }
      }
      const updatedTask = await this.#tableTask.getOne(taskId);
      if (!updatedTask) throw new Error('NO SE ENCONTRO NADA CON ESE ID !!');
      return updatedTask;
    } catch (error) {
      console.error(error);
      throw error;
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

  async getUserTaskById(idU, idT) {
    try {
      return await this.#tableTask.getUserTaskById(idU, idT);
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