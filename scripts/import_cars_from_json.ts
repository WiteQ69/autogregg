// scripts/import_cars_from_json.ts
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const p = resolve(process.cwd(), 'data', 'cars.json');
  const json = JSON.parse(readFileSync(p, 'utf8')) as any[];

  for (const item of json) {
    await prisma.car.upsert({
      where: { id: item.id },
      update: {
        title: item.title,
        year: Number(item.year),
        engine: item.engine,
        mileage: Number(item.mileage),
        price_text: item.price_text ?? null,
        status: item.status === 'sold' ? 'sold' : 'active',
        main_image_path: item.main_image_path ?? null,
      },
      create: {
        id: item.id,
        title: item.title,
        year: Number(item.year),
        engine: item.engine,
        mileage: Number(item.mileage),
        price_text: item.price_text ?? null,
        status: item.status === 'sold' ? 'sold' : 'active',
        main_image_path: item.main_image_path ?? null,
        createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
      }
    });
  }

  console.log(`Imported ${json.length} cars.`);
}

main().finally(async () => prisma.$disconnect());
