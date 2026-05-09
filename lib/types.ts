export type CVTemplate =
  | "minimal"
  | "modern"
  | "classic"
  | "creative"
  | "executive"
  | "compact"
  | "professional"
  | "elegant"
  | "timeline"
  | "corporate"
  | "bold"
  | "serif"
  | "sidebar"
  | "grid"
  | "refined"
  | "slate";

export interface CVData {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    website: string;
    photo?: string;
  };
  summary: string;
  experience: {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    description: string;
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    grade?: string;
  }[];
  skills: string[];
  projects: {
    id: string;
    name: string;
    description: string;
    techStack: string;
    link?: string;
  }[];
  certifications: {
    id: string;
    name: string;
    issuer: string;
    date: string;
    link?: string;
  }[];
  languages: {
    language: string;
    proficiency: string;
  }[];
  selectedTemplate: CVTemplate;
  accentColor: string;
  fontFamily: string;
}

export const defaultCVData: CVData = {
  personal: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
    photo: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [{ language: "", proficiency: "Intermediate" }],
  selectedTemplate: "minimal",
  accentColor: "#0f766e",
  fontFamily: "Inter, sans-serif",
};
