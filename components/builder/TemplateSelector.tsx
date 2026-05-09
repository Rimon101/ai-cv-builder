"use client";

import type { CVTemplate } from "@/lib/types";
import { templateCatalog } from "@/lib/templates";
import { cn } from "@/lib/utils";

export function TemplateSelector({
  value,
  onChange,
}: {
  value: CVTemplate;
  onChange: (template: CVTemplate) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {templateCatalog.map((template) => (
        <button
          key={template.id}
          onClick={() => onChange(template.id)}
          className={cn(
            "rounded-md border px-3 py-1.5 text-sm transition",
            value === template.id
              ? "border-teal-400 bg-teal-400/10 text-teal-200"
              : "border-slate-700 bg-slate-900/60 text-slate-200",
          )}
        >
          {template.label}
        </button>
      ))}
    </div>
  );
}
