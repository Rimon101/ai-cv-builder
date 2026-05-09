import { BriefcaseBusiness, Globe, GraduationCap, Mail, Phone } from "lucide-react";
import type { CVData } from "@/lib/types";

export function CreativeTemplate({ data }: { data: CVData }) {
  return (
    <div
      id="cv-preview-content"
      style={{ fontFamily: data.fontFamily }}
      className="mx-auto min-h-[1123px] w-[794px] bg-slate-50 p-8 text-slate-900"
    >
      <header className="flex items-center gap-5 rounded-xl p-6 text-white" style={{ backgroundColor: data.accentColor }}>
        {data.personal.photo && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={data.personal.photo}
            alt={data.personal.fullName}
            className="h-20 w-20 rounded-full border-2 border-white/40 object-cover"
          />
        )}
        <div>
          <h1 className="text-4xl font-bold">{data.personal.fullName || "Your Name"}</h1>
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            {data.personal.email && (
              <span className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4" /> {data.personal.email}
              </span>
            )}
            {data.personal.phone && (
              <span className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4" /> {data.personal.phone}
              </span>
            )}
            {(data.personal.website || data.personal.linkedin) && (
              <span className="inline-flex items-center gap-2">
                <Globe className="h-4 w-4" /> {data.personal.website || data.personal.linkedin}
              </span>
            )}
          </div>
        </div>
      </header>

      <section className="mt-5 grid grid-cols-2 gap-4">
        {data.summary && (
          <article className="rounded-xl bg-white p-4 shadow-sm">
            <h2 className="text-base font-semibold">Summary</h2>
            <p className="mt-2 text-sm">{data.summary}</p>
          </article>
        )}
        {data.skills.length > 0 && (
          <article className="rounded-xl bg-white p-4 shadow-sm">
            <h2 className="text-base font-semibold">Skills</h2>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {data.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full px-2.5 py-0.5 text-xs text-white"
                  style={{ backgroundColor: data.accentColor }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </article>
        )}
      </section>

      {data.experience.length > 0 && (
        <section className="mt-5 rounded-xl bg-white p-4 shadow-sm">
          <h2 className="inline-flex items-center gap-2 text-base font-semibold">
            <BriefcaseBusiness className="h-4 w-4" /> Experience
          </h2>
          {data.experience.map((item) => (
            <div key={item.id} className="mt-2 text-sm">
              <div className="flex items-baseline justify-between">
                <p className="font-semibold">{item.role}</p>
                <p className="text-xs text-slate-500">
                  {item.startDate}
                  {item.endDate && ` – ${item.isCurrent ? "Present" : item.endDate}`}
                </p>
              </div>
              <p className="text-slate-600">{item.company}</p>
              <p className="whitespace-pre-line">{item.description}</p>
            </div>
          ))}
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mt-5 rounded-xl bg-white p-4 shadow-sm">
          <h2 className="inline-flex items-center gap-2 text-base font-semibold">
            <GraduationCap className="h-4 w-4" /> Education
          </h2>
          {data.education.map((item) => (
            <div key={item.id} className="mt-2 text-sm">
              <p className="font-semibold">{item.institution}</p>
              <p className="text-slate-600">
                {item.degree} {item.field && `in ${item.field}`}
              </p>
              <p className="text-xs text-slate-500">
                {[item.startDate, item.endDate].filter(Boolean).join(" – ")}
                {item.grade && ` | ${item.grade}`}
              </p>
            </div>
          ))}
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="mt-5 rounded-xl bg-white p-4 shadow-sm">
          <h2 className="text-base font-semibold">Projects</h2>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {data.projects.map((project) => (
              <div key={project.id} className="rounded-lg border p-3 text-sm">
                <p className="font-semibold">{project.name}</p>
                <p className="text-slate-600">{project.description}</p>
                {project.techStack && <p className="mt-1 text-xs text-slate-500">Tech: {project.techStack}</p>}
                {project.link && <p className="text-xs text-slate-500">{project.link}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-5 grid grid-cols-2 gap-4">
        {data.certifications.length > 0 && (
          <article className="rounded-xl bg-white p-4 shadow-sm">
            <h2 className="text-base font-semibold">Certifications</h2>
            {data.certifications.map((cert) => (
              <div key={cert.id} className="mt-2 text-sm">
                <p className="font-semibold">{cert.name}</p>
                <p className="text-xs text-slate-500">
                  {cert.issuer}
                  {cert.date && ` | ${cert.date}`}
                </p>
              </div>
            ))}
          </article>
        )}
        {data.languages.filter((l) => l.language.trim()).length > 0 && (
          <article className="rounded-xl bg-white p-4 shadow-sm">
            <h2 className="text-base font-semibold">Languages</h2>
            <div className="mt-2 space-y-1">
              {data.languages
                .filter((l) => l.language.trim())
                .map((lang, i) => (
                  <p key={i} className="text-sm">
                    {lang.language} <span className="text-slate-500">({lang.proficiency})</span>
                  </p>
                ))}
            </div>
          </article>
        )}
      </section>
    </div>
  );
}
