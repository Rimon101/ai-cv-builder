import type { CVData } from "@/lib/types";

const STORAGE_KEY = "ai-cv-builder-data";

export function saveCVData(cvData: CVData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
}

export function loadCVData(): CVData | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as CVData;
  } catch {
    return null;
  }
}

export function clearCVData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
