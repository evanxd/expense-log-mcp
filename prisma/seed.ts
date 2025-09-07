import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding ...");
  const categories = [
    { name: 'Dining/Snacks' },
    { name: 'Food' },
    { name: 'Necessities' },
    { name: 'Transportation' },
    { name: 'Utilities' },
    { name: 'Entertainment' },
    { name: 'Others' },
  ];

  for (const category of categories) {
    const result = await prisma.expenseCategory.create({
      data: category,
    });
    console.log(`Created category with id: ${result.id}`);
  }
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
