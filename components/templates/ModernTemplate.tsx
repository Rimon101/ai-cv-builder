import type { CVData } from "@/lib/types";

export function ModernTemplate({ data }: { data: CVData }) {
  return (
    <div
      id="cv-preview-content"
      style={{ fontFamily: data.fontFamily }}
      className="mx-auto grid min-h-[1123px] w-[794px] grid-cols-[260px_1fr] bg-white"
    >
      <aside className="p-6 text-white" style={{ backgroundColor: data.accentColor }}>
        {data.personal.photo && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={data.personal.photo}
            alt={data.personal.fullName}
            className="mb-4 h-24 w-24 rounded-full border-2 border-white/40 object-cover"
          />
        )}
        <h1 className="text-3xl font-bold">{data.personal.fullName || "Your Name"}</h1>
        <p className="mt-4 text-sm">{data.personal.email}</p>
        <p className="text-sm">{data.personal.phone}</p>
        {data.personal.location && <p className="text-sm">{data.personal.location}</p>}
        {data.personal.linkedin && <p className="mt-2 text-xs break-all">{data.personal.linkedin}</p>}
        {data.personal.github && <p className="text-xs break-all">{data.personal.github}</p>}
        {data.personal.website && <p className="text-xs break-all">{data.personal.website}</p>}

        {data.skills.length > 0 && (
          <>
            <p className="mt-8 text-sm font-semibold uppercase tracking-wide">Skills</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span key={skill} className="rounded bg-white/20 px-2 py-1 text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </>
        )}

        {data.languages.filter((l) => l.language.trim()).length > 0 && (
          <>
            <p className="mt-8 text-sm font-semibold uppercase tracking-wide">Languages</p>
            <div className="mt-2 space-y-1">
              {data.languages
                .filter((l) => l.language.trim())
                .map((lang, i) => (
                  <p key={i} className="text-xs">
                    {lang.language} — {lang.proficiency}
                  </p>
                ))}
            </div>
          </>
        )}

        {data.certifications.length > 0 && (
          <>
            <p className="mt-8 text-sm font-semibold uppercase tracking-wide">Certifications</p>
            <div className="mt-2 space-y-2">
              {data.certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="text-xs font-semibold">{cert.name}</p>
                  <p className="text-xs opacity-80">
                    {cert.issuer}
                    {cert.date && ` | ${cert.date}`}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </aside>

      <main className="p-8 text-slate-900">
        {data.summary && (
          <section>
            <h2 className="text-lg font-semibold" style={{ color: data.accentColor }}>
              Summary
            </h2>
            <p className="mt-2 text-sm leading-6">{data.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="mt-6">
            <h2 className="text-lg font-semibold" style={{ color: data.accentColor }}>
              Experience
            </h2>
            {data.experience.map((item) => (
              <article key={item.id} className="mt-3">
                <p className="font-semibold">{item.role}</p>
                <p className="text-sm text-slate-600">
                  {item.company}
                  {(item.startDate || item.endDate) && (
                    <span className="ml-2">
                      ({item.startDate}
                      {item.endDate && ` – ${item.isCurrent ? "Present" : item.endDate}`})
                    </span>
                  )}
                </p>
                <p className="whitespace-pre-line text-sm">{item.description}</p>
              </article>
            ))}
          </section>
        )}

        {data.education.length > 0 && (
          <section className="mt-6">
            <h2 className="text-lg font-semibold" style={{ color: data.accentColor }}>
              Education
            </h2>
            {data.education.map((item) => (
              <article key={item.id} className="mt-3">
                <p className="font-semibold">{item.institution}</p>
                <p className="text-sm text-slate-600">
                  {item.degree} {item.field && `in ${item.field}`}
                </p>
                <p className="text-xs text-slate-500">
                  {[item.startDate, item.endDate].filter(Boolean).join(" – ")}
                  {item.grade && ` | ${item.grade}`}
                </p>
              </article>
            ))}
          </section>
        )}

        {data.projects.length > 0 && (
          <section className="mt-6">
            <h2 className="text-lg font-semibold" style={{ color: data.accentColor }}>
              Projects
            </h2>
            {data.projects.map((project) => (
              <article key={project.id} className="mt-3">
                <p className="font-semibold">{project.name}</p>
                <p className="text-sm">{project.description}</p>
                {project.techStack && <p className="text-xs text-slate-500">Tech: {project.techStack}</p>}
                {project.link && <p className="text-xs text-slate-500">{project.link}</p>}
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
