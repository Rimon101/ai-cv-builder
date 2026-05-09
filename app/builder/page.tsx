"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Download, RotateCcw } from "lucide-react";
import { CVForm } from "@/components/builder/CVForm";
import { CVPreview } from "@/components/builder/CVPreview";
import { TemplateGallery } from "@/components/builder/TemplateGallery";
import { TemplateSelector } from "@/components/builder/TemplateSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { exportCVToPDF } from "@/lib/pdf-export";
import { clearCVData, loadCVData, saveCVData } from "@/lib/storage";
import { CVData, defaultCVData } from "@/lib/types";

const colorPresets = ["#0f766e", "#1d4ed8", "#7c3aed", "#be123c", "#374151", "#166534", "#ea580c", "#0f172a"];

const samplePreviewData: CVData = {
  personal: {
    fullName: "Jordan Ellis",
    email: "jordan.ellis@mail.com",
    phone: "+1 555 012 3456",
    location: "New York, NY",
    linkedin: "linkedin.com/in/jordan-ellis",
    github: "github.com/jordanellis",
    website: "jordanellis.com",
    photo: "",
  },
  summary:
    "Product designer with 6+ years of experience building human-centered platforms for fintech and SaaS. Focused on clean systems, measurable UX improvements, and cross-functional delivery.",
  experience: [
    {
      id: "exp-1",
      company: "Northwind Labs",
      role: "Lead Product Designer",
      startDate: "2021",
      endDate: "2024",
      isCurrent: false,
      description:
        "Led end-to-end design for a multi-tenant analytics suite used by 30k+ customers.\nPartnered with product and engineering to ship 12 major releases and cut onboarding time by 35%.",
    },
    {
      id: "exp-2",
      company: "Apex Payments",
      role: "Product Designer",
      startDate: "2018",
      endDate: "2021",
      isCurrent: false,
      description: "Designed a new merchant dashboard that increased daily engagement by 28%.",
    },
  ],
  education: [
    {
      id: "edu-1",
      institution: "Parsons School of Design",
      degree: "BFA",
      field: "Communication Design",
      startDate: "2014",
      endDate: "2018",
      grade: "3.8 GPA",
    },
  ],
  skills: ["Product Design", "Design Systems", "Figma", "Prototyping", "User Research", "Accessibility"],
  projects: [
    {
      id: "proj-1",
      name: "Atlas Design System",
      description: "Built a scalable component library adopted by 8 teams.",
      techStack: "Figma, Storybook",
      link: "atlas.design",
    },
  ],
  certifications: [
    { id: "cert-1", name: "NN/g UX Certification", issuer: "Nielsen Norman Group", date: "2022", link: "" },
  ],
  languages: [
    { language: "English", proficiency: "Native" },
    { language: "Spanish", proficiency: "Intermediate" },
  ],
  selectedTemplate: "minimal",
  accentColor: "#0f766e",
  fontFamily: "Inter, sans-serif",
};

