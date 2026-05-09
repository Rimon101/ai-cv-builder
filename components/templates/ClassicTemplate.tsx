import type { CVData } from "@/lib/types";

export function ClassicTemplate({ data }: { data: CVData }) {
  return (
    <div
      id="cv-preview-content"
      style={{ fontFamily: data.fontFamily }}
      className="mx-auto min-h-[1123px] w-[794px] bg-white px-12 py-10 text-slate-900"
    >
      <header className="text-center">
        {data.personal.photo && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={data.personal.photo}
            alt={data.personal.fullName}
            className="mx-auto mb-3 h-24 w-24 rounded-full object-cover"
          />
        )}
        <h1 className="text-4xl font-bold">{data.personal.fullName || "Your Name"}</h1>
        <p className="mt-2 text-sm">
          {[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).join(" | ")}
        </p>
        <p className="text-sm text-slate-600">
          {[data.personal.linkedin, data.personal.github, data.personal.website].filter(Boolean).join(" | ")}
        </p>
      </header>

      {data.summary && (
        <section className="mt-8 border-t pt-4">
          <h2 className="text-base font-bold uppercase tracking-wider" style={{ color: data.accentColor }}>
            Professional Summary
          </h2>
          <p className="mt-2 text-sm leading-6">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mt-6 border-t pt-4">
          <h2 className="text-base font-bold uppercase tracking-wider" style={{ color: data.accentColor }}>
            Experience
          </h2>
          {data.experience.map((item) => (
            <div key={item.id} className="mt-3">
              <div className="flex items-baseline justify-between">
                <p className="font-semibold">{item.role}</p>
                <p className="text-xs text-slate-500">
                  {item.startDate}
                  {item.endDate && ` – ${item.isCurrent ? "Present" : item.endDate}`}
                </p>
              </div>
              <p className="text-sm text-slate-600">{item.company}</p>
              <p className="whitespace-pre-line text-sm">{item.description}</p>
            </div>
          ))}
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mt-6 border-t pt-4">
          <h2 className="text-base font-bold uppercase tracking-wider" style={{ color: data.accentColor }}>
            Education
          </h2>
          {data.education.map((item) => (
            <div key={item.id} className="mt-2 text-sm">
              <div className="flex items-baseline justify-between">
                <p className="font-semibold">{item.institution}</p>
                <p className="text-xs text-slate-500">
                  {[item.startDate, item.endDate].filter(Boolean).join(" – ")}
                </p>
              </div>
              <p>
                {item.degree} {item.field && `in ${item.field}`}
              </p>
              {item.grade && <p className="text-xs text-slate-500">Grade: {item.grade}</p>}
            </div>
          ))}
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mt-6 border-t pt-4">
          <h2 className="text-base font-bold uppercase tracking-wider" style={{ color: data.accentColor }}>
            Skills
          </h2>
          <p className="mt-2 text-sm leading-6">{data.skills.join(" · ")}</p>
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="mt-6 border-t pt-4">
          <h2 className="text-base font-bold uppercase tracking-wider" style={{ color: data.accentColor }}>
            Projects
          </h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mt-2 text-sm">
              <p className="font-semibold">{project.name}</p>
              <p>{project.description}</p>
              {project.techStack && <p className="text-xs text-slate-500">Tech: {project.techStack}</p>}
              {project.link && <p className="text-xs text-slate-500">{project.link}</p>}
            </div>
          ))}
        </section>
      )}

      {data.certifications.length > 0 && (
        <section className="mt-6 border-t pt-4">
          <h2 className="text-base font-bold uppercase tracking-wider" style={{ color: data.accentColor }}>
            Certifications
          </h2>
          {data.certifications.map((cert) => (
            <div key={cert.id} className="mt-2 text-sm">
              <p className="font-semibold">{cert.name}</p>
              <p className="text-xs text-slate-600">
                {cert.issuer}
                {cert.date && ` | ${cert.date}`}
              </p>
              {cert.link && <p className="text-xs text-slate-500">{cert.link}</p>}
            </div>
          ))}
        </section>
      )}

      {data.languages.filter((l) => l.language.trim()).length > 0 && (
        <section className="mt-6 border-t pt-4">
          <h2 className="text-base font-bold uppercase tracking-wider" style={{ color: data.accentColor }}>
            Languages
          </h2>
          <p className="mt-2 text-sm">
            {data.languages
              .filter((l) => l.language.trim())
              .map((l) => `${l.language} (${l.proficiency})`)
              .join(" · ")}
          </p>
        </section>
      )}
    </div>
  );
}
