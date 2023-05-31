import { logger } from '../../config/pino.js';
import { NotFoundError } from '../../errors/NotFoundError.js';
import { EmailAlreadyRegisterError } from '../../errors/EmailAlreadyRegister.js';
import { EmptyCollection } from '../../errors/EmptyCollection.js';

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
    try {
      const user = await this.findByEmail(email, false);
      if (user) throw new EmailAlreadyRegisterError(email);
    } catch (e) {
      throw e;
    }
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
      logger.error(e);
      await transaction.rollback();
    }
  }

  async findByEmail(email, validate = true) {
    try {
      const user = await this.#table.findOne({ where: { email: email } });
      if (validate) if (!user) throw new NotFoundError(email);
      return user;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async findByPk(id) {
    try {
      const user = await this.#table.findByPk(id);
      if (!user) throw new NotFoundError(id);
      return user;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  // async getUser(id) { // repeat -- donde se usa ?? 
  //   try {
  //     const user = await this.findByPk(id);
  //     if (!user) throw new NotFoundError(user);
  //     return user;
  //   } catch (e) {
  //     logger.error(e);
  //     throw e;
  //   }
  // }

  async saveProject(id, idProject) {
    try {
      const user = await this.findByPk(id);
      const project = await this.#tableProject.getOne(idProject);
      if (!project) throw new NotFoundError(id);
      await user.addProject(project);
      return project;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getAllUserProjects(id) { // cambiado el nombre 23/05
    try {
      const user = await this.findByPk(id);
      const projects = await user.getProjects();
      if (projects.length === 0) throw new EmptyCollection(); //DEBERIA DAR 204
      return projects;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getProjectById(idUser, idProject) { // revisar en donde se usa - revisado
    let founded = null;
    try {
      const projects = await this.getAllUserProjects(idUser);
      const project = await this.#tableProject.getOne(idProject);
      const array = projects.map(obj => obj.dataValues);
      for (let x = 0; x < array.length; x++) {
        if (array[x].id === project.id) {
          founded = project;
          break;
        }
      }
      if (!founded) throw new NotFoundError(idProject);
      return founded
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteUserProject(id, idP) {
    try {
      const user = await this.findByPk(id);
      const project = await this.#tableProject.getOne(idP);
      await user.removeProject(project);
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async saveTask(userId, taskId) { // -- NUEVO 
    try {
      const user = await this.findByPk(userId);
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
      if (!updatedTask) throw new NotFoundError(taskId);
      return updatedTask;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }


  async getAllTasks(id) {
    try {
      const user = await this.findByPk(id);
      const tasks = await user.getTasks();
      if (tasks.length === 0) throw new EmptyCollection();
      return tasks;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getUserTaskById(idU, idT) {
    try {
      const user = await this.findByPk(idU);
      const task = await user.getTasks({
        where: {
          id: idT
        }
      });
      return task;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async deleteUserTask(id, idTask) {
    try {
      const user = await this.findByPk(id);
      const task = await this.#tableTask.getOne(idTask);
      user && task && await user.removeTask(task);
      return task;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}