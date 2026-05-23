import { ChevronLeft, ChevronRight } from "lucide-react";
import { books } from "@/data/books";
import { Link } from "@tanstack/react-router";

const items = [
  { label: "Hostelería y restauración", c: "#f4b942" },
  { label: "Análisis complejo", c: "#7c4dff" },
  { label: "Ciencia del deporte", c: "#3a8dde" },
  { label: "Ciencia ficción", c: "#e85d3a" },
  { label: "Clásicos policíacos", c: "#d9344b" },
  { label: "Danza contemporánea", c: "#2bb673" },
  { label: "Filosofía moderna", c: "#1b2a5c" },
  { label: "Arte y diseño", c: "#e85d8a" },
];

export function CategoryCircles() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-coral font-medium">Atajos</div>
          <h2 className="mt-2 font-display text-4xl text-ink">Explora por categoría</h2>
        </div>
        <div className="flex gap-2">
          <button aria-label="Anterior" className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-coral hover:text-white hover:border-coral transition"><ChevronLeft className="h-4 w-4" /></button>
          <button aria-label="Siguiente" className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-coral hover:text-white hover:border-coral transition"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {items.map((it, i) => {
          const book = books[i % books.length];
          return (
            <Link key={it.label} to="/catalogo" className="group flex flex-col items-center text-center">
              <div
                className="relative w-full aspect-square rounded-full grid place-items-center transition-transform group-hover:-translate-y-1 group-hover:rotate-3"
                style={{ background: `radial-gradient(circle at 30% 30%, ${it.c}33, ${it.c}11 70%)` }}
              >
                <div
                  className="book-cover w-[55%] aspect-[2/3] rounded-sm transform-gpu group-hover:rotate-[-6deg] transition-transform shadow-lg"
                  style={{ ["--cover-c1" as any]: book.c1, ["--cover-c2" as any]: book.c2 }}
                />
              </div>
              <div className="mt-3 text-sm font-medium text-ink leading-tight group-hover:text-coral transition">
                {it.label}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}