declare namespace Repositories {
  interface IUserRepository {
    getById(id: string): Promise<Entities.User | null>;
    getAll(): Promise<Entities.User[]>; // Додаємо метод getAll
    save(user: Entities.User): Promise<Entities.User>;
    update(user: Entities.User): Promise<Entities.User>;
    delete(id: string): Promise<void>;
  }
}
