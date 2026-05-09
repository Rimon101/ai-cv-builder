import * as React from "react";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  options: Option[];
}

export function Select({ className, options, ...props }: SelectProps) {
  return (
    <select
      className={cn("h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm", className)}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
