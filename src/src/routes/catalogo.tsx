import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BookCard } from "@/components/site/BookCard";
import { books, categories, publishers, idiomas, formatos, ordenes } from "@/data/books";
import { ChevronRight, SlidersHorizontal, Grid2x2, Rows3, X, Star } from "lucide-react";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo · Folio & Press" },
      { name: "description", content: "Explora 1,2M de títulos. Filtra por categoría, editorial, idioma, formato y precio." },
      { property: "og:title", content: "Catálogo · Folio & Press" },
      { property: "og:description", content: "Marketplace internacional de libros impresos bajo demanda. Filtros avanzados." },
    ],
  }),
  component: Catalogo,
});

function Catalogo() {
  const [cats, setCats] = useState<string[]>([]);
  const [pubs, setPubs] = useState<string[]>([]);
  const [langs, setLangs] = useState<string[]>([]);
  const [fmts, setFmts] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(60);
  const [rating, setRating] = useState<number>(0);
  const [order, setOrder] = useState<string>(ordenes[0]);
  const [view, setView] = useState<"grid" | "list">("grid");

  const toggle = (arr: string[], setArr: (a: string[]) => void, v: string) =>
    setArr(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);

  const filtered = useMemo(() => {
    let list = books.filter(b =>
      (cats.length === 0 || cats.includes(b.category)) &&
      (pubs.length === 0 || pubs.includes(b.publisher)) &&
      (langs.length === 0 || (b.language && langs.includes(b.language))) &&
      (fmts.length === 0 || (b.format && fmts.includes(b.format))) &&
      b.price <= price &&
      b.rating >= rating
    );
    switch (order) {
      case "Precio: menor a mayor": list = [...list].sort((a, b) => a.price - b.price); break;
      case "Precio: mayor a menor": list = [...list].sort((a, b) => b.price - a.price); break;
      case "Mejor valorados": list = [...list].sort((a, b) => b.rating - a.rating); break;
      case "Novedades": list = [...list].sort((a, b) => (b.year ?? 0) - (a.year ?? 0)); break;
    }
    return list;
  }, [cats, pubs, langs, fmts, price, rating, order]);

  const activeChips = [...cats, ...pubs, ...langs, ...fmts];
  const removeChip = (v: string) => {
    setCats(cats.filter(x => x !== v));
    setPubs(pubs.filter(x => x !== v));
    setLangs(langs.filter(x => x !== v));
    setFmts(fmts.filter(x => x !== v));
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Page header */}
      <section className="bg-gradient-to-br from-blush via-ivory to-coral-soft">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <nav className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Link to="/" className="hover:text-coral">Inicio</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Catálogo</span>
          </nav>
          <div className="mt-3 flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-display text-4xl md:text-5xl text-ink">Catálogo completo</h1>
              <p className="mt-2 text-muted-foreground">1,2M de títulos · 320 editoriales · 14 idiomas</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">{filtered.length} resultados</span>
              <span className="h-4 w-px bg-border mx-2" />
              <select value={order} onChange={(e) => setOrder(e.target.value)} className="bg-white border border-border rounded-full px-4 py-2 text-sm outline-none focus:border-coral cursor-pointer">
                {ordenes.map(o => <option key={o}>{o}</option>)}
              </select>
              <div className="hidden md:flex items-center bg-white border border-border rounded-full p-1">
                <button onClick={() => setView("grid")} aria-label="Vista cuadrícula" className={`grid h-7 w-7 place-items-center rounded-full ${view === "grid" ? "bg-ink text-white" : "text-muted-foreground"}`}><Grid2x2 className="h-3.5 w-3.5" /></button>
                <button onClick={() => setView("list")} aria-label="Vista lista" className={`grid h-7 w-7 place-items-center rounded-full ${view === "list" ? "bg-ink text-white" : "text-muted-foreground"}`}><Rows3 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12 grid lg:grid-cols-12 gap-10">
        {/* Sidebar filters */}
        <aside className="lg:col-span-3 space-y-8">
          <div className="flex items-center gap-2 font-display text-xl text-ink">
            <SlidersHorizontal className="h-4 w-4 text-coral" /> Filtros
          </div>

          <FilterGroup title="Categorías">
            {categories.map(c => (
              <Checkbox key={c.name} label={c.name} count={c.count} checked={cats.includes(c.name)} onChange={() => toggle(cats, setCats, c.name)} />
            ))}
          </FilterGroup>

          <FilterGroup title="Precio">
            <div className="px-1">
              <input type="range" min={5} max={60} value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full accent-coral" />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>5 €</span>
                <span className="font-medium text-foreground">Hasta {price} €</span>
              </div>
            </div>
          </FilterGroup>

          <FilterGroup title="Valoración">
            <div className="space-y-2">
              {[4, 3, 2, 1, 0].map(r => (
                <button key={r} onClick={() => setRating(r)} className={`w-full flex items-center justify-between rounded-lg px-2 py-1.5 text-sm hover:bg-cream ${rating === r ? "bg-cream text-foreground" : "text-muted-foreground"}`}>
                  <span className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className={`h-3.5 w-3.5 ${i < r ? "fill-sun text-sun" : "text-border"}`} />)}
                  </span>
                  <span className="text-xs">{r === 0 ? "Todas" : `${r}+ estrellas`}</span>
                </button>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Editorial">
            <div className="space-y-1.5 max-h-52 overflow-y-auto pr-2">
              {publishers.map(p => (
                <Checkbox key={p} label={p} checked={pubs.includes(p)} onChange={() => toggle(pubs, setPubs, p)} />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Idioma">
            {idiomas.map(l => (
              <Checkbox key={l} label={l} checked={langs.includes(l)} onChange={() => toggle(langs, setLangs, l)} />
            ))}
          </FilterGroup>

          <FilterGroup title="Formato">
            {formatos.map(f => (
              <Checkbox key={f} label={f} checked={fmts.includes(f)} onChange={() => toggle(fmts, setFmts, f)} />
            ))}
          </FilterGroup>
        </aside>

        {/* Results */}
        <section className="lg:col-span-9">
          {activeChips.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-muted-foreground mr-1">Activos:</span>
              {activeChips.map(chip => (
                <button key={chip} onClick={() => removeChip(chip)} className="inline-flex items-center gap-1.5 rounded-full bg-coral-soft text-ink px-3 py-1 text-xs font-medium hover:bg-coral hover:text-white transition">
                  {chip} <X className="h-3 w-3" />
                </button>
              ))}
              <button onClick={() => { setCats([]); setPubs([]); setLangs([]); setFmts([]); }} className="text-xs text-coral hover:underline ml-2">Limpiar todo</button>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-20 rounded-3xl bg-cream">
              <p className="font-display text-2xl text-ink">No encontramos resultados.</p>
              <p className="mt-2 text-muted-foreground">Prueba a relajar algún filtro.</p>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
              {filtered.map(b => <BookCard key={b.id} book={b} />)}
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {filtered.map(b => (
                <li key={b.id} className="py-6 flex gap-6">
                  <Link to="/libro/$slug" params={{ slug: b.slug }} className="shrink-0 w-24">
                    <div className="book-cover aspect-[2/3] rounded-sm" style={{ ["--cover-c1" as any]: b.c1, ["--cover-c2" as any]: b.c2 }} />
                  </Link>
                  <div className="flex-1">
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{b.category} · {b.publisher}</div>
                    <h3 className="mt-1 font-display text-xl"><Link to="/libro/$slug" params={{ slug: b.slug }} className="hover:text-coral">{b.title}</Link></h3>
                    <p className="text-sm text-muted-foreground">{b.author}</p>
                    <div className="mt-2 flex items-center gap-1.5 text-xs">
                      <Star className="h-3.5 w-3.5 fill-sun text-sun" />
                      <span className="font-medium">{b.rating}</span>
                      <span className="text-muted-foreground">({b.reviews})</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl text-coral font-semibold">{b.price.toFixed(2)} €</div>
                    {b.oldPrice && <div className="text-sm text-muted-foreground line-through">{b.oldPrice.toFixed(2)} €</div>}
                    <button className="mt-3 rounded-full bg-ink text-white px-4 py-2 text-xs font-medium hover:bg-coral transition">Añadir</button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Pagination */}
          <div className="mt-12 flex items-center justify-center gap-2">
            {[1, 2, 3, "…", 24].map((p, i) => (
              <button key={i} className={`min-w-9 h-9 px-3 rounded-full text-sm ${p === 1 ? "bg-coral text-white" : "border border-border hover:bg-cream"}`}>{p}</button>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3 font-semibold">{title}</h3>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function Checkbox({ label, count, checked, onChange }: { label: string; count?: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center justify-between gap-2 cursor-pointer group">
      <span className="flex items-center gap-2.5 text-sm text-foreground">
        <span className={`h-4 w-4 rounded border-2 grid place-items-center transition ${checked ? "bg-coral border-coral" : "border-border group-hover:border-coral"}`}>
          {checked && <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 text-white"><path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </span>
        <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
        <span className="group-hover:text-coral transition">{label}</span>
      </span>
      {count && <span className="text-xs text-muted-foreground tabular-nums">{count}</span>}
    </label>
  );
}