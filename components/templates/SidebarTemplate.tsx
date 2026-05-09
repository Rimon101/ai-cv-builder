import type { CVData } from "@/lib/types";

export function SidebarTemplate({ data }: { data: CVData }) {
  return (
    <div
      id="cv-preview-content"
      style={{ fontFamily: data.fontFamily }}
      className="mx-auto min-h-[1123px] w-[794px] grid-cols-[230px_1fr] bg-white text-slate-900 md:grid"
    >
      <aside className="bg-slate-900 p-6 text-white">
        {data.personal.photo && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={data.personal.photo} alt={data.personal.fullName} className="h-20 w-20 rounded-full object-cover" />
        )}
        <h1 className="mt-4 text-2xl font-semibold">{data.personal.fullName || "Your Name"}</h1>
        <p className="mt-2 text-xs text-white/80">
          {[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).join(" | ")}
        </p>
        <p className="text-xs text-white/80">
          {[data.personal.linkedin, data.personal.github, data.personal.website].filter(Boolean).join(" | ")}
        </p>

        {data.skills.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-white/80">Skills</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-white/10 px-2.5 py-1 text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.languages.filter((l) => l.language.trim()).length > 0 && (
          <div className="mt-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-white/80">Languages</h2>
            <div className="mt-2 space-y-1 text-xs">
              {data.languages
                .filter((l) => l.language.trim())
                .map((lang, i) => (
                  <p key={i}>
                    {lang.language} <span className="text-white/60">({lang.proficiency})</span>
                  </p>
                ))}
            </div>
          </div>
        )}

        {data.certifications.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-white/80">Certifications</h2>
            <div className="mt-2 space-y-2 text-xs">
              {data.certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="font-semibold">{cert.name}</p>
                  <p className="text-white/70">
                    {cert.issuer}
                    {cert.date && ` | ${cert.date}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      <main className="p-8">
        {data.summary && (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: data.accentColor }}>
              Summary
            </h2>
            <p className="mt-2 text-sm leading-6">{data.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: data.accentColor }}>
              Experience
            </h2>
            <div className="mt-3 space-y-4">
              {data.experience.map((item) => (
                <div key={item.id}>
                  <div className="flex items-baseline justify-between">
                    <p className="text-sm font-semibold">{item.role || "Role"}</p>
                    {(item.startDate || item.endDate) && (
                      <p className="text-xs text-slate-500">
                        {item.startDate}
                        {item.endDate && ` – ${item.isCurrent ? "Present" : item.endDate}`}
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">{item.company}</p>
                  <p className="whitespace-pre-line text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: data.accentColor }}>
              Education
            </h2>
            <div className="mt-3 space-y-3">
              {data.education.map((item) => (
                <div key={item.id}>
                  <p className="text-sm font-semibold">{item.institution}</p>
                  <p className="text-sm text-slate-600">
                    {item.degree} {item.field && `in ${item.field}`}
                  </p>
                  <p className="text-xs text-slate-500">
                    {[item.startDate, item.endDate].filter(Boolean).join(" – ")}
                    {item.grade && ` | ${item.grade}`}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.projects.length > 0 && (
          <section className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: data.accentColor }}>
              Projects
            </h2>
            <div className="mt-3 space-y-3">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <p className="text-sm font-semibold">{project.name}</p>
                  <p className="text-sm text-slate-600">{project.description}</p>
                  {project.techStack && <p className="text-xs text-slate-500">Tech: {project.techStack}</p>}
                  {project.link && <p className="text-xs text-slate-500">{project.link}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
