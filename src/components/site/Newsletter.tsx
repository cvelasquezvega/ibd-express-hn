import { ArrowRight } from "lucide-react";
import banner from "@/assets/banner-promo.jpg";

export function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20">
      <div className="relative overflow-hidden rounded-3xl bg-blush p-10 md:p-16 grid md:grid-cols-2 gap-10 items-center">
        <img src={banner} alt="" loading="lazy" width={1280} height={640} className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-blush via-blush/90 to-transparent" />
        <div className="relative">
          <div className="text-[11px] uppercase tracking-[0.2em] text-coral font-medium">La carta de Folio</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl leading-tight text-ink text-balance">
            ¡Te damos el <span className="text-coral">10%</span> de tu primer pedido!
          </h2>
          <p className="mt-4 text-ink/70 max-w-md">Introduce tu correo y recibe un cupón del 10% en tu próxima compra. Tres libros recomendados cada semana, sin spam.</p>
        </div>
        <form className="relative flex flex-col gap-3" onSubmit={(e)=>e.preventDefault()}>
          <div className="flex items-center rounded-full bg-white border border-border p-1.5 focus-within:border-coral transition shadow-sm">
            <input type="email" required placeholder="tu@email.com" className="flex-1 bg-transparent px-5 py-3 text-sm text-ink placeholder:text-muted-foreground outline-none" />
            <button className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 text-sm font-medium text-white hover:brightness-110 transition">
              Suscribirme <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs text-ink/50">Únete a 84.000+ lectores. Nunca compartiremos tu correo.</p>
        </form>
      </div>
    </section>
  );
}