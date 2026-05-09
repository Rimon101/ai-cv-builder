import type { CVData } from "@/lib/types";
import { BoldTemplate } from "@/components/templates/BoldTemplate";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { CompactTemplate } from "@/components/templates/CompactTemplate";
import { CreativeTemplate } from "@/components/templates/CreativeTemplate";
import { CorporateTemplate } from "@/components/templates/CorporateTemplate";
import { ElegantTemplate } from "@/components/templates/ElegantTemplate";
import { ExecutiveTemplate } from "@/components/templates/ExecutiveTemplate";
import { GridTemplate } from "@/components/templates/GridTemplate";
import { MinimalTemplate } from "@/components/templates/MinimalTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { ProfessionalTemplate } from "@/components/templates/ProfessionalTemplate";
import { RefinedTemplate } from "@/components/templates/RefinedTemplate";
import { SerifTemplate } from "@/components/templates/SerifTemplate";
import { SidebarTemplate } from "@/components/templates/SidebarTemplate";
import { SlateTemplate } from "@/components/templates/SlateTemplate";
import { TimelineTemplate } from "@/components/templates/TimelineTemplate";

export function CVPreview({ data }: { data: CVData }) {
  if (data.selectedTemplate === "modern") return <ModernTemplate data={data} />;
  if (data.selectedTemplate === "classic") return <ClassicTemplate data={data} />;
  if (data.selectedTemplate === "creative") return <CreativeTemplate data={data} />;
  if (data.selectedTemplate === "executive") return <ExecutiveTemplate data={data} />;
  if (data.selectedTemplate === "compact") return <CompactTemplate data={data} />;
  if (data.selectedTemplate === "professional") return <ProfessionalTemplate data={data} />;
  if (data.selectedTemplate === "elegant") return <ElegantTemplate data={data} />;
  if (data.selectedTemplate === "timeline") return <TimelineTemplate data={data} />;
  if (data.selectedTemplate === "corporate") return <CorporateTemplate data={data} />;
  if (data.selectedTemplate === "bold") return <BoldTemplate data={data} />;
  if (data.selectedTemplate === "serif") return <SerifTemplate data={data} />;
  if (data.selectedTemplate === "sidebar") return <SidebarTemplate data={data} />;
  if (data.selectedTemplate === "grid") return <GridTemplate data={data} />;
  if (data.selectedTemplate === "refined") return <RefinedTemplate data={data} />;
  if (data.selectedTemplate === "slate") return <SlateTemplate data={data} />;
  return <MinimalTemplate data={data} />;
}
