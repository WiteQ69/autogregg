import * as React from "react"
import { cn } from "@/lib/utils"
export function Select({ value, onValueChange, disabled, children, placeholder }: { value?: string; onValueChange: (v: string) => void; disabled?: boolean; children: React.ReactNode; placeholder?: string; }) {
  return (
    <select className={cn("h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm")} value={value ?? ""} onChange={e => onValueChange(e.target.value)} disabled={disabled}>
      <option value="" disabled>{placeholder ?? "Wybierz..."}</option>
      {children}
    </select>
  )
}
export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) { return <option value={value}>{children}</option> }
export const SelectTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>
export const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>
export const SelectValue = ({ placeholder }: { placeholder?: string }) => <>{placeholder}</>
