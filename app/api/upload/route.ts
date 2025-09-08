// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
export const runtime = "nodejs";

const USE_BLOB = process.env.USE_BLOB === "1";

function safeName(name: string) {
  const ext = path.extname(name) || "";
  const base = path.basename(name, ext)
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return { base: base || "file", ext };
}

async function saveLocal(file: File): Promise<string> {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });
  const { base, ext } = safeName(file.name);
  const unique = `${base}-${Date.now()}-${Math.random().toString(36).slice(2,8)}${ext}`;
  await fs.writeFile(path.join(uploadsDir, unique), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${unique}`;
}

async function saveBlob(file: File): Promise<string> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const { put } = await import("@vercel/blob");
  const { base, ext } = safeName(file.name);
  const key = `uploads/${base}-${Date.now()}-${Math.random().toString(36).slice(2,8)}${ext}`;
  const { url } = await put(key, file, { access: "public", token });
  return url; // publiczny URL
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const files: File[] = [];

    // akceptujemy różne nazwy pól
    const f = form.get("file");   if (f instanceof File) files.push(f);
    const i = form.get("image");  if (i instanceof File) files.push(i);
    const f1 = form.get("files"); if (f1 instanceof File) files.push(f1);
    for (const it of form.getAll("files[]")) if (it instanceof File) files.push(it);

    if (!files.length) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const urls: string[] = [];
    for (const file of files) urls.push(USE_BLOB ? await saveBlob(file) : await saveLocal(file));

    // kompatybilnie zwracamy zarówno url jak i urls
    const body = urls.length === 1 ? { url: urls[0], path: urls[0], urls } : { urls };
    return NextResponse.json(body);
  } catch (e) {
    console.error("UPLOAD ERROR:", e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
