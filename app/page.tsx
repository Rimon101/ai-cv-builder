import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <p className="text-sm uppercase tracking-[0.22em] text-teal-300">AI CV Builder</p>
        <h1 className="mt-4 text-5xl font-semibold leading-tight md:text-7xl">Build a beautiful, ATS-ready resume in minutes.</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
          Write smarter with AI, preview in real time, switch between professional templates, and export a polished PDF.
        </p>
        <Link href="/builder" className="mt-9 inline-flex rounded-full bg-teal-500 px-8 py-4 text-lg font-semibold text-slate-950 hover:bg-teal-300">
          Build Your CV Free
        </Link>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-6 pb-8 md:grid-cols-3">
          {[
            { title: "AI Writing Assistant", desc: "Generate professional summaries, work descriptions, and skill suggestions powered by Claude AI." },
            { title: "16 CV Templates", desc: "Choose from 16 professional layouts, each fully customizable with accent colors and fonts." },
            { title: "High-Quality PDF Export", desc: "Export a pixel-perfect, multi-page PDF ready for recruiters and ATS systems in one click." },
          ].map((feature) => (
          <article key={feature.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="font-semibold">{feature.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{feature.desc}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="mb-4 text-2xl font-semibold">Template Previews</h2>
          <div className="grid gap-4 md:grid-cols-4">
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
            <div key={name} className="h-48 rounded-xl border border-white/10 bg-gradient-to-b from-white/10 to-white/0 p-4">
              <p className="font-medium">{name}</p>
              <div className="mt-4 h-28 rounded-lg bg-white/10" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
