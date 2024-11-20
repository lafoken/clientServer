declare namespace Services {
    export interface IWalletService {
      /**
       * Create a new wallet for a user
       * @param {EntityFields.Wallet} walletData
       * @returns {Promise<Entities.Wallet>}
       */
      createWallet(walletData: EntityFields.Wallet): Promise<Entities.Wallet>;
  
      /**
       * Get all wallets
       * @returns {Promise<Entities.Wallet[]>}
       */
      getAllWallets(): Promise<Entities.Wallet[]>;
    }
  }
  