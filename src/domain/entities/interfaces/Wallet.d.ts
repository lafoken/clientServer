declare namespace EntityFields {
    export type Wallet = {
      id?: string;
      userId: string; // Референс на юзер-айді
      balance: number;
  
      createdAt?: Date;
      updatedAt?: Date;
    };
  }
  
  declare namespace Entities {
    export class Wallet extends BaseEntity<EntityFields.Wallet> {
      public id?: string;
      public userId: string;
      public balance: number;
  
      public createdAt: Date;
      public updatedAt: Date;
  
      constructor(fields: EntityFields.Wallet) {
        super(fields); // Викликаємо конструктор базового класу
        this.id = fields.id;
        this.userId = fields.userId;
        this.balance = fields.balance;
  
        this.createdAt = fields.createdAt || new Date();
        this.updatedAt = fields.updatedAt || new Date();
      }
    }
  }
  