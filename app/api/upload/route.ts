// app/api/upload/route.ts — lokalny uploader plików
import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

async function saveFileToUploads(file: File): Promise<string> {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });

  const arrayBuffer = await file.arrayBuffer();
  const ext = path.extname(file.name) || "";
  const base = path
    .basename(file.name, ext)
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  const unique = `${base || "file"}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}${ext}`;

  const fullPath = path.join(uploadsDir, unique);
  await fs.writeFile(fullPath, Buffer.from(arrayBuffer));

  return `/uploads/${unique}`;
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    let files: File[] = [];

    const f = form.get("file");
    if (f && f instanceof File) files.push(f);

    const f1 = form.get("files");
    if (f1 && f1 instanceof File) files.push(f1);

    const multi = form.getAll("files[]");
    for (const item of multi) {
      if (item instanceof File) files.push(item);
    }

    if (!files.length) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const urls: string[] = [];
    for (const file of files) {
      const url = await saveFileToUploads(file);
      urls.push(url);
    }

    if (urls.length === 1) {
      return NextResponse.json({ url: urls[0], urls });
    }
    return NextResponse.json({ urls });
  } catch (e) {
    console.error("UPLOAD ERROR:", e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
