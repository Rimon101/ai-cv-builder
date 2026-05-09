import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-md border border-slate-700 bg-slate-900/70 px-3 text-sm text-slate-100 outline-none ring-teal-400 placeholder:text-slate-500 focus:ring-2",
        className,
      )}
      {...props}
    />
  );
}
