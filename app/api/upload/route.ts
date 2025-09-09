import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    // JSON body with urls: string[]
    if (contentType.includes("application/json")) {
      const { urls } = await req.json();
      if (Array.isArray(urls)) {
        return NextResponse.json({ urls });
      }
    }
    // multipart -> return data:urls (ephemeral)
    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const files = form.getAll("files");
      const urls: string[] = [];
      for (const f of files) {
        if (f instanceof File) {
          const buf = Buffer.from(await f.arrayBuffer());
          const b64 = buf.toString("base64");
          const mime = f.type || "image/jpeg";
          urls.push(`data:${mime};base64,${b64}`);
        }
      }
      return NextResponse.json({ urls });
    }
    return NextResponse.json({ error: "Unsupported payload" }, { status: 400 });
  } catch (e) {
    console.error("POST /api/upload error", e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}