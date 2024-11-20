class GetWallets {
    /**
     * @param {Object} dependencies
     * @param {Repositories.IWalletRepository} dependencies.walletRepository
     */
    constructor({ walletRepository }) {
      this.walletRepository = walletRepository;
    }
  
    /**
     * Gets all wallets
     * @returns {Promise<Entities.Wallet[]>}
     */
    async execute() {
      const wallets = await this.walletRepository.getAll();
      return wallets.map(wallet => ({
        id: wallet.id,
        userId: wallet.userId,
        balance: wallet.balance,
        createdAt: wallet.createdAt,
        updatedAt: wallet.updatedAt,
      }));
    }
  }
  
  module.exports = { GetWallets };
  