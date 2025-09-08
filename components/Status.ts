// components/Status.ts
export type CarStatus = 'active' | 'sold';

export const STATUS_LABEL: Record<CarStatus, string> = {
  active: 'Aktywne',
  sold: 'Sprzedane',
};

export const STATUS_VARIANT: Record<CarStatus, string> = {
  active: 'bg-green-100 text-green-800',
  sold: 'bg-gray-200 text-gray-700',
};

export function coerceStatus(input: unknown): CarStatus {
  return input === 'sold' ? 'sold' : 'active';
}
