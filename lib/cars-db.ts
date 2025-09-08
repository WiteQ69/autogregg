// lib/cars-db.ts
import { promises as fs } from "node:fs";
import path from "node:path";

const USE_BLOB = process.env.USE_BLOB === "1";
const LOCAL_FILE = path.join(process.cwd(), "public", "cars.json");

async function ensureLocal(file: string) {
  try { await fs.access(file); }
  catch {
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, "[]", "utf8");
  }
}

export async function readCars(): Promise<any[]> {
  if (!USE_BLOB) {
    await ensureLocal(LOCAL_FILE);
    const txt = await fs.readFile(LOCAL_FILE, "utf8");
    try { const j = JSON.parse(txt); return Array.isArray(j) ? j : []; } catch { return []; }
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const { list, get } = await import("@vercel/blob");

  const l = await list({ prefix: "data/cars.json", token });
  if (!l.blobs || l.blobs.length === 0) return [];

  const { url } = l.blobs[0];
  const { blob } = await get(url, { token });
  const txt = await blob.text();
  try { const j = JSON.parse(txt); return Array.isArray(j) ? j : []; } catch { return []; }
}

export async function writeCars(cars: any[]) {
  if (!USE_BLOB) {
    await ensureLocal(LOCAL_FILE);
    await fs.writeFile(LOCAL_FILE, JSON.stringify(cars, null, 2), "utf8");
    return;
  }
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const { put } = await import("@vercel/blob");
  await put("data/cars.json", JSON.stringify(cars, null, 2), {
    contentType: "application/json",
    addRandomSuffix: false,
    token,
    access: "public",
  });
}

export function findCarIndex(cars: any[], id: string) {
  return cars.findIndex((c) => String(c.id) === String(id));
}
