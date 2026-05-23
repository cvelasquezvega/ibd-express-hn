import { ArrowRight, Clock, Tag } from "lucide-react";
import gift from "@/assets/banner-gift.jpg";
import novel from "@/assets/banner-novel.jpg";

export function Promo() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      {/* Two small banners, vivid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Gift card banner */}
        <a href="#" className="group relative overflow-hidden rounded-3xl bg-grape text-white min-h-[280px] flex">
          <img src={gift} alt="Caja de regalo con un libro" loading="lazy" width={900} height={700} className="absolute inset-0 h-full w-full object-cover opacity-95 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-grape via-grape/70 to-transparent" />
          <div className="relative z-10 self-end p-8 md:p-10 max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-[11px] font-medium uppercase tracking-wider">
              <Tag className="h-3 w-3" /> Sale 20%
            </div>
            <h3 className="mt-4 font-display text-4xl md:text-5xl leading-tight text-balance">
              Un libro es <br/>un buen regalo.
            </h3>
            <p className="mt-3 text-white/85 text-sm">Regala una tarjeta a un amigo o familiar y nosotros lo imprimimos.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium border-b border-white/60 pb-0.5 group-hover:gap-3 transition-all">
              Comprar tarjeta regalo <ArrowRight className="h-4 w-4" />
            </span>
          </div>
          {/* sticker */}
          <div className="absolute right-6 top-6 grid h-20 w-20 place-items-center rounded-full bg-coral text-white font-display text-lg rotate-[-12deg] shadow-lg z-10 text-center leading-tight">
            <span>Sale<br/>20%</span>
          </div>
        </a>

        {/* Novel banner */}
        <a href="#" className="group relative overflow-hidden rounded-3xl bg-sun text-ink min-h-[280px] flex">
          <img src={novel} alt="Gran novela" loading="lazy" width={900} height={700} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-sun via-sun/70 to-transparent" />
          <div className="relative z-10 self-end p-8 md:p-10 ml-auto max-w-md text-right">
            <div className="inline-flex items-center gap-2 rounded-full bg-ink/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
              <Clock className="h-3 w-3" /> Solo hoy
            </div>
            <h3 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
              Grandes novelas <br/><span className="text-coral">−10% hoy</span>
            </h3>
            <p className="mt-3 text-ink/75 text-sm">Inicia una nueva aventura con un buen libro.</p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink text-white px-5 py-3 text-sm font-medium group-hover:bg-coral transition">
              Comprar ahora <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}