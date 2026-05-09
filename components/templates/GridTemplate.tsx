import type { CVData } from "@/lib/types";

export function GridTemplate({ data }: { data: CVData }) {
  return (
    <div
      id="cv-preview-content"
      style={{ fontFamily: data.fontFamily }}
      className="mx-auto min-h-[1123px] w-[794px] bg-white p-10 text-slate-900"
    >
      <header className="rounded-2xl p-6 text-white" style={{ backgroundColor: data.accentColor }}>
        <h1 className="text-4xl font-semibold">{data.personal.fullName || "Your Name"}</h1>
        <p className="mt-2 text-sm text-white/90">
          {[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).join(" | ")}
        </p>
        <p className="text-sm text-white/90">
          {[data.personal.linkedin, data.personal.github, data.personal.website].filter(Boolean).join(" | ")}
        </p>
      </header>

      {data.summary && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: data.accentColor }}>
            Summary
          </h2>
          <p className="mt-2 text-sm leading-6">{data.summary}</p>
        </section>
      )}

      <section className="mt-6 grid grid-cols-2 gap-6">
        {data.experience.length > 0 && (
          <div className="rounded-xl border p-4">
            <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: data.accentColor }}>
              Experience
            </h2>
            <div className="mt-3 space-y-3">
              {data.experience.map((item) => (
                <div key={item.id}>
                  <p className="text-sm font-semibold">{item.role || "Role"}</p>
                  <p className="text-sm text-slate-600">{item.company}</p>
                  {(item.startDate || item.endDate) && (
                    <p className="text-xs text-slate-500">
                      {item.startDate}
                      {item.endDate && ` – ${item.isCurrent ? "Present" : item.endDate}`}
                    </p>
                  )}
                  <p className="whitespace-pre-line text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education.length > 0 && (
          <div className="rounded-xl border p-4">
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
          </div>
        )}

        {data.skills.length > 0 && (
          <div className="rounded-xl border p-4">
            <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: data.accentColor }}>
              Skills
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.projects.length > 0 && (
          <div className="rounded-xl border p-4">
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
          </div>
        )}

        {data.certifications.length > 0 && (
          <div className="rounded-xl border p-4">
            <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: data.accentColor }}>
              Certifications
            </h2>
            <div className="mt-3 space-y-2">
              {data.certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="text-sm font-semibold">{cert.name}</p>
                  <p className="text-xs text-slate-500">
                    {cert.issuer}
                    {cert.date && ` | ${cert.date}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.languages.filter((l) => l.language.trim()).length > 0 && (
          <div className="rounded-xl border p-4">
            <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: data.accentColor }}>
              Languages
            </h2>
            <div className="mt-3 space-y-1 text-sm">
              {data.languages
                .filter((l) => l.language.trim())
                .map((lang, i) => (
                  <p key={i}>
                    {lang.language} <span className="text-slate-500">({lang.proficiency})</span>
                  </p>
                ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
