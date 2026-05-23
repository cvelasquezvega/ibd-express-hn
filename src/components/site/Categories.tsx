import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { categories } from "@/data/books";

const palette = [
  "bg-coral text-white",
  "bg-grape text-white",
  "bg-sun text-ink",
  "bg-mint text-white",
  "bg-ink text-white",
  "bg-blush text-ink",
  "bg-coral-soft text-ink",
  "bg-grape-soft text-ink",
];

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-coral font-medium">Explora</div>
          <h2 className="mt-2 font-display text-4xl md:text-5xl text-ink">Categorías destacadas</h2>
        </div>
        <Link to="/catalogo" className="inline-flex items-center gap-1.5 text-sm text-foreground hover:text-coral transition">
          Ver las 48 categorías <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {categories.map((c, i) => (
          <Link
            key={c.name}
            to="/catalogo"
            className={`group relative overflow-hidden rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] ${palette[i % palette.length]}`}
          >
            <div className="text-[10px] uppercase tracking-[0.2em] opacity-75">{c.count} títulos</div>
            <div className="mt-10 font-display text-xl leading-tight">{c.name}</div>
            <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 opacity-60 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        ))}
      </div>
    </section>
  );
}