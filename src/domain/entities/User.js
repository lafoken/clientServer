/**
 * @implements {Entities.User}
 */
class User {
  /**
   * @param {EntityFields.User} params
   */
  constructor({
    id,
    username,
    passwordHash,
    isPrivileged,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.username = username;
    this.isPrivileged = isPrivileged || false;
    this.passwordHash = passwordHash || null;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || null;
  }
}

module.exports = { User };
