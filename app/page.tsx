import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-[-20%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-teal-500/20 blur-[160px]" />
          <div className="absolute right-[-10%] top-[10%] h-[420px] w-[420px] rounded-full bg-indigo-500/10 blur-[160px]" />
          <div className="absolute bottom-[-30%] left-[-10%] h-[520px] w-[520px] rounded-full bg-slate-800/60 blur-[180px]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-teal-200">AI CV Builder</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-7xl">
            Build a cinematic, ATS-ready resume in minutes.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Compose with AI, preview in real time, and ship a polished CV that feels modern, sharp, and recruiter-friendly.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/builder"
              className="inline-flex rounded-full bg-teal-400 px-8 py-4 text-lg font-semibold text-slate-950 transition hover:bg-teal-300"
            >
              Build Your CV Free
            </Link>
            <span className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-300">
              No credit card required
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-6 pb-8 md:grid-cols-3">
        {[
          { title: "AI Writing Assistant", desc: "Generate professional summaries, work descriptions, and skill suggestions powered by Claude AI." },
          { title: "16 CV Templates", desc: "Choose from 16 professional layouts, each fully customizable with accent colors and fonts." },
          { title: "High-Quality PDF Export", desc: "Export a pixel-perfect, multi-page PDF ready for recruiters and ATS systems in one click." },
        ].map((feature) => (
          <article
            key={feature.title}
            className="rounded-xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 shadow-[0_16px_45px_rgba(0,0,0,0.35)]"
          >
            <h2 className="text-lg font-semibold text-white">{feature.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{feature.desc}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Layouts</p>
            <h2 className="mt-2 text-2xl font-semibold">Template Previews</h2>
          </div>
          <Link href="/builder" className="text-sm font-semibold text-teal-300 hover:text-teal-200">
            Explore all templates
          </Link>
        </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Minimal",
              "Modern",
              "Classic",
              "Creative",
              "Executive",
              "Compact",
              "Professional",
              "Elegant",
              "Timeline",
              "Corporate",
              "Bold",
              "Serif",
              "Sidebar",
              "Grid",
              "Refined",
              "Slate",
            ].map((name) => (
            <div
              key={name}
              className="rounded-xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-5"
            >
              <p className="text-base font-medium text-white">{name}</p>
              <div className="mt-4 h-36 rounded-lg border border-white/10 bg-white/5 sm:h-40" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
