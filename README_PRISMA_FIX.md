# Fix: `prisma generate` not found during Vercel build

**Problem**: `sh: prisma: command not found` at `postinstall` on Vercel.

**Root cause**: `prisma` CLI is in `devDependencies`, which may be omitted in production builds.

## Quick fix (recommended)

Move **prisma** to `dependencies` and keep `postinstall: prisma generate`.

Example `package.json` provided in `package.json.example` (merge into your own).

## Alternative (if you want to keep prisma in devDependencies)

Add `vercel.json` with:
```json
{ "buildCommand": "npm install --include=dev && npm run build" }
```
File `vercel.json.optional` is included — rename it to `vercel.json` to use.

