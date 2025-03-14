import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

function generateValidTime() {
    const date = faker.date.future();
    const validMinutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    const randomMinute = validMinutes[Math.floor(Math.random() * validMinutes.length)];
    date.setMinutes(randomMinute, 0, 0);
    return date;
}

async function main() {
    for (let i = 0; i < 50; i++) {
      await prisma.concert.create({
        data: {
          artist: faker.person.fullName(),
          stime: generateValidTime(),
          duration: faker.number.int({ min: 60, max: 300 }),
          isCancelled: Math.random() < 0.1,
        },
      });
    }
  }

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });