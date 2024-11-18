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
      username: userData.username,
      passwordHash: userData.passwordHash,
      isPrivileged: userData.isPrivileged,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    });
  }

  async getByUsername(username) {
    const userData = await this.#db.user.findUnique({
      where: { username },
    });

    if (!userData) return null;

    return new User({
      id: userData.id,
      username: userData.username,
      passwordHash: userData.passwordHash,
      isPrivileged: userData.isPrivileged,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    });
  }

  async getAll() {
    const usersData = await this.#db.user.findMany();

    return usersData.map(userData =>
      new User({
        id: userData.id,
        username: userData.username,
        passwordHash: userData.passwordHash,
        isPrivileged: userData.isPrivileged,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt,
      })
    );
  }

  async save(user) {
    const userData = await this.#db.user.create({
      data: {
        id: user.id,
        username: user.username,
        passwordHash: user.passwordHash,
        isPrivileged: user.isPrivileged,
      },
    });

    return new User({
      id: userData.id,
      username: userData.username,
      passwordHash: userData.passwordHash,
      isPrivileged: userData.isPrivileged,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    });
  }

  async update(user) {
    const userData = await this.#db.user.update({
      where: { id: user.id },
      data: {
        username: user.username,
        passwordHash: user.passwordHash,
        isPrivileged: user.isPrivileged,
      },
    });

    return new User({
      id: userData.id,
      username: userData.username,
      passwordHash: userData.passwordHash,
      isPrivileged: userData.isPrivileged,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    });
  }

  async delete(id) {
    await this.#db.user.delete({
      where: { id },
    });
  }
}

module.exports = { userRepository: new UserRepository() };
