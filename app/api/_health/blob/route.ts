import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'

export const runtime = 'nodejs'

export async function GET() {
  const vars = {
    BLOB_URL: !!process.env.BLOB_URL,
    BLOB_READ_WRITE_TOKEN: !!process.env.BLOB_READ_WRITE_TOKEN,
  }
  try {
    const ts = Date.now()
    await put(`health-${ts}.txt`, `ok ${ts}`, {
      access: 'public',
      contentType: 'text/plain',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })
    return NextResponse.json({ ok: true, vars })
  } catch (e: any) {
    return NextResponse.json({ ok: false, vars, error: String(e) }, { status: 500 })
  }
}
