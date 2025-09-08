// lib/cars-db.ts — lokalna „baza danych” oparta na pliku public/cars.json
import { promises as fs } from "node:fs";
import path from "node:path";

const DATA_FILE = path.join(process.cwd(), "public", "cars.json");

async function ensureFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, "[]", "utf8");
  }
}

export async function readCars(): Promise<any[]> {
  await ensureFile();
  const content = await fs.readFile(DATA_FILE, "utf8");
  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

export async function writeCars(cars: any[]) {
  await ensureFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(cars, null, 2), "utf8");
}

export function findCarIndex(cars: any[], id: string) {
  return cars.findIndex((c) => String(c.id) === String(id));
}
