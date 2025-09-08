PATCH v3

1) components/ui/calendar.tsx
   - Usunięto `components={{ IconLeft, IconRight }}` oraz `captionLayout="buttons"`.
   - Kod zgodny z aktualnymi typami `react-day-picker`.

2) .eslintrc.json (opcjonalnie)
   - Wyłącza warning `@next/next/no-img-element` globalnie, jeśli nie chcesz teraz przepisywać na next/image.
   - Jeśli już masz własny .eslintrc.json, scal regułę `@next/next/no-img-element: off`.

Instrukcja:
- Skopiuj pliki 1:1 do repo.
- Commit: git add components/ui/calendar.tsx .eslintrc.json && git commit -m "fix(calendar): react-day-picker types; chore(eslint): silence no-img-element"
- Push i ponów deploy na Vercel.
