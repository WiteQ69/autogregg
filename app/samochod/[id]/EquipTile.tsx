'use client';

import { GaugeCircle } from 'lucide-react';
import { EQUIPMENT_LIST, EQUIP_ICONS } from '@/lib/constants';

// Wyprowadzamy **poprawny typ klucza** z Twoich stałych
type EquipmentKey = typeof EQUIPMENT_LIST[number]['key'];

// Guard runtime + poprawny typ na wyjściu
function toEquipmentKey(code: string): EquipmentKey | undefined {
  return (EQUIPMENT_LIST as Array<{ key: EquipmentKey }>).some(i => i.key === (code as EquipmentKey))
    ? (code as EquipmentKey)
    : undefined;
}

export default function EquipTile({ code }: { code: string }) {
  const k = toEquipmentKey(code);

  // Mapowanie labeli z listy wyposażenia
  const labelMap = new Map(EQUIPMENT_LIST.map(i => [i.key, i.label as string]));

  const label = k ? (labelMap.get(k) ?? code) : code;
  const Icon = k ? EQUIP_ICONS[k] : GaugeCircle;

  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon className="h-4 w-4 text-zinc-700" />
      <span>{label}</span>
    </div>
  );
}
