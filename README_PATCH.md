# AutoGregg — Patch (DB + Blob + CRUD)

To jest gotowa paczka z plikami, które należy dodać/zmienić w Twoim repo.

## Kroki
1. Wgraj zawartość katalogu w odpowiednie ścieżki repo (prisma/, lib/, app/api/ itd.).
2. Ustaw env: `DATABASE_URL`, `BLOB_READ_WRITE_TOKEN`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `ADMIN_*`.
3. Lokalnie: `npm i` → `npx prisma migrate dev` → `npm run dev`.
4. (Opcjonalnie) Import starych danych: `npx ts-node scripts/import_cars_from_json.ts`.
5. Deploy do Vercel. (Prisma: `postinstall` + ewentualnie `prisma migrate deploy` w CI.)

## API
- `GET /api/cars` (opcjonalnie `?status=active|sold`)
- `POST /api/cars`
- `GET /api/cars/[id]`
- `PUT /api/cars/[id]`
- `DELETE /api/cars/[id]`

## Upload
Wysyłaj `FormData` z polem `file` na `/api/upload`, odpowiedź zawiera `{ url }` do zapisania w bazie (pole `main_image_path`).
