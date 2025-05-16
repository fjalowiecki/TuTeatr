import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  await prisma.play.createMany({
    data: [
      { title: 'Hamlet', premiere: 2010, director: 'Jan  Kowalski', description: 'Famous play.' },
      { title: 'Boeing Boeing', premiere: 2020, director: 'Ann High', description: 'You will laugh so much.' },
    ],
  });
  console.log('Database seeded.');
  await prisma.$disconnect();
}

seed();