"use client";

import { useMemo, useState } from "react";
import type { CVData, CVTemplate } from "@/lib/types";
import { templateCatalog, templateCategories } from "@/lib/templates";
import { cn } from "@/lib/utils";
import { CVPreview } from "@/components/builder/CVPreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TemplateGalleryProps {
  selectedTemplate: CVTemplate;
  onSelect: (template: CVTemplate) => void;
  previewData: CVData;
}

export function TemplateGallery({ selectedTemplate, onSelect, previewData }: TemplateGalleryProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof templateCategories)[number]>("All");

  const filteredTemplates = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();
    return templateCatalog.filter((template) => {
      const categoryMatch = category === "All" || template.category === category;
      const searchMatch =
        !lowerQuery ||
        template.label.toLowerCase().includes(lowerQuery) ||
        template.description.toLowerCase().includes(lowerQuery) ||
        template.category.toLowerCase().includes(lowerQuery);
      return categoryMatch && searchMatch;
    });
  }, [query, category]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {templateCategories.map((label) => (
            <Button
              key={label}
              type="button"
              variant={label === category ? "default" : "outline"}
              onClick={() => setCategory(label)}
              className="h-9"
            >
              {label}
            </Button>
          ))}
        </div>
        <div className="ml-auto w-full sm:w-64">
          <Input placeholder="Search templates" value={query} onChange={(event) => setQuery(event.target.value)} />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredTemplates.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => onSelect(template.id)}
            className={cn(
              "group rounded-xl border border-slate-800 bg-slate-900/70 p-4 text-left text-slate-100 shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:border-teal-400/50",
              selectedTemplate === template.id ? "border-teal-400 ring-2 ring-teal-400/30" : "border-slate-800",
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">{template.label}</p>
                <p className="text-xs text-slate-400">{template.category}</p>
              </div>
              <span className="rounded-full border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-300">Preview</span>
            </div>
            <p className="mt-2 text-xs text-slate-400">{template.description}</p>
            <div className="mt-4 rounded-lg border border-slate-800 bg-slate-950/40 p-2 sm:p-3">
              <div className="flex h-72 justify-center overflow-hidden rounded-md bg-white sm:h-80">
                <div className="w-[794px] shrink-0 origin-top scale-[0.26] sm:scale-[0.28]">
                  <CVPreview data={{ ...previewData, selectedTemplate: template.id }} />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-400">
          No templates match your search.
        </div>
      )}
    </div>
  );
}
