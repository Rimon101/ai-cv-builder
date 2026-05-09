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
            value === template.id ? "border-teal-700 bg-teal-50 text-teal-900" : "border-slate-300 bg-white",
          )}
        >
          {template.label}
        </button>
      ))}
    </div>
  );
}
