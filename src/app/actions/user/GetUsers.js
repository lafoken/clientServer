const { HttpException } = require('../../../presentation/errors/http');
const { redisClient } = require('./../../../infra/database/redis');

class GetUsers {
  /**
   * @param {Object} dependencies
   * @param {Repositories.IUserRepository} dependencies.userRepository
   */
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  /**
   * Retrieves a list of users with pagination and filters.
   * @param {Object} filters
   * @param {string} [filters.term]
   * @param {number} [filters.limit]
   * @param {number} [filters.offset]
   * @param {string} [filters.sort]
   * @returns {Promise<Object>}
   */
  async execute(filters) {
    const cacheKey = `Users:${this.normalizeFilters(filters)}`;

    // Try to get users from cache
    const cachedUsers = await redisClient.get(cacheKey);

    if (cachedUsers) {
      const users = JSON.parse(cachedUsers);

      if (users.items.length === 0) {
        throw new HttpException(404, 'No users found');
      }

      return users;
    }

    // If users not found in cache, fetch from repository
    const users = await this.userRepository.find(filters);

    // Cache the result for 1 hour to reduce load on the database
    redisClient.set(cacheKey, JSON.stringify(users), 'EX', 3600);

    if (users.items.length === 0) {
      throw new HttpException(404, 'No users found');
    }

    return users;
  }

  normalizeFilters(filters) {
    // Convert the object into sorted entries
    const sortedEntries = Object.entries(filters).sort(([keyA], [keyB]) =>
      keyA.localeCompare(keyB)
    ); // Sort by keys alphabetically

    // Convert sorted entries back into an object to ensure JSON.stringify order
    const normalizedObject = Object.fromEntries(sortedEntries);

    // Stringify the normalized object
    return JSON.stringify(normalizedObject);
  }
}

module.exports = { GetUsers };
