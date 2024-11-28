const { Wallet } = require('../../domain/entities');
const {
  postgresAdapter: { $prisma },
} = require('./../database/postgres');

/**
 * @implements {Repositories.IWalletRepository}
 */
class WalletRepository {
  #db = $prisma;

  // For testing
  setDatabase(mockDb) {
    this.#db = mockDb; // Дозволяє змінювати базу даних для тестів
  }

  /**
   * Get all wallets from the database
   * @returns {Promise<Entities.Wallet[]>}
   */
  async getAll() {
    const walletsData = await this.#db.wallet.findMany();

    return walletsData.map(
      (walletData) =>
        new Wallet({
          id: walletData.id,
          userId: walletData.userId,
          balance: walletData.balance,
          createdAt: walletData.createdAt,
          updatedAt: walletData.updatedAt,
        })
    );
  }

  /**
   * Save a wallet to the database
   * @param {Entities.Wallet} wallet
   * @returns {Promise<Entities.Wallet>}
   */
  async save(wallet) {
    const walletData = await this.#db.wallet.create({
      data: {
        userId: wallet.userId,
        balance: wallet.balance,
      },
    });

    return new Wallet({
      id: walletData.id,
      userId: walletData.userId,
      balance: walletData.balance,
      createdAt: walletData.createdAt,
      updatedAt: walletData.updatedAt,
    });
  }
}

module.exports = { walletRepository: new WalletRepository() };
