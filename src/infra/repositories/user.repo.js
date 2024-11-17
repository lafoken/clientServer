const {
  postgresAdapter: { $prisma },
} = require('./../database/postgres');

const { User } = require('../../domain/entities');

/**
 * @implements {Repositories.IUserRepository}
 */
class UserRepository {
  #db = $prisma;

  async getById(id) {
    const userData = await this.#db.user.findUnique({
      where: { id },
    });

    if (!userData) return null;

    return new User({
      id: userData.id,
      name: userData.name,
      email: userData.email,
    });
  }

  async getAll() {
    const usersData = await this.#db.user.findMany();

    return usersData.map(userData =>
      new User({
        id: userData.id,
        name: userData.name,
        email: userData.email,
      })
    );
  }

  async save(user) {
    return await this.#db.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }

  async update(user) {
    return await this.#db.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        email: user.email,
      },
    });
  }

  async delete(id) {
    await this.#db.user.delete({
      where: { id },
    });
  }
}

module.exports = { userRepository: new UserRepository() };
