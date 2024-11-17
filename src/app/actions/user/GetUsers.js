class GetUsers {
  constructor(domainContext) {
    this.userRepository = domainContext.userRepository;
  }

  async execute() {
    const users = await this.userRepository.getAll();
    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
  }
}

module.exports = { GetUsers };
