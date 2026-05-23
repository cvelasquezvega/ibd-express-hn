import { ArrowRight } from "lucide-react";

export function BigSaleBanner() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-8">
      <a href="#" className="group relative block overflow-hidden rounded-3xl bg-mint min-h-[220px] md:min-h-[260px]">
        {/* Stacked book pattern */}
        <div aria-hidden className="absolute inset-y-0 left-0 w-1/2 md:w-2/5 overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-3 gap-2 rotate-[-10deg] scale-125 -translate-x-6">
            {["#e85d3a","#1b2a5c","#f4b942","#7c4dff","#d9344b","#2bb673","#e85d8a","#3a8dde","#6b3a1a"].map((c,i) => (
              <div key={i} className="aspect-[3/4] rounded-sm shadow-md book-cover" style={{["--cover-c1" as any]: c, ["--cover-c2" as any]: c}} />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-mint/40 to-mint" />
        </div>

        <div className="relative z-10 ml-auto max-w-xl p-8 md:p-14 text-white">
          <div className="text-[11px] uppercase tracking-[0.2em] text-white/80 font-semibold">Más vendidos con descuento</div>
          <h3 className="mt-3 font-display text-4xl md:text-5xl leading-tight text-balance">
            Hoy desde <span className="text-sun">solo 12,50€</span>
          </h3>
          <p className="mt-2 text-white/80">Aquí los encontrarás · Promoción del mes</p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-ink px-6 py-3 text-sm font-medium group-hover:bg-coral group-hover:text-white transition">
            Comprar ahora <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </a>
    </section>
  );
}