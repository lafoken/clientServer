declare namespace Repositories {
  interface IUserRepository {
    getByUsername(username: string): Promise<Entities.User | null>;
    getById(id: string): Promise<Entities.User | null>;
    getAll(): Promise<Entities.User[]>; // Додаємо метод getAll
    save(user: Entities.User): Promise<Entities.User>;
    update(user: Entities.User): Promise<Entities.User>;
    delete(id: string): Promise<void>;
  }
}
