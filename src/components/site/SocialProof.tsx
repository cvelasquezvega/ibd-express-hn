import { Star } from "lucide-react";
import { publishers } from "@/data/books";

const reviews = [
  { q: "La calidad de impresión está al nivel de las tapas duras que cuestan el doble. Folio es ahora mi tienda por defecto.", a: "Helena R.", r: "Compra verificada · Madrid", rating: 5, color: "bg-coral-soft" },
  { q: "Migramos toda nuestra serie de monografías. El reporte de regalías es el más limpio que he visto en 20 años.", a: "Dr. Marcus Lin", r: "Editor de Adquisiciones, Cambridge", rating: 5, color: "bg-grape-soft" },
  { q: "Pedí un libro de 1.200 páginas y me llegó a Seúl en cinco días. Genuinamente impresionante.", a: "Jin-Soo Park", r: "Doctorando", rating: 5, color: "bg-sun/30" },
  { q: "Las colecciones editoriales son cómo encuentro libros que jamás habría buscado. Se siente como una librería real.", a: "Camille D.", r: "Compra verificada · Lyon", rating: 5, color: "bg-mint/20" },
];

export function SocialProof() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-coral font-medium">Querido por lectores y editoriales</div>
          <h2 className="mt-2 font-display text-4xl md:text-5xl text-ink">4,9 / 5 de 28.400+ lectores</h2>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex">{[...Array(5)].map((_,i)=><Star key={i} className="h-5 w-5 fill-sun text-sun" />)}</div>
          <span className="text-muted-foreground">Verificado por Trustpilot</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {reviews.map((r, i) => (
          <figure key={i} className={`rounded-3xl ${r.color} p-6 hover:-translate-y-1 transition-transform`}>
            <div className="flex gap-0.5 mb-4">{[...Array(r.rating)].map((_,k)=><Star key={k} className="h-4 w-4 fill-sun text-sun" />)}</div>
            <blockquote className="font-display text-lg leading-snug text-ink text-balance">
              «{r.q}»
            </blockquote>
            <figcaption className="mt-6 pt-4 border-t border-ink/10">
              <div className="text-sm font-medium text-ink">{r.a}</div>
              <div className="text-xs text-ink/60 mt-0.5">{r.r}</div>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Publishers marquee */}
      <div className="mt-20">
        <div className="text-center text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Distribuimos para</div>
        <div className="mt-8 relative overflow-hidden">
          <div className="marquee flex gap-14 whitespace-nowrap">
            {[...publishers, ...publishers].map((p, i) => (
              <span key={i} className="font-display text-2xl text-foreground/40">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}