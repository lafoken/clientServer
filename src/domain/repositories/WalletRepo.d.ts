declare namespace Repositories {
  interface IWalletRepository {
    getAll(): Promise<Entities.Wallet[]>; // Додаємо метод getAll
    save(wallet: Entities.Wallet): Promise<Entities.Wallet>;
  }
}
