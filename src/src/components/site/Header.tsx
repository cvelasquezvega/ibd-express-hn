import { useState } from "react";
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, Globe, Truck, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { categories } from "@/data/books";

const megaSections = [
  {
    heading: "Por género",
    links: ["Ficción literaria", "Misterio y thriller", "Ciencia ficción", "Romance", "Poesía", "Ensayo", "Biografía", "Historia"],
  },
  {
    heading: "Académico",
    links: ["Catálogos universitarios", "Adopción en curso", "Monografías", "Revistas", "Manuales", "Tesis doctorales"],
  },
  {
    heading: "Idiomas",
    links: ["Español", "Inglés", "Francés", "Alemán", "Italiano", "Portugués", "日本語", "中文"],
  },
];

export function Header() {
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-ivory/90 backdrop-blur-xl border-b border-border/60">
      {/* Utility bar */}
      <div className="hidden md:block bg-ink text-ivory/90 text-xs">
        <div className="mx-auto max-w-7xl px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><Truck className="h-3.5 w-3.5" /> Envío gratis a todo el mundo desde 45€</span>
            <span className="flex items-center gap-1.5 text-mint"><span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" /> Impresión bajo demanda · entrega en 5–7 días</span>
          </div>
          <div className="flex items-center gap-5">
            <button className="flex items-center gap-1 hover:text-ivory transition"><Globe className="h-3.5 w-3.5" /> ES / EUR <ChevronDown className="h-3 w-3" /></button>
            <a href="#" className="hover:text-ivory">Vende en Folio</a>
            <a href="#" className="hover:text-ivory">Editoriales</a>
            <a href="#" className="hover:text-ivory">Ayuda</a>
            <span className="flex items-center gap-1.5 text-ivory/70"><Phone className="h-3 w-3" /> +34 911 234 567</span>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center gap-6 py-5">
          <button
            className="md:hidden -ml-1 p-1 text-foreground"
            onClick={() => setMobile(!mobile)}
            aria-label="Menú"
          >
            {mobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Link to="/" className="flex items-baseline gap-1 mr-2">
            <span className="font-display text-2xl font-medium tracking-tight text-ink">Folio</span>
            <span className="text-coral font-display text-2xl">&</span>
            <span className="font-display text-2xl font-medium tracking-tight text-ink">Press</span>
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="group relative w-full">
              <div className="flex items-center rounded-full border border-border bg-card transition-all focus-within:border-coral focus-within:shadow-[var(--shadow-soft)]">
                <button className="flex items-center gap-1.5 pl-5 pr-3 py-3 text-sm text-muted-foreground border-r border-border hover:text-foreground transition">
                  Todos los catálogos <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <input
                  type="search"
                  placeholder="Busca entre 1,2M de títulos, autores, ISBN, editoriales…"
                  className="flex-1 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
                <button className="m-1 flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-medium text-white hover:brightness-110 transition shadow-sm">
                  <Search className="h-4 w-4" /> Buscar
                </button>
              </div>
            </div>
          </div>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-1 md:gap-2">
            <button className="hidden sm:flex items-center gap-2 rounded-full px-3 py-2 text-sm hover:bg-cream transition">
              <User className="h-5 w-5" /> <span className="hidden lg:inline">Mi cuenta</span>
            </button>
            <button className="hidden sm:grid h-10 w-10 place-items-center rounded-full hover:bg-cream transition" aria-label="Favoritos">
              <Heart className="h-5 w-5" />
            </button>
            <button className="relative flex items-center gap-2 rounded-full bg-cream px-4 py-2.5 hover:bg-coral-soft transition">
              <ShoppingBag className="h-5 w-5" />
              <span className="hidden sm:inline text-sm font-medium">Carrito</span>
              <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-coral text-[10px] font-semibold text-white">3</span>
            </button>
          </div>
        </div>

        {/* Nav row */}
        <nav className="hidden md:flex items-center gap-7 pb-3 text-sm text-foreground/80">
          <button
            onMouseEnter={() => setMega(true)}
            onMouseLeave={() => setMega(false)}
            className="relative flex items-center gap-2 rounded-full bg-coral text-white px-4 py-1.5 font-medium hover:brightness-110 transition shadow-sm"
          >
            <Menu className="h-4 w-4" /> Categorías <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <Link to="/catalogo" className="hover:text-coral transition">Catálogo</Link>
          <a href="#" className="hover:text-coral transition">Más vendidos</a>
          <a href="#" className="hover:text-coral transition">Novedades</a>
          <a href="#" className="hover:text-coral transition">Universitario</a>
          <a href="#" className="hover:text-coral transition">Recomendados</a>
          <a href="#" className="flex items-center gap-1.5 text-coral hover:text-ink transition font-medium">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-coral animate-pulse" /> Hasta 30% de descuento
          </a>
          <span className="ml-auto text-xs text-muted-foreground">320+ editoriales · 14 idiomas</span>
        </nav>
      </div>

      {/* Mega menu */}
      {mega && (
        <div
          onMouseEnter={() => setMega(true)}
          onMouseLeave={() => setMega(false)}
          className="absolute left-0 right-0 top-full bg-card border-b border-border shadow-[var(--shadow-lift)] animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-12 gap-10">
            <div className="col-span-3">
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-4">Explorar por</div>
              <ul className="space-y-2.5">
                {categories.map(c => (
                  <li key={c.name} className="flex items-baseline justify-between gap-3 group cursor-pointer">
                    <span className="text-foreground group-hover:text-coral transition font-medium">{c.name}</span>
                    <span className="text-xs text-muted-foreground tabular-nums">{c.count}</span>
                  </li>
                ))}
              </ul>
            </div>
            {megaSections.map(s => (
              <div key={s.heading} className="col-span-3">
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-4">{s.heading}</div>
                <ul className="space-y-2.5">
                  {s.links.map(l => (
                    <li key={l}><a href="#" className="text-sm text-foreground/80 hover:text-coral transition">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobile && (
        <div className="md:hidden border-t border-border px-6 py-4 space-y-3 bg-ivory">
          <div className="flex items-center rounded-full border border-border bg-card px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <input className="flex-1 bg-transparent text-sm outline-none" placeholder="Buscar títulos…" />
          </div>
          {[["/catalogo","Catálogo"],["/","Más vendidos"],["/","Novedades"],["/","Universitario"],["/","Recomendados"],["/","Mi cuenta"]].map(([h,l]) => (
            <Link key={l} to={h} className="block py-2 text-foreground border-b border-border/60">{l}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
