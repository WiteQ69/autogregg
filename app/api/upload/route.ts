// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export const runtime = 'nodejs';
export const maxDuration = 60;

function isDev() {
  return process.env.NODE_ENV !== 'production';
}
function badRequest(msg: string) {
  return NextResponse.json({ error: msg }, { status: 400 });
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const entries = [
      ...form.getAll('file'),
      ...form.getAll('files[]'),
      ...form.getAll('files'),
    ].filter(Boolean);

    if (entries.length === 0) {
      return badRequest('No file provided. Use field name "file" or "files[]".');
    }

    // ✅ DEV fallback: gdy brak tokenu, zwróć data:URL (base64) zamiast wrzucać do Blob
    if (!process.env.BLOB_READ_WRITE_TOKEN && isDev()) {
      const urls: string[] = [];
      for (const entry of entries) {
        if (!(entry instanceof File)) continue;
        const ab = await entry.arrayBuffer();
        // @ts-ignore Buffer jest w runtime 'nodejs'
        const base64 = Buffer.from(ab).toString('base64');
        const mime = entry.type || 'application/octet-stream';
        urls.push(`data:${mime};base64,${base64}`);
      }
      return NextResponse.json(urls.length === 1 ? { url: urls[0] } : { urls });
    }

    // 🔒 Produkcja (albo lokalnie z tokenem): normalny upload do Vercel Blob
    const urls: string[] = [];
    for (const entry of entries) {
      if (!(entry instanceof File)) continue;
      const ab = await entry.arrayBuffer();
      const pathname = `cars/${crypto.randomUUID()}-${entry.name}`.replace(/\s+/g, '-');
      const { url } = await put(pathname, ab, {
        access: 'public',
        contentType: entry.type || 'application/octet-stream',
      });
      urls.push(url);
    }

    return NextResponse.json(urls.length === 1 ? { url: urls[0] } : { urls });
  } catch (e: any) {
    console.error('[POST /api/upload] ERROR:', e?.status || e?.code || e?.message || e);
    const status = e?.status ?? 500;
    return NextResponse.json({ error: 'Upload failed' }, { status });
  }
}
