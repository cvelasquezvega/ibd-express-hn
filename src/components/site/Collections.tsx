import { ArrowRight } from "lucide-react";
import { collections } from "@/data/books";
import classics from "@/assets/collection-classics.jpg";
import academic from "@/assets/collection-academic.jpg";
import fiction from "@/assets/collection-fiction.jpg";

const imgs = [classics, academic, fiction];
const tints = ["from-coral/40", "from-grape/40", "from-mint/40"];

export function Collections() {
  return (
    <section id="collections" className="bg-ink text-ivory relative overflow-hidden">
      <div aria-hidden className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-coral/20 blur-3xl" />
      <div aria-hidden className="absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-grape/30 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <div className="text-[11px] uppercase tracking-[0.2em] text-coral font-medium">Colecciones editoriales</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl text-balance">Curadas por la gente que sí los lee.</h2>
          <p className="mt-4 text-ivory/70 text-pretty">
            Tres estantes rotativos elegidos por nuestro equipo editorial y editoriales aliadas. Se actualizan cada dos semanas.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {collections.map((c, i) => (
            <a key={c.title} href="#" className="group relative overflow-hidden rounded-3xl bg-foreground/40">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={imgs[i]} alt={c.title} loading="lazy" width={800} height={1000} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className={`absolute inset-0 bg-gradient-to-t ${tints[i]} via-ink/60 to-transparent`} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-coral">
                  <span>{c.tag}</span>
                  <span className="opacity-50">·</span>
                  <span className="text-ivory/70">{c.count}</span>
                </div>
                <h3 className="mt-3 font-display text-2xl leading-tight">{c.title}</h3>
                <p className="mt-2 text-sm text-ivory/70 line-clamp-2">{c.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-ivory border-b border-coral pb-0.5 group-hover:gap-3 transition-all">
                  Explorar colección <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}