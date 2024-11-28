const { Wallet } = require('../entities/Wallet'); // Імпортуємо модель Wallet

/**
 * @implements {Services.IWalletService}
 */
class WalletService {
  /**
   * @param {object} dependencies
   * @param {Repositories.IWalletRepository} dependencies.walletRepository
   * @param {Repositories.IUserRepository} dependencies.userRepository
   */
  constructor({ walletRepository, userRepository }) {
    this.walletRepository = walletRepository; // Репозиторій для роботи з гаманцями
    this.userRepository = userRepository; // Репозиторій для роботи з користувачами
  }

  /**
   * Create a new wallet for a user
   * @param {EntityFields.Wallet} walletData
   * @returns {Promise<Entities.Wallet>}
   */
  async createWallet(walletData) {
    const user = await this.userRepository.getById(walletData.userId);

    if (!user) {
      throw new Error('User not found');
    }

    const wallet = new Wallet(walletData);

    // Зберігаємо гаманець в репозиторії
    return this.walletRepository.save(wallet);
  }

  /**
   * Get all wallets
   * @returns {Promise<Entities.Wallet[]>}
   */
  async getAllWallets() {
    return this.walletRepository.getAll();
  }
}

module.exports.walletService = new WalletService({
  walletRepository: require('../../infra/repositories/wallet.repo'), // Репозиторій для роботи з гаманцями
  userRepository: require('../../infra/repositories/user.repo'), // Репозиторій для роботи з користувачами
});
