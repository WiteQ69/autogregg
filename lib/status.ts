export type CarStatus = "active" | "sold";

export const STATUS_LABEL: Record<CarStatus, string> = {
  active: "Aktywna",
  sold: "Sprzedana",
};

export const STATUS_VARIANT: Record<CarStatus, string> = {
  active: "bg-emerald-100 text-emerald-700",
  sold: "bg-zinc-200 text-zinc-700",
};

export function coerceStatus(input: unknown): CarStatus {
  return input === "sold" ? "sold" : "active";
}