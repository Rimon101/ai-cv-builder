import type { CVTemplate } from "@/lib/types";

export type TemplateCategory = "Professional" | "Modern" | "Classic" | "Creative" | "Minimal" | "Corporate";

export interface TemplateMeta {
  id: CVTemplate;
  label: string;
  category: TemplateCategory;
  description: string;
}

export const templateCategories: ("All" | TemplateCategory)[] = [
  "All",
  "Professional",
  "Modern",
  "Classic",
  "Creative",
  "Minimal",
  "Corporate",
];

export const templateCatalog: TemplateMeta[] = [
  { id: "minimal", label: "Minimal", category: "Minimal", description: "Clean, ATS-friendly layout." },
  { id: "modern", label: "Modern", category: "Modern", description: "Contemporary sections with bold sidebar." },
  { id: "classic", label: "Classic", category: "Classic", description: "Traditional, recruiter-friendly layout." },
  { id: "creative", label: "Creative", category: "Creative", description: "Visual-forward blocks with icons." },
  { id: "executive", label: "Executive", category: "Professional", description: "Leadership-focused, formal layout." },
  { id: "compact", label: "Compact", category: "Minimal", description: "Condensed layout for short CVs." },
  { id: "professional", label: "Professional", category: "Professional", description: "Balanced layout for most roles." },
  { id: "elegant", label: "Elegant", category: "Classic", description: "Refined typography and centered header." },
  { id: "timeline", label: "Timeline", category: "Modern", description: "Chronological timeline emphasis." },
  { id: "corporate", label: "Corporate", category: "Corporate", description: "Structured, corporate-ready design." },
  { id: "bold", label: "Bold", category: "Creative", description: "High-contrast header and layout." },
  { id: "serif", label: "Serif", category: "Classic", description: "Serif-forward, timeless tone." },
  { id: "sidebar", label: "Sidebar", category: "Modern", description: "Left rail for skills and contact." },
  { id: "grid", label: "Grid", category: "Creative", description: "Card-based sections in a grid." },
  { id: "refined", label: "Refined", category: "Professional", description: "Polished two-column layout." },
  { id: "slate", label: "Slate", category: "Modern", description: "Soft slate panels and cards." },
];
