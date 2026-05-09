"use client";

import { Plus, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { CVData } from "@/lib/types";

interface CVFormProps {
  data: CVData;
  onChange: (data: CVData) => void;
  onGenerateSummary: () => Promise<void>;
  onGenerateDescription: (id: string) => Promise<void>;
  onSuggestSkills: () => Promise<void>;
  suggestedSkills: string[];
  loadingSummary: boolean;
  loadingExperienceId: string | null;
  loadingSkills: boolean;
}

const levels = ["Native", "Fluent", "Intermediate", "Basic"];

export function CVForm(props: CVFormProps) {
  const {
    data,
    onChange,
    onGenerateSummary,
    onGenerateDescription,
    onSuggestSkills,
    suggestedSkills,
    loadingSummary,
    loadingExperienceId,
    loadingSkills,
  } = props;

  const setData = (updater: (previous: CVData) => CVData) => onChange(updater(data));

  const onPhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setData((prev) => ({ ...prev, personal: { ...prev.personal, photo: String(reader.result) } }));
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <details open className="rounded-lg border bg-white p-4">
        <summary className="cursor-pointer text-lg font-semibold">Personal Info</summary>
        <div className="mt-3 grid gap-3">
          <Input placeholder="Full Name" value={data.personal.fullName} onChange={(e) => setData((p) => ({ ...p, personal: { ...p.personal, fullName: e.target.value } }))} />
          <Input placeholder="Email" value={data.personal.email} onChange={(e) => setData((p) => ({ ...p, personal: { ...p.personal, email: e.target.value } }))} />
          <Input placeholder="Phone" value={data.personal.phone} onChange={(e) => setData((p) => ({ ...p, personal: { ...p.personal, phone: e.target.value } }))} />
          <Input placeholder="Location" value={data.personal.location} onChange={(e) => setData((p) => ({ ...p, personal: { ...p.personal, location: e.target.value } }))} />
          <Input placeholder="LinkedIn URL" value={data.personal.linkedin} onChange={(e) => setData((p) => ({ ...p, personal: { ...p.personal, linkedin: e.target.value } }))} />
          <Input placeholder="GitHub URL" value={data.personal.github} onChange={(e) => setData((p) => ({ ...p, personal: { ...p.personal, github: e.target.value } }))} />
          <Input placeholder="Website URL" value={data.personal.website} onChange={(e) => setData((p) => ({ ...p, personal: { ...p.personal, website: e.target.value } }))} />
          <Input type="file" accept="image/*" onChange={onPhotoUpload} />
        </div>
      </details>

      <details className="rounded-lg border bg-white p-4" open>
        <summary className="cursor-pointer text-lg font-semibold">Professional Summary</summary>
        <div className="mt-3 space-y-2">
          <p className="text-sm text-slate-600">Write you Profession Keyword and generate the Summary with AI</p>
          <Textarea value={data.summary} onChange={(e) => setData((p) => ({ ...p, summary: e.target.value }))} />
          <Button onClick={() => void onGenerateSummary()} disabled={loadingSummary} className="gap-2">
            <Sparkles className="h-4 w-4" /> {loadingSummary ? "Generating..." : "Generate with AI"}
          </Button>
        </div>
      </details>

      <details className="rounded-lg border bg-white p-4" open>
        <summary className="cursor-pointer text-lg font-semibold">Work Experience</summary>
        <div className="mt-3 space-y-3">
          {data.experience.map((experience) => (
            <div key={experience.id} className="space-y-2 rounded-md border p-3">
              <Input placeholder="Company" value={experience.company} onChange={(e) => setData((p) => ({ ...p, experience: p.experience.map((item) => (item.id === experience.id ? { ...item, company: e.target.value } : item)) }))} />
              <Input placeholder="Job Title" value={experience.role} onChange={(e) => setData((p) => ({ ...p, experience: p.experience.map((item) => (item.id === experience.id ? { ...item, role: e.target.value } : item)) }))} />
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Start Date" value={experience.startDate} onChange={(e) => setData((p) => ({ ...p, experience: p.experience.map((item) => (item.id === experience.id ? { ...item, startDate: e.target.value } : item)) }))} />
                <Input placeholder="End Date" value={experience.endDate} onChange={(e) => setData((p) => ({ ...p, experience: p.experience.map((item) => (item.id === experience.id ? { ...item, endDate: e.target.value } : item)) }))} />
              </div>
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={experience.isCurrent} onChange={(e) => setData((p) => ({ ...p, experience: p.experience.map((item) => (item.id === experience.id ? { ...item, isCurrent: e.target.checked } : item)) }))} />
                Currently Working Here
              </label>
              <Textarea placeholder="Description" value={experience.description} onChange={(e) => setData((p) => ({ ...p, experience: p.experience.map((item) => (item.id === experience.id ? { ...item, description: e.target.value } : item)) }))} />
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => void onGenerateDescription(experience.id)} disabled={loadingExperienceId === experience.id}>
                  {loadingExperienceId === experience.id ? "Writing..." : "Write with AI"}
                </Button>
                <Button variant="destructive" onClick={() => setData((p) => ({ ...p, experience: p.experience.filter((item) => item.id !== experience.id) }))}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={() => setData((p) => ({ ...p, experience: [...p.experience, { id: crypto.randomUUID(), company: "", role: "", startDate: "", endDate: "", isCurrent: false, description: "" }] }))}>
            <Plus className="mr-2 h-4 w-4" /> Add Experience
          </Button>
        </div>
      </details>

      <details className="rounded-lg border bg-white p-4" open>
        <summary className="cursor-pointer text-lg font-semibold">Education</summary>
        <div className="mt-3 space-y-3">
          {data.education.map((education) => (
            <div key={education.id} className="space-y-2 rounded-md border p-3">
              <Input placeholder="Institution" value={education.institution} onChange={(e) => setData((p) => ({ ...p, education: p.education.map((item) => (item.id === education.id ? { ...item, institution: e.target.value } : item)) }))} />
              <Input placeholder="Degree" value={education.degree} onChange={(e) => setData((p) => ({ ...p, education: p.education.map((item) => (item.id === education.id ? { ...item, degree: e.target.value } : item)) }))} />
              <Input placeholder="Field" value={education.field} onChange={(e) => setData((p) => ({ ...p, education: p.education.map((item) => (item.id === education.id ? { ...item, field: e.target.value } : item)) }))} />
              <Input placeholder="Start Year" value={education.startDate} onChange={(e) => setData((p) => ({ ...p, education: p.education.map((item) => (item.id === education.id ? { ...item, startDate: e.target.value } : item)) }))} />
              <Input placeholder="End Year" value={education.endDate} onChange={(e) => setData((p) => ({ ...p, education: p.education.map((item) => (item.id === education.id ? { ...item, endDate: e.target.value } : item)) }))} />
              <Input placeholder="Grade / GPA" value={education.grade || ""} onChange={(e) => setData((p) => ({ ...p, education: p.education.map((item) => (item.id === education.id ? { ...item, grade: e.target.value } : item)) }))} />
              <Button variant="destructive" onClick={() => setData((p) => ({ ...p, education: p.education.filter((item) => item.id !== education.id) }))}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={() => setData((p) => ({ ...p, education: [...p.education, { id: crypto.randomUUID(), institution: "", degree: "", field: "", startDate: "", endDate: "", grade: "" }] }))}>
            <Plus className="mr-2 h-4 w-4" /> Add Education
          </Button>
        </div>
      </details>

      <details className="rounded-lg border bg-white p-4" open>
        <summary className="cursor-pointer text-lg font-semibold">Skills</summary>
        <div className="mt-3 space-y-3">
          <Input
            placeholder="Type skill and press Enter"
            onKeyDown={(event) => {
              if (event.key !== "Enter") return;
              event.preventDefault();
              const value = event.currentTarget.value.trim();
              if (!value || data.skills.includes(value)) return;
              setData((p) => ({ ...p, skills: [...p.skills, value] }));
              event.currentTarget.value = "";
            }}
          />
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <button key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-sm" onClick={() => setData((p) => ({ ...p, skills: p.skills.filter((item) => item !== skill) }))}>
                {skill} ×
              </button>
            ))}
          </div>
          <Button variant="secondary" onClick={() => void onSuggestSkills()} disabled={loadingSkills}>
            {loadingSkills ? "Suggesting..." : "Suggest Skills"}
          </Button>
          <div className="flex flex-wrap gap-2">
            {suggestedSkills.map((skill) => (
              <button
                key={skill}
                className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm"
                onClick={() => !data.skills.includes(skill) && setData((p) => ({ ...p, skills: [...p.skills, skill] }))}
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
      </details>

      <details className="rounded-lg border bg-white p-4">
        <summary className="cursor-pointer text-lg font-semibold">Projects</summary>
        <div className="mt-3 space-y-3">
          {data.projects.map((project) => (
            <div key={project.id} className="space-y-2 rounded-md border p-3">
              <Input placeholder="Project Name" value={project.name} onChange={(e) => setData((p) => ({ ...p, projects: p.projects.map((item) => (item.id === project.id ? { ...item, name: e.target.value } : item)) }))} />
              <Textarea placeholder="Description" value={project.description} onChange={(e) => setData((p) => ({ ...p, projects: p.projects.map((item) => (item.id === project.id ? { ...item, description: e.target.value } : item)) }))} />
              <Input placeholder="Tech Stack" value={project.techStack} onChange={(e) => setData((p) => ({ ...p, projects: p.projects.map((item) => (item.id === project.id ? { ...item, techStack: e.target.value } : item)) }))} />
              <Input placeholder="Link" value={project.link || ""} onChange={(e) => setData((p) => ({ ...p, projects: p.projects.map((item) => (item.id === project.id ? { ...item, link: e.target.value } : item)) }))} />
              <Button variant="destructive" onClick={() => setData((p) => ({ ...p, projects: p.projects.filter((item) => item.id !== project.id) }))}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={() => setData((p) => ({ ...p, projects: [...p.projects, { id: crypto.randomUUID(), name: "", description: "", techStack: "", link: "" }] }))}>
            <Plus className="mr-2 h-4 w-4" /> Add Project
          </Button>
        </div>
      </details>

      <details className="rounded-lg border bg-white p-4">
        <summary className="cursor-pointer text-lg font-semibold">Certifications</summary>
        <div className="mt-3 space-y-3">
          {data.certifications.map((certification) => (
            <div key={certification.id} className="space-y-2 rounded-md border p-3">
              <Input placeholder="Certificate Name" value={certification.name} onChange={(e) => setData((p) => ({ ...p, certifications: p.certifications.map((item) => (item.id === certification.id ? { ...item, name: e.target.value } : item)) }))} />
              <Input placeholder="Issuer" value={certification.issuer} onChange={(e) => setData((p) => ({ ...p, certifications: p.certifications.map((item) => (item.id === certification.id ? { ...item, issuer: e.target.value } : item)) }))} />
              <Input placeholder="Date" value={certification.date} onChange={(e) => setData((p) => ({ ...p, certifications: p.certifications.map((item) => (item.id === certification.id ? { ...item, date: e.target.value } : item)) }))} />
              <Input placeholder="Credential Link" value={certification.link || ""} onChange={(e) => setData((p) => ({ ...p, certifications: p.certifications.map((item) => (item.id === certification.id ? { ...item, link: e.target.value } : item)) }))} />
              <Button variant="destructive" onClick={() => setData((p) => ({ ...p, certifications: p.certifications.filter((item) => item.id !== certification.id) }))}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={() => setData((p) => ({ ...p, certifications: [...p.certifications, { id: crypto.randomUUID(), name: "", issuer: "", date: "", link: "" }] }))}>
            <Plus className="mr-2 h-4 w-4" /> Add Certification
          </Button>
        </div>
      </details>

      <details className="rounded-lg border bg-white p-4">
        <summary className="cursor-pointer text-lg font-semibold">Languages</summary>
        <div className="mt-3 space-y-3">
          {data.languages.map((language, index) => (
            <div key={`${language.language}-${index}`} className="flex items-start gap-2 rounded-md border p-3">
              <div className="grid flex-1 grid-cols-2 gap-2">
                <Input
                  placeholder="Language"
                  value={language.language}
                  onChange={(e) =>
                    setData((p) => ({
                      ...p,
                      languages: p.languages.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, language: e.target.value } : item,
                      ),
                    }))
                  }
                />
                <Select
                  value={language.proficiency}
                  options={levels.map((level) => ({ label: level, value: level }))}
                  onChange={(e) =>
                    setData((p) => ({
                      ...p,
                      languages: p.languages.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, proficiency: e.target.value } : item,
                      ),
                    }))
                  }
                />
              </div>
              <Button variant="destructive" onClick={() => setData((p) => ({ ...p, languages: p.languages.filter((_, i) => i !== index) }))}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={() => setData((p) => ({ ...p, languages: [...p.languages, { language: "", proficiency: "Intermediate" }] }))}>
            <Plus className="mr-2 h-4 w-4" /> Add Language
          </Button>
        </div>
      </details>
    </div>
  );
}
