// Оголошення інтерфейсу для User
declare namespace EntityFields {
  export type User = {
    id?: string;
    name: string;
    email: string;
  };
}

declare namespace Entities {
  export class User extends BaseEntity<EntityFields.User> {
    public id?: string;
    public name: string;
    public email: string;

    /**
     * @param {EntityFields.User} fields
     */
    constructor(fields: EntityFields.User) {
      super(fields); // Викликає конструктор базового класу, якщо він є
      this.id = fields.id;
      this.name = fields.name;
      this.email = fields.email;
    }
  }
}

module.exports = { Entities };
