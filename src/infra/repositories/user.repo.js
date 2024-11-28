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

  async save(user) {
    return await this.#db.user.create({
      data: {
        id: user.id,
        username: user.username,
        passwordHash: user.passwordHash,
        isPrivileged: user.isPrivileged,
      },
    });
  }

  async update(user) {
    return await this.#db.user.update({
      where: { id: user.id },
      data: {
        username: user.username,
        passwordHash: user.passwordHash,
        isPrivileged: user.isPrivileged,
      },
    });
  }

  async delete(id) {
    await this.#db.user.delete({
      where: { id },
    });
  }

  /**
   * Finds users based on filters with pagination and sorting.
   * @param {Object} filters
   * @param {string} [filters.term] - Search term for username or email
   * @param {number} [filters.limit] - Limit for pagination
   * @param {number} [filters.offset] - Offset for pagination
   * @param {string} [filters.sort] - Sort order (e.g. "createdAt DESC")
   * @returns {Promise<Entities.User[]>}
   */
  async find(filters) {
    const { term, limit = 10, offset = 0, sort = 'createdAt' } = filters;

    // Формуємо умову фільтрації
    /** @type {import('@prisma/client').Prisma.UserWhereInput} */
    const whereClause = term
      ? {
          OR: [
            {
              username: {
                contains: term,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};

    // Отримуємо дані користувачів та загальну кількість
    const [users, total] = await Promise.all([
      this.#db.user.findMany({
        where: whereClause,
        skip: offset,
        take: limit,
        orderBy: { [sort]: 'desc' },
      }),
      this.#db.user.count({ where: whereClause }), // Підрахунок загальної кількості
    ]);

    // Повертаємо дані з пагінацією
    return {
      items: users.map(
        (userData) =>
          new User({
            id: userData.id,
            username: userData.username,
            passwordHash: userData.passwordHash,
            isPrivileged: userData.isPrivileged,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
          })
      ),
      page: Math.ceil(offset / limit) + 1, // Визначаємо поточну сторінку
      total,
    };
  }
}

module.exports = { userRepository: new UserRepository() };
