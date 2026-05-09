"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "secondary" | "outline" | "ghost" | "destructive";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const styles: Record<ButtonVariant, string> = {
  default: "bg-teal-400 text-slate-950 hover:bg-teal-300",
  secondary: "bg-slate-800 text-slate-100 hover:bg-slate-700",
  outline: "border border-slate-700 bg-transparent text-slate-100 hover:bg-slate-800",
  ghost: "text-slate-200 hover:bg-slate-800",
  destructive: "bg-rose-500 text-slate-950 hover:bg-rose-400",
};

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition disabled:opacity-50",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}