export default function BuilderPage() {
  const [cvData, setCVData] = useState<CVData>(defaultCVData);
  const [builderStep, setBuilderStep] = useState<"template" | "edit">("template");
  const [hasSelectedTemplate, setHasSelectedTemplate] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingExperienceId, setLoadingExperienceId] = useState<string | null>(null);
  const [loadingSkills, setLoadingSkills] = useState(false);
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [loadingATS, setLoadingATS] = useState(false);
  const [ats, setAts] = useState<{ score: number; feedback: string[] } | null>(null);
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const isInitialLoad = useRef(true);

  useEffect(() => {
    const existing = loadCVData();
    if (existing) {
      setCVData(existing);
      setHasSelectedTemplate(true);
    }
    // Mark initial load complete after state is set
    window.setTimeout(() => {
      isInitialLoad.current = false;
    }, 0);
  }, []);

  useEffect(() => {
    if (isInitialLoad.current) return;
    const timer = window.setTimeout(() => {
      saveCVData(cvData);
      setSavedToast(true);
      window.setTimeout(() => setSavedToast(false), 1000);
    }, 1000);
    return () => clearTimeout(timer);
  }, [cvData]);

  const currentRole = useMemo(() => cvData.experience[0]?.role || "Professional", [cvData.experience]);

  /** Strip the photo base64 before sending CV data to AI endpoints */
  const cvDataForAI = useMemo(() => {
    return {
      ...cvData,
      personal: { ...cvData.personal, photo: undefined },
    };
  }, [cvData]);

  const hasUserContent = useMemo(() => {
    const personal = cvData.personal;
    if ([personal.fullName, personal.email, personal.phone, personal.location, personal.linkedin, personal.github, personal.website].some((value) => value.trim())) {
      return true;
    }
    if (cvData.summary.trim()) return true;
    if (cvData.experience.some((item) => [item.company, item.role, item.description, item.startDate, item.endDate].some((value) => value.trim()))) {
      return true;
    }
    if (cvData.education.some((item) => [item.institution, item.degree, item.field, item.startDate, item.endDate, item.grade || ""].some((value) => value.trim()))) {
      return true;
    }
    if (cvData.skills.length > 0) return true;
    if (cvData.projects.some((item) => [item.name, item.description, item.techStack, item.link || ""].some((value) => value.trim()))) return true;
    if (cvData.certifications.some((item) => [item.name, item.issuer, item.date, item.link || ""].some((value) => value.trim()))) return true;
    if (cvData.languages.some((item) => item.language.trim())) return true;
    return false;
  }, [cvData]);

  const templatePreviewData = useMemo<CVData>(() => {
    if (hasUserContent) return cvData;
    return {
      ...samplePreviewData,
      selectedTemplate: cvData.selectedTemplate,
      accentColor: cvData.accentColor,
      fontFamily: cvData.fontFamily,
    };
  }, [hasUserContent, cvData]);

  const generateSummary = async () => {
    setLoadingSummary(true);
    try {
      const res = await fetch("/api/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvData: cvDataForAI }),
      });
      const data = (await res.json()) as { summary: string };
      if (!res.ok) throw new Error("Failed to generate summary");
      setCVData((prev) => ({ ...prev, summary: data.summary }));
    } catch {
      alert("Could not generate summary.");
    } finally {
      setLoadingSummary(false);
    }
  };

  const generateDescription = async (id: string) => {
    const item = cvData.experience.find((experience) => experience.id === id);
    if (!item) return;

    setLoadingExperienceId(id);
    try {
      const res = await fetch("/api/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: item.role, company: item.company }),
      });
      const data = (await res.json()) as { description: string };
      if (!res.ok) throw new Error("Failed to generate description");
      setCVData((prev) => ({
        ...prev,
        experience: prev.experience.map((entry) => (entry.id === id ? { ...entry, description: data.description } : entry)),
      }));
    } catch {
      alert("Could not generate work description.");
    } finally {
      setLoadingExperienceId(null);
    }
  };

  const suggestSkills = async () => {
    setLoadingSkills(true);
    try {
      const res = await fetch("/api/suggest-skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle: currentRole }),
      });
      const data = (await res.json()) as { skills: string[] };
      if (!res.ok) throw new Error("Failed to suggest skills");
      setSuggestedSkills(data.skills);
    } catch {
      alert("Could not suggest skills.");
    } finally {
      setLoadingSkills(false);
    }
  };

  const runATS = async () => {
    setLoadingATS(true);
    try {
      const res = await fetch("/api/ats-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvData: cvDataForAI }),
      });
      const data = (await res.json()) as { score: number; feedback: string[] };
      if (!res.ok) throw new Error("Failed to run ATS checker");
      setAts(data);
    } catch {
      alert("Could not run ATS score check.");
    } finally {
      setLoadingATS(false);
    }
  };

  const downloadPdf = async () => {
    if (!cvData.personal.fullName.trim()) {
      alert("Please add your full name before exporting PDF.");
      return;
    }
    setDownloadLoading(true);
    try {
      await exportCVToPDF(cvData.personal.fullName);
    } catch {
      alert("Could not export PDF.");
    } finally {
      setDownloadLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 p-4 lg:p-6">
      <div className="mx-auto max-w-[1600px] space-y-4">
        {builderStep === "template" ? (
          <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Step 1 of 2</p>
                <h1 className="mt-2 text-2xl font-semibold text-white">Choose a template</h1>
                <p className="mt-1 text-sm text-slate-300">Pick a layout to start building your CV.</p>
              </div>
              <Button onClick={() => setBuilderStep("edit")} className="sm:self-end" disabled={!hasSelectedTemplate}>
                Continue
              </Button>
            </div>

            <div className="mt-6">
              <TemplateGallery
                selectedTemplate={cvData.selectedTemplate}
                onSelect={(template) => {
                  setHasSelectedTemplate(true);
                  setCVData((prev) => ({ ...prev, selectedTemplate: template }));
                }}
                previewData={templatePreviewData}
              />
            </div>
          </section>
        ) : (
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <TemplateSelector value={cvData.selectedTemplate} onChange={(template) => setCVData((prev) => ({ ...prev, selectedTemplate: template }))} />
            <div className="flex flex-wrap items-center gap-2">
              {colorPresets.map((color) => (
                <button
                  key={color}
                  className="h-7 w-7 rounded-full border border-slate-700"
                  style={{ backgroundColor: color }}
                  onClick={() => setCVData((prev) => ({ ...prev, accentColor: color }))}
                />
              ))}
              <Input
                value={cvData.accentColor}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^#[0-9a-fA-F]{0,6}$/.test(val)) {
                    setCVData((prev) => ({ ...prev, accentColor: val }));
                  }
                }}
                maxLength={7}
                className="w-28"
              />
              <Select
                value={cvData.fontFamily}
                options={[
                  { label: "Inter", value: "Inter, sans-serif" },
                  { label: "Roboto", value: "Roboto, sans-serif" },
                  { label: "Playfair Display", value: "Playfair Display, serif" },
                  { label: "Lato", value: "Lato, sans-serif" },
                ]}
                onChange={(e) => setCVData((prev) => ({ ...prev, fontFamily: e.target.value }))}
                className="w-44"
              />
              <Button onClick={() => void downloadPdf()} disabled={downloadLoading} className="gap-2">
                <Download className="h-4 w-4" /> {downloadLoading ? "Exporting..." : "Download PDF"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  clearCVData();
                  setCVData(defaultCVData);
                }}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" /> Clear All
              </Button>
              <Button variant="secondary" onClick={() => void runATS()} disabled={loadingATS}>
                {loadingATS ? "Checking..." : "Check ATS Score"}
              </Button>
            </div>
          </div>
          {ats && (
            <div className="mt-3 rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-sm text-slate-200">
              <p className="font-semibold text-white">ATS Score: {ats.score}/100</p>
              <ul className="ml-4 mt-1 list-disc">
                {ats.feedback.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        )}

        {builderStep === "edit" && (
          <div className="md:hidden">
            <div className="mb-2 flex gap-2">
              <Button variant={mobileTab === "edit" ? "default" : "outline"} onClick={() => setMobileTab("edit")}>
                Edit
              </Button>
              <Button variant={mobileTab === "preview" ? "default" : "outline"} onClick={() => setMobileTab("preview")}>
                Preview
              </Button>
            </div>
            {mobileTab === "edit" ? (
              <CVForm
                data={cvData}
                onChange={setCVData}
                onGenerateSummary={generateSummary}
                onGenerateDescription={generateDescription}
                onSuggestSkills={suggestSkills}
                suggestedSkills={suggestedSkills}
                loadingSummary={loadingSummary}
                loadingExperienceId={loadingExperienceId}
                loadingSkills={loadingSkills}
              />
            ) : (
              <div data-export-root className="overflow-auto rounded-xl border border-slate-800 bg-slate-900/70 p-1 sm:p-2">
                <div className="flex justify-center">
                  <div className="cv-preview-shell [--preview-scale:0.4] sm:[--preview-scale:0.55]">
                    <div className="cv-preview-scale">
                      <CVPreview data={cvData} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {builderStep === "edit" && (
          <div className="hidden gap-4 md:grid lg:grid-cols-2">
            <div>
              <CVForm
                data={cvData}
                onChange={setCVData}
                onGenerateSummary={generateSummary}
                onGenerateDescription={generateDescription}
                onSuggestSkills={suggestSkills}
                suggestedSkills={suggestedSkills}
                loadingSummary={loadingSummary}
                loadingExperienceId={loadingExperienceId}
                loadingSkills={loadingSkills}
              />
            </div>
            <div data-export-root className="max-h-[88vh] overflow-auto rounded-xl border border-slate-800 bg-slate-900/70 p-2 sm:p-3 lg:sticky lg:top-4">
              <div className="flex justify-center">
                <div className="cv-preview-shell [--preview-scale:0.7] lg:[--preview-scale:0.85] xl:[--preview-scale:1]">
                  <div className="cv-preview-scale">
                    <CVPreview data={cvData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {savedToast && <p className="fixed bottom-4 right-4 rounded-md border border-slate-800 bg-slate-900/90 px-3 py-2 text-sm text-slate-100">Saved</p>}
    </main>
  );
}
