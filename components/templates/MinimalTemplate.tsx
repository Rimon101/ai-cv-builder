import type { CVData } from "@/lib/types";

export function MinimalTemplate({ data }: { data: CVData }) {
  return (
    <div
      id="cv-preview-content"
      style={{ fontFamily: data.fontFamily }}
      className="mx-auto min-h-[1123px] w-[794px] bg-white p-10 text-slate-900"
    >
      <header className="flex items-start gap-5 border-b pb-4">
        {data.personal.photo && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={data.personal.photo}
            alt={data.personal.fullName}
            className="h-20 w-20 rounded-full object-cover"
          />
        )}
        <div>
          <h1 className="text-4xl font-bold">{data.personal.fullName || "Your Name"}</h1>
          <p className="mt-2 text-sm text-slate-600">
            {[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).join(" | ")}
          </p>
          <p className="text-sm text-slate-600">
            {[data.personal.linkedin, data.personal.github, data.personal.website].filter(Boolean).join(" | ")}
          </p>
        </div>
      </header>

      {data.summary && (
        <section className="mt-5">
          <h2 style={{ color: data.accentColor }} className="mb-2 text-lg font-semibold">
            Professional Summary
          </h2>
          <p className="text-sm leading-6">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mt-5">
          <h2 style={{ color: data.accentColor }} className="mb-2 text-lg font-semibold">
            Experience
          </h2>
          {data.experience.map((item) => (
            <div key={item.id} className="mb-3">
              <p className="font-semibold">{item.role || "Role"}</p>
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
            </div>
          ))}
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mt-5">
          <h2 style={{ color: data.accentColor }} className="mb-2 text-lg font-semibold">
            Education
          </h2>
          {data.education.map((item) => (
            <div key={item.id} className="mb-3">
              <p className="font-semibold">{item.institution}</p>
              <p className="text-sm text-slate-600">
                {item.degree} {item.field && `in ${item.field}`}
              </p>
              <p className="text-sm text-slate-500">
                {[item.startDate, item.endDate].filter(Boolean).join(" – ")}
                {item.grade && ` | ${item.grade}`}
              </p>
            </div>
          ))}
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mt-5">
          <h2 style={{ color: data.accentColor }} className="mb-2 text-lg font-semibold">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border px-3 py-1 text-xs"
                style={{ borderColor: data.accentColor, color: data.accentColor }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="mt-5">
          <h2 style={{ color: data.accentColor }} className="mb-2 text-lg font-semibold">
            Projects
          </h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-3">
              <p className="font-semibold">{project.name}</p>
              <p className="text-sm">{project.description}</p>
              {project.techStack && <p className="text-xs text-slate-500">Tech: {project.techStack}</p>}
              {project.link && <p className="text-xs text-slate-500">{project.link}</p>}
            </div>
          ))}
        </section>
      )}

      {data.certifications.length > 0 && (
        <section className="mt-5">
          <h2 style={{ color: data.accentColor }} className="mb-2 text-lg font-semibold">
            Certifications
          </h2>
          {data.certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <p className="text-sm font-semibold">{cert.name}</p>
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
        <section className="mt-5">
          <h2 style={{ color: data.accentColor }} className="mb-2 text-lg font-semibold">
            Languages
          </h2>
          <div className="flex flex-wrap gap-4">
            {data.languages
              .filter((l) => l.language.trim())
              .map((lang, i) => (
                <span key={i} className="text-sm">
                  {lang.language} <span className="text-slate-500">({lang.proficiency})</span>
                </span>
              ))}
          </div>
        </section>
      )}
    </div>
  );
}
