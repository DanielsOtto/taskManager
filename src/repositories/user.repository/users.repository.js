export class UserList {
  #table;
  #db;
  constructor(table, db) {
    this.#table = table;
    this.#db = db;
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
      console.log(e);
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
      console.log(e);
      throw e;
    }
  }

  async findByPk(id) {
    try {
      return await this.#table.findByPk(id);
      // manejador errores
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // async findAll() {
  //   try {
  //     return await this.#table.fin();
  //   } catch (e) {
  //     console.log(e);
  //     throw e;
  //   }
  // }
}