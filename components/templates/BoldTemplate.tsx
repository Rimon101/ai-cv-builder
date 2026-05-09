import type { CVData } from "@/lib/types";

export function BoldTemplate({ data }: { data: CVData }) {
  return (
    <div
      id="cv-preview-content"
      style={{ fontFamily: data.fontFamily }}
      className="mx-auto min-h-[1123px] w-[794px] bg-white text-slate-900"
    >
      <header className="p-10 text-white" style={{ backgroundColor: data.accentColor }}>
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/80">Bold Resume</p>
            <h1 className="mt-3 text-4xl font-semibold">{data.personal.fullName || "Your Name"}</h1>
            <p className="mt-2 text-sm text-white/90">
              {[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).join(" | ")}
            </p>
            <p className="text-sm text-white/90">
              {[data.personal.linkedin, data.personal.github, data.personal.website].filter(Boolean).join(" | ")}
            </p>
          </div>
          {data.personal.photo && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={data.personal.photo} alt={data.personal.fullName} className="h-20 w-20 rounded-full border-2 border-white/40 object-cover" />
          )}
        </div>
      </header>

      <section className="grid grid-cols-[1fr_240px] gap-6 px-10 py-8">
        <main>
          {data.summary && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: data.accentColor }}>
                Summary
              </h2>
              <p className="mt-2 text-sm leading-6">{data.summary}</p>
            </section>
          )}

          {data.experience.length > 0 && (
            <section className="mt-5">
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

          {data.projects.length > 0 && (
            <section className="mt-5">
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

        <aside className="space-y-4">
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: data.accentColor }}>
                Skills
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: data.accentColor }}>
                Education
              </h2>
              <div className="mt-2 space-y-2">
                {data.education.map((item) => (
                  <div key={item.id}>
                    <p className="text-sm font-semibold">{item.institution}</p>
                    <p className="text-sm text-slate-600">
                      {item.degree} {item.field && `in ${item.field}`}
                    </p>
                    <p className="text-xs text-slate-500">
                      {[item.startDate, item.endDate].filter(Boolean).join(" – ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.languages.filter((l) => l.language.trim()).length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: data.accentColor }}>
                Languages
              </h2>
              <div className="mt-2 space-y-1 text-sm">
                {data.languages
                  .filter((l) => l.language.trim())
                  .map((lang, i) => (
                    <p key={i}>
                      {lang.language} <span className="text-slate-500">({lang.proficiency})</span>
                    </p>
                  ))}
              </div>
            </section>
          )}
        </aside>
      </section>
    </div>
  );
}
