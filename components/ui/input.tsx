import * as React from "react"
import { cn } from "@/lib/utils"
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input className={cn("flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm", "placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2", className)} ref={ref} {...props} />
))
Input.displayName = "Input"
export { Input }
