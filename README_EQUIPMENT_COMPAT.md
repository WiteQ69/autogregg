# Warstwa zgodności dla stałych wyposażenia

Ten patch dodaje `lib/equipment.ts`, który eksportuje `EQUIPMENT_LIST` i `EQUIP_ICONS`
nawet jeśli w `@/lib/constants` są one inaczej nazwane lub nie istnieją.

- Jeśli w `@/lib/constants` istnieją `EQUIPMENT_LIST`/`EQUIP_ICONS` — zostaną użyte.
- W przeciwnym razie użyjemy sensownych domyślnych list i ikon.
- `app/samochod/[id]/EquipTile.tsx` importuje teraz z `@/lib/equipment`.
