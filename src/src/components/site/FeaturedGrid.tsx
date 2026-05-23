import { books } from "@/data/books";
import { BookCard } from "./BookCard";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

const tabs = ["Más vendidos esta semana", "Novedades", "Recomendados del editor", "En oferta"];

export function FeaturedGrid({ heading = "Los libros que más se leen ahora", eyebrow = "Más queridos" }: { heading?: string; eyebrow?: string }) {
  const [active, setActive] = useState(0);
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-coral font-medium">{eyebrow}</div>
          <h2 className="mt-2 font-display text-4xl md:text-5xl text-ink text-balance">{heading}</h2>
        </div>
        <div className="flex flex-wrap gap-1 -mb-1 border-b border-border overflow-x-auto">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setActive(i)}
              className={`relative px-4 py-3 text-sm whitespace-nowrap transition ${
                active === i ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
              {active === i && <span className="absolute inset-x-3 -bottom-px h-0.5 bg-coral" />}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
        {books.slice(0,8).map(b => <BookCard key={b.id} book={b} />)}
      </div>

      <div className="mt-12 text-center">
        <Link to="/catalogo" className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-6 py-3 text-sm font-medium hover:bg-coral transition">
          Ver los 1.284 más vendidos <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}