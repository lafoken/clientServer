const { User } = require('../../../domain/entities');

class CreateUser {
  /**
   * @param {Object} dependencies
   * @param {Repositories.IUserRepository} dependencies.userRepository
   */
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  /**
   * Creates a new user.
   * @param {Object} userData
   * @param {string} userData.name
   * @param {string} userData.email
   * @returns {Promise<Entities.User>}
   */
  async execute(userData) {
    const { name, email } = userData;

    // Validate input data
    if (!name || !email) {
      throw new Error('Missing required user data');
    }

    // Create new user entity
    const user = new User({
      id: this.generateUserId(), // or some logic to generate an ID
      name,
      email,
    });

    // Save the user
    return await this.userRepository.save(user);
  }

  /**
   * Example method to generate a unique user ID
   * @returns {string}
   */
  generateUserId() {
    return `user-${Date.now()}`; // Simple ID generation, can be more complex
  }
}

module.exports = { CreateUser };
