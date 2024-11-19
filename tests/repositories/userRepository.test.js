const assert = require('assert');
const { randomUUID } = require('node:crypto');
const { describe, it } = require('node:test');
const { userRepository } = require('../../src/infra/repositories/user.repo')
const { User } = require('../../src/domain/entities');
const mockDb = {
  user: {
    findUnique: async ({ where }) => {
      if (where.username === 'testuser') {
        return {
          id: randomUUID(),
          username: 'testuser',
          passwordHash: 'hashed_password',
          isPrivileged: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }
      return null;
    },
    findMany: async () => [
      {
        id: randomUUID(),
        username: 'user1',
        passwordHash: 'hashed_password1',
        isPrivileged: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        username: 'user2',
        passwordHash: 'hashed_password2',
        isPrivileged: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    create: async ({ data }) => ({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    update: async ({ data }) => ({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    delete: async () => ({}),
  },
};

// Замінюємо реальну базу даних на мок
userRepository.setDatabase(mockDb);

describe('UserRepository', () => {
  it('✅ should fetch a user by username', async () => {
    const user = await userRepository.getByUsername('testuser');

    assert.ok(user, 'User should be found');
    assert.strictEqual(user.username, 'testuser', 'Username should match');
  });

  it('🔍 should return null if user is not found', async () => {
    const user = await userRepository.getByUsername('nonexistentuser');

    assert.strictEqual(user, null, 'User should not be found');
  });

  it('📋 should fetch all users', async () => {
    const users = await userRepository.getAll();

    assert.ok(Array.isArray(users), 'Result should be an array');
    assert.strictEqual(users.length, 2, 'There should be 2 users');
  });

  it('💾 should save a new user', async () => {
    const newUser = new User({
      id: randomUUID(),
      username: 'newuser',
      passwordHash: 'new_password_hash',
      isPrivileged: false,
    });

    const savedUser = await userRepository.save(newUser);

    assert.strictEqual(savedUser.username, newUser.username, 'Usernames should match');
    assert.ok(savedUser.createdAt, 'User should have a creation date');
  });

  it('✏️ should update an existing user', async () => {
    const updatedUser = new User({
      id: randomUUID(),
      username: 'updateduser',
      passwordHash: 'updated_password_hash',
      isPrivileged: true,
    });

    const result = await userRepository.update(updatedUser);

    assert.strictEqual(result.username, updatedUser.username, 'Usernames should match');
    assert.ok(result.updatedAt, 'User should have an update date');
  });

  it('❌ should delete a user by ID', async () => {
    await userRepository.delete(randomUUID());
    assert.ok(true, 'Delete should complete without error');
  });
});
