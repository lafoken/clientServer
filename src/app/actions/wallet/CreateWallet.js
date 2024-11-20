const { Wallet } = require('../../../domain/entities');

class CreateWallet {
  /**
   * @param {Object} dependencies
   * @param {Repositories.IWalletRepository} dependencies.walletRepository
   * @param {Repositories.IUserRepository} dependencies.userRepository
   */
  constructor({ walletRepository, userRepository }) {
    this.walletRepository = walletRepository;
    this.userRepository = userRepository;
  }

  /**
   * Creates a new wallet for a user.
   * @param {Object} walletData
   * @param {string} walletData.userId - The ID of the user
   * @param {number} walletData.balance - The initial balance of the wallet
   * @returns {Promise<Entities.Wallet>}
   */
  async execute(walletData) {
    const { userId, balance } = walletData;

    // Validate input data
    if (!userId) {
      throw new Error('Missing required userId');
    }

    // Check if the user exists
    const user = await this.userRepository.getById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Create new wallet entity
    const wallet = new Wallet({
      userId,
      balance,
    });

    // Save the wallet
    return await this.walletRepository.save(wallet);
  }
}

module.exports = { CreateWallet };
