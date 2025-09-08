import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "nodejs";

// prosta pomocnicza – content-type z nazwy pliku
function guessType(name: string) {
  const n = name.toLowerCase();
  if (n.endsWith(".jpg") || n.endsWith(".jpeg")) return "image/jpeg";
  if (n.endsWith(".png")) return "image/png";
  if (n.endsWith(".webp")) return "image/webp";
  return "application/octet-stream";
}

export async function POST(req: Request) {
  try {
    // Obsługa JSON { name, data } gdzie data to base64 lub dataURL
    const ct = req.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      const { name, data } = (await req.json()) as {
        name: string;
        data: string; // base64 lub dataURL
      };
      if (!name || !data)
        return NextResponse.json({ error: "Bad payload" }, { status: 400 });

      const base64 = data.includes(",") ? data.split(",").pop()! : data;
      const buffer = Buffer.from(base64, "base64");

      const res = await put(`uploads/${Date.now()}-${name}`, buffer, {
        access: "public",
        contentType: guessType(name),
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      return NextResponse.json({ url: res.url });
    }

    // Obsługa FormData z polem "file" (standardowy upload z <input type="file">)
    const form = await req.formData();
    const file = form.get("file") as unknown as File | null;

    if (!file) {
      // opcjonalnie obsługa wielu plików: files[]
      const files = form.getAll("files[]") as unknown as File[];
      if (!files?.length)
        return NextResponse.json({ error: "No file provided" }, { status: 400 });

      const uploaded: string[] = [];
      for (const f of files) {
        const ab = await f.arrayBuffer();
        const res = await put(`uploads/${Date.now()}-${f.name}`, new Uint8Array(ab), {
          access: "public",
          contentType: f.type || guessType(f.name),
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });
        uploaded.push(res.url);
      }
      return NextResponse.json({ urls: uploaded });
    }

    const ab = await file.arrayBuffer();
    const res = await put(`uploads/${Date.now()}-${file.name}`, new Uint8Array(ab), {
      access: "public",
      contentType: file.type || guessType(file.name),
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return NextResponse.json({ url: res.url });
  } catch (e) {
    console.error("UPLOAD ERROR:", e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
