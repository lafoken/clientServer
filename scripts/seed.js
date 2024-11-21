const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const userCount = 1000; // Кількість користувачів для створення

  console.log('Seeding Users...');

  const userData = await Promise.all(
    Array.from({ length: userCount }).map(async () => ({
      username: `${faker.internet.username()}-${faker.string.alphanumeric(6)}`, // Унікальне ім'я
      passwordHash: await bcrypt.hash(faker.internet.password(), 10), // Хеш паролю
      isPrivileged: faker.datatype.boolean(),
    }))
  );

  await prisma.user.createMany({
    data: userData,
    skipDuplicates: true, // Уникаємо конфліктів через унікальні username
  });

  console.log(`${userCount} Users seeded.`);
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
