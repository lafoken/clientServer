class UpdateUser {
  /**
   * @param {Object} dependencies
   * @param {Repositories.IUserRepository} dependencies.userRepository
   */
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  /**
   * Updates an existing user.
   * @param {string} userId
   * @param {Object} updateData
   * @returns {Promise<Entities.User>}
   */
  async execute(userId, updateData) {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const user = await this.userRepository.getById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Update user fields
    if (updateData.name !== undefined) {
      user.name = updateData.name;
    }

    if (updateData.email !== undefined) {
      user.email = updateData.email;
    }

    // Save the updated user
    await this.userRepository.update(user);

    return user;
  }
}

module.exports = { UpdateUser };
