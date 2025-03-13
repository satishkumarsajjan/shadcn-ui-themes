import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedTags() {
  const tags = [
    { name: 'Dark' },
    { name: 'Light' },
    { name: 'Minimal' },
    { name: 'Colorful' },
    { name: 'Corporate' },
    { name: 'Playful' },
    { name: 'Modern' },
    { name: 'Retro' },
    { name: 'Accessible' },
    { name: 'High Contrast' }
  ];

  console.log('Seeding tags...');
  
  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { name: tag.name },
      update: {},
      create: tag,
    });
  }

  console.log('Tags seeding completed!');
}

seedTags()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });