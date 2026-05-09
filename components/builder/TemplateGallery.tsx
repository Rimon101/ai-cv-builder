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

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredTemplates.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => onSelect(template.id)}
            className={cn(
              "group rounded-xl border bg-white p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
              selectedTemplate === template.id ? "border-teal-500 ring-2 ring-teal-200" : "border-slate-200",
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">{template.label}</p>
                <p className="text-xs text-slate-500">{template.category}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">Preview</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">{template.description}</p>
            <div className="mt-3 rounded-lg border bg-slate-50 p-2">
              <div className="h-56 overflow-hidden rounded-md bg-white">
                <div className="origin-top-left scale-[0.22]">
                  <CVPreview data={{ ...previewData, selectedTemplate: template.id }} />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="rounded-xl border border-dashed bg-slate-50 p-6 text-sm text-slate-500">
          No templates match your search.
        </div>
      )}
    </div>
  );
}
