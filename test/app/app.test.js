import axios from 'axios';
import { PORT } from '../../src/config/config.js';
import { logger } from '../../src/config/pino.js';
import createServer from '../../src/server/index.js';
import { expect } from 'chai';
import User from '../../src/models/User.js';
import Project from '../../src/models/Project.js';
import Task from '../../src/models/Task.js';

const server = new createServer();

// axios.defaults.baseURL = `https://localhost:${PORT}/api/users`;
axios.defaults.baseURL = `http://localhost:${PORT}/api`;
const email = 'mocha0@test.com';
const password = '123456';
const name = 'Mocha1';
const lastname = 'Mocha12';
let token;
let idP;
let idT;
let idP2;
let idT2;
const idP3 = 'e1cd928a-cf65-40fc-82d6-375873ba295d';
const idT3 = '609f306a-fbfa-40a7-8063-5a4c3442e697';

const nameP = 'ordenar las farmacias';
const descriptionP = 'apilar los medicamentos';
const nameT = 'agarrar la escoba';
const descriptionT = 'mover las caderas al ritmo de la melodía';


describe('Starting server', async () => {
  before(async () => {
    await server.connect({ port: PORT });
  });

  after(async () => {
    logger.info('FINISH THE TESTING!');
    Task.destroy({
      where: {
        name: nameT
      }
    }); // borrar la tarea manualmente
    Project.destroy({
      where: {
        name: nameP
      }
    }); //borrar el producto manualmente
    User.destroy({
      where: {
        email
      }
    }) //borrar el usuario manualmente ?
    await server.disconnect();
  });

  describe(' 1 - Testing USERS! -- sessions route', async () => {
    it('Adding USER', async () => {
      const { data, status } = await axios.post('/sessions/register', {
        email,
        password,
        name,
        lastname
      });
      expect(data.user).to.exist;
      expect(data.user.email).to.exist;
      expect(data.user.password).to.exist;
      expect(data.user.name).to.exist;
      expect(data.user.lastname).to.exist;
      expect(data.user.password).to.not.equal(password);//la pass tiene que encriptarse
      expect(data.user.email).to.equal(email);
      expect(data.user.name).to.equal(name);
      expect(data.user.lastname).to.equal(lastname);
      expect(status).to.equal(201);
    });

    it('GETTING TOKEN', async () => {
      const { data, headers, status } = await axios.post('/sessions/login', {
        email,
        password
      });
      expect(data.token).to.exist;
      expect(status).to.equal(200);
      if (headers.authorization !== '^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$');
    });
  });

  describe('2 - TESTING PROJECTS -- ', async () => {
    it('ADDING PROJECTS -- in bd', async () => {
      const { data, status } = await axios.post('/projects/', {
        name: nameP,
        description: descriptionP
      });
      expect(data).to.exist;
      expect(data.project.id).to.exist;
      idP = data.project.id;
      expect(data.project.name).to.exist;
      expect(data.project.description).to.exist;
      expect(data.project.done).to.exist;
      expect(data.project.name).to.equal(nameP);
      expect(data.project.description).to.equal(descriptionP);
      expect(status).to.equal(201);
    });

    it('GETTING PROJECTS -- ALL -- in bd', async () => {
      const { data, status } = await axios.get('/projects/');
      expect(data).to.exist;
      expect(data.projects).to.exist;
      expect(status).to.equal(200);
    });

    it('GETTING PROJECT -- ONE -- in bd ', async () => {
      const { data, status } = await axios.get(`/projects/${idP}`);
      expect(status).to.equal(200);
      expect(data.project).to.exist;
    });

    it('EDIT PROJECT  --  in bd', async () => {
      const { data, status } = await axios.put(`/projects/${idP}`, {
        name: 'limpiando la canoa',
        description: descriptionP
      });
      // console.log(data.Edit);
      expect(status).to.equal(200);
      expect(data.Edit).to.exist;
      expect(data.Edit.name).to.exist;
      expect(data.Edit.id).to.exist;
      expect(data.Edit.description).to.exist;
      expect(data.Edit.done).to.exist;
      expect(data.Edit.name).to.equal('limpiando la canoa');
      expect(data.Edit.description).to.equal(descriptionP);
      expect(data.Edit.id).to.equal(idP);
      expect(data.Edit.done).to.equal(false);
    });

    it('DELETE PROJECT  --  in  bd', async () => {
      const { data, status } = await axios.delete(`/projects/${idP}`);
      expect(status).to.equal(200);
      expect(data).to.equal('Deleted project');
    });

    it('GETTING PROJECT -- ONE -- EMPTY BD -- in bd ', async () => {
      try {
        const { data, status } = await axios.get(`/projects/${idP}`);
        expect(status).to.equal(404);
        expect(data.project).to.exist;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log('El recurso solicitado no fue encontrado (Error 404)');
          // Puedes realizar acciones adicionales si es necesario
        } else {
          throw error; // Lanza el error nuevamente si no es un error 404
        }
      }
    });

    // it('GETTING ALL PROJECTS -- in bd', async () => {
    //   try {
    //     const { data, status } = await axios.get('/projects/');
    //     expect(data).to.exist;
    //     expect(data.projects).to.exist;
    //     expect(status).to.equal(404);
    //   } catch (error) {
    //     console.error("no borra todos los elementos, xq ?");
    //   }
    // });
  });


  describe('3 - TESTINGS TASKS -- ', async () => {
    it('ADDING  TASKS  -- in bd', async () => {
      const { data, status } = await axios.post('/tasks', {
        name: nameT,
        description: descriptionT
      });
      expect(data.task).to.exist;
      expect(data.task.id).to.exist;
      idT = data.task.id;
      expect(data.task.name).to.exist;
      expect(data.task.description).to.exist;
      expect(data.task.name).to.equal(nameT);
      expect(data.task.description).to.equal(descriptionT);
      expect(status).to.equal(201);
    });

    it('GETTING TASKS  - ALL - in bd', async () => {
      const { data, status } = await axios.get('/tasks');
      expect(data.Tasks).to.exist;
      expect(status).to.equal(200);
    });

    it('GETTING TASK - ONE - in bd', async () => {
      const { data, status } = await axios.get(`/tasks/${idT}`);
      expect(data.task).to.exist;
      expect(data.task.id).to.exist;
      expect(data.task.name).to.exist;
      expect(data.task.description).to.exist;
      expect(data.task.done).to.exist;
      expect(data.task.name).to.equal(nameT);
      expect(data.task.description).to.equal(descriptionT);
      expect(status).to.equal(200);
    });

    it('UPDATING TASK -- with ID -- in bd', async () => {
      const { data, status } = await axios.put(`/tasks/${idT}`, {
        name: 'no me acuerdo que hacias aca'
      });
      expect(data.Update).to.exist;
      expect(data.Update).to.have.all.keys('createdAt', 'description', 'done', 'id', 'name', 'updatedAt');
      //de esta forma hay que agregar todos los campos SI O SI
      // expect(data.Update.id).to.exist; // expect(data.Update.name).to.exist;// expect(data.Update.description).to.exist;// expect(data.Update.done).to.exist;
      expect(data.Update.id).to.be.a('string');
      expect(data.Update.name).to.be.a('string');
      expect(data.Update.description).to.be.a('string');
      expect(data.Update.done).to.be.a('boolean');
      expect(status).to.equal(200);
    });

    it('DELETING TASK -- with ID -- in bd', async () => {
      const { data, status } = await axios.delete(`/tasks/${idT}`);
      expect(data).to.exist;
      expect(status).to.equals(200);
    })

    it('GETTING TASK -- with ID -- (EMPTY BD) in bd', async () => {
      try {
        const { status } = await axios.get(`/tasks/${idT}`);
        expect(status).to.equals(200);
      } catch (e) {
        if (e.response && e.response.status === 404) {
          console.log('El recurso solicitado no fue encontrado (Error 404)');
          // Puedes realizar acciones adicionales si es necesario
        } else {
          throw e; // Lanza el error nuevamente si no es un error 404
        }
      }
    })
  });

  describe('4 - TESTING PROJECTS + TASKS -- ADDING TASKS TO PROJECTS', async () => {
    it('ADDING PROJECTS -- in bd', async () => {
      const { data, status } = await axios.post('/projects/', {
        name: nameP,
        description: descriptionP
      });
      expect(data).to.exist;
      expect(data.project.id).to.exist;
      idP2 = data.project.id;
      expect(data.project.name).to.exist;
      expect(data.project.description).to.exist;
      expect(data.project.done).to.exist;
      expect(data.project.name).to.equal(nameP);
      expect(data.project.description).to.equal(descriptionP);
      expect(status).to.equal(201);
    });

    it('ADDING  TASKS  -- in bd', async () => {
      const { data, status } = await axios.post('/tasks', {
        name: nameT,
        description: descriptionT
      });
      expect(data.task).to.exist;
      expect(data.task.id).to.exist;
      idT2 = data.task.id;
      expect(data.task.name).to.exist;
      expect(data.task.description).to.exist;
      expect(data.task.name).to.equal(nameT);
      expect(data.task.description).to.equal(descriptionT);
      expect(status).to.equal(201);
    });

    it('ADDING Project Tasks', async () => {
      const { data, status } = await axios.post(`/projects/${idP2}/task`, {
        idT: idT2
      });
      expect(data).to.exist;
      expect(data.task).to.have.all.keys('description', 'done', 'id', 'name', 'createdAt', 'updatedAt');
      expect(data.task).to.have.all.keys('description', 'done', 'id', 'name', 'createdAt', 'updatedAt');
      expect(status).to.equal(200);
    });

    it('GETTING Project Tasks ', async () => {
      const { data, status } = await axios.get(`/projects/${idP2}/task`);
      expect(data.tasks).to.exist;
      expect(status).to.equal(200);
    });

    it('DELETING Project Task ', async () => {
      const { data, status } = await axios.delete(`/projects/${idP2}/task`, {
        data: { idT: idT2 }
      });
      expect(data).to.exist;
      expect(status).to.equal(200);
    });
  });


  describe('5 - TESTING USERS -- ADDING PROJECTS / ADDING TASKS', async () => {
    beforeEach(async () => {
      try {
        const { data } = await axios.post(`/sessions/login`, {
          email,
          password
        });
        token = data.token;
        expect(token).to.exist;
      } catch (error) {
        console.error('Error al obtener el token:', error);
      }
      // Establece el token antes de cada prueba dentro de este bloque
      // Así aseguras que el token esté disponible en cada solicitud
      // ya que cada prueba se ejecuta de forma independiente
    });

    it('GETTING  Info', async () => {
      const { data, status } = await axios.get(`/users/info`, {
        headers: {
          Authorization: `${token}`
        }
      });
      expect(data).to.exist;
      expect(status).to.equal(200)
    });

    it('ADDING a user PROJECT', async () => {
      const { data, status } = await axios.post(`/users/project`, {
        idP: idP2
      }, {
        headers: {
          Authorization: token,
        }
      });
      expect(data.Project).to.exist;
      expect(data.Project).to.have.all.keys('id', 'name', 'description', 'done', 'createdAt', 'updatedAt');
      expect(status).to.equal(200);
    });

    it('GETTING  ALL  user  PROJECTS', async () => {
      const { data, status } = await axios.get(`/users/project`, {
        headers: {
          Authorization: token,
        }
      });
      expect(data.Projects).to.exist;
      expect(status).to.equal(200);
    });

    it('GETTING  ONE  user  PROJECT', async () => {
      const { data, status } = await axios.get(`/users/project/${idP3}`, {
        headers: {
          Authorization: token,
        }
      });
      expect(data.project).to.exist;
      expect(data.project).to.have.all.keys('id', 'name', 'description', 'done', 'createdAt', 'updatedAt');
      expect(status).to.equal(200);
    });

    it('DELETING ONE user PROJECT', async () => {
      const { data, status } = await axios.delete(`/users/project/${idP3}`, {
        headers: {
          Authorization: token
        }
      });
      expect(data).to.exist;
      expect(status).to.equal(200);
    });

    it('ADDING  ONE  user  TASK', async () => {
      const { data, status } = await axios.post(`/users/task/`, {
        idTask: idT3
      }, {
        headers: {
          Authorization: token
        }
      });
      expect(data.Task).to.exist;
      expect(data.Task.name).to.equal("levantar la carpa!");
      expect(status).to.equal(200);
    });

    it('GETTING  ALL  user  TASK', async () => {
      const { data, status } = await axios.get(`/users/task`, {
        headers: {
          Authorization: token
        }
      });
      expect(data.Tasks).to.exist;
      expect(status).to.equal(200);
    });
    it('GETTING  ONE  user  TASK', async () => {
      const { data, status } = await axios.get(`/users/task/${idT3}`, {
        headers: {
          Authorization: token
        }
      });
      expect(data.task).to.exist;
      expect(status).to.equal(200);
    });
    it('DELETING  ONE  user  TASK', async () => {
      const { data, status } = await axios.delete(`/users/${idT3}/task`, {
        headers: {
          Authorization: token
        }
      });
      expect(data).to.exist;
      expect(status).to.equal(200);
    });
  });
});