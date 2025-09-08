'use client';

import { FeaturePill } from "@/components/ui/feature-icon";
import { EQUIPMENT_LIST } from "@/lib/schemas";

// U Ciebie elementy mają { key, label }
const LABELS: Record<string, string> = Object.fromEntries(
  EQUIPMENT_LIST.map((e: { key: string; label: string }) => [e.key, e.label])
);

export function EquipTile({
  code,
  label,
}: {
  code: string;
  label?: string;
}) {
  const resolved = label ?? LABELS[code] ?? code;
  return <FeaturePill code={code} label={resolved} />;
}

export default EquipTile;
