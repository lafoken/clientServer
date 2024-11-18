declare namespace EntityFields {
  export type User = {
    id?: string;
    username: string;
    passwordHash?: string;
    isPrivileged?: boolean;

    createdAt?: Date;
    updatedAt?: Date;
  };

  export type UserWithoutPassword = User & {
    passwordHash?: never;
  };
}

declare namespace Entities {
  export class User extends BaseEntity<EntityFields.User> {
    public id?: string;
    public username: string;
    public isPrivileged: boolean;
    public passwordHash?: string;

    public createdAt: Date;
    public updatedAt: ?Date;

    constructor(fields: EntityFields.User) {
      this.id = fields.id;
      this.username = fields.username;
      this.passwordHash = fields.passwordHash;

      this.createdAt = fields.createdAt || new Date();
      this.updatedAt = fields.updatedAt || null;
    }
  }
}
