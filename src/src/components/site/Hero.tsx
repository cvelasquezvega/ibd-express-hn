import { ArrowRight, Sparkles, Truck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-modern.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blush via-ivory to-coral-soft">
      {/* decorative blobs */}
      <div aria-hidden className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-grape/20 blur-3xl" />
      <div aria-hidden className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-sun/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pt-14 pb-20 md:pt-20 md:pb-28 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs shadow-sm border border-border">
            <Sparkles className="h-3.5 w-3.5 text-coral" />
            <span className="text-foreground/80">Nueva temporada · 4.200 títulos este mes</span>
          </div>

          <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl leading-[1] text-balance text-ink">
            Libros que se imprimen <em className="not-italic font-normal bg-gradient-to-r from-coral via-coral to-grape bg-clip-text text-transparent">cuando los pides.</em>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground text-pretty">
            Más de 1,2 millones de títulos de 320 editoriales universitarias e independientes. Fabricados bajo demanda y enviados desde la imprenta más cercana a ti.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="/catalogo" className="group inline-flex items-center gap-2 rounded-full bg-coral px-8 py-4 text-sm font-medium text-white hover:brightness-110 transition shadow-[0_8px_24px_-8px_oklch(0.68_0.19_30/0.6)]">
              Explorar el catálogo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="#como-funciona" className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-7 py-4 text-sm font-medium text-foreground hover:border-ink transition">
              Cómo funciona la impresión bajo demanda
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
            {[
              ["1,2M", "Títulos"],
              ["320+", "Editoriales"],
              ["98%", "Entregas a tiempo"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl text-ink">{n}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[5/5] rounded-3xl overflow-hidden shadow-[var(--shadow-lift)] bg-cream">
            <img src={heroImg} alt="Libros impresos bajo demanda" width={1400} height={1400} className="h-full w-full object-cover" />
          </div>

          {/* floating cards */}
          <div className="absolute -left-3 md:-left-6 bottom-6 flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-[var(--shadow-lift)] border border-border">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-mint/15 text-mint">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[11px] text-muted-foreground">Envío internacional</div>
              <div className="text-sm font-medium text-foreground">5–7 días, carbono neutro</div>
            </div>
          </div>

          <div className="absolute -right-3 md:-right-6 top-8 rounded-2xl bg-ink text-white p-4 shadow-[var(--shadow-lift)] max-w-[240px]">
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/60">Imprimiendo ahora</div>
            <div className="mt-1 font-display text-base leading-snug">«La arquitectura de la memoria»</div>
            <div className="mt-2 text-xs text-white/60">Pedido #84021 · Imprenta Madrid</div>
            <div className="mt-3 h-1 rounded-full bg-white/15 overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-coral to-sun animate-pulse" />
            </div>
          </div>

          {/* sun decoration */}
          <div aria-hidden className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-sun grid place-items-center text-ink font-display text-xl rotate-12 shadow-lg">¡Hoy!</div>
        </div>
      </div>
    </section>
  );
}