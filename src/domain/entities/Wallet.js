/**
 * @implements {Entities.Wallet}
 */
class Wallet {
    /**
     * @param {EntityFields.Wallet} params
     */
    constructor({ id, userId, balance, createdAt, updatedAt }) {
      this.id = id || null; // Ідентифікатор гаманця
      this.userId = userId; // Референс на ID користувача
      this.balance = balance || 0; // Баланс гаманця
      this.createdAt = createdAt || new Date(); // Дата створення
      this.updatedAt = updatedAt || new Date(); // Дата оновлення
    }
  }
  
  module.exports = { Wallet };
  