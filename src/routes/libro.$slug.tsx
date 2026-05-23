import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BookCover } from "@/components/site/BookCover";
import { BookCard } from "@/components/site/BookCard";
import { getBookBySlug, books } from "@/data/books";
import {
  ChevronRight, Star, ShoppingBag, Heart, Share2, Truck, Leaf, ShieldCheck,
  RotateCcw, Minus, Plus, ChevronDown, Check, Flame, Eye, MapPin, Package,
  CreditCard, Lock, Gift, BookOpen, Languages, Hash, Calendar, Sparkles, ZoomIn,
} from "lucide-react";

export const Route = createFileRoute("/libro/$slug")({
  loader: ({ params }) => {
    const book = getBookBySlug(params.slug);
    if (!book) throw notFound();
    return { book };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.book.title} — ${loaderData.book.author} · Folio & Press` : "Libro" },
      { name: "description", content: loaderData?.book.description ?? "Libro disponible en Folio & Press." },
      { property: "og:title", content: loaderData?.book.title ?? "Libro" },
      { property: "og:description", content: loaderData?.book.description ?? "" },
      { property: "og:type", content: "book" },
    ],
  }),
  errorComponent: ({ error }) => <div className="p-10">Error: {error.message}</div>,
  notFoundComponent: () => (
    <main className="min-h-screen grid place-items-center bg-background">
      <div className="text-center">
        <h1 className="font-display text-4xl text-ink">Libro no encontrado</h1>
        <Link to="/catalogo" className="mt-4 inline-block text-coral hover:underline">Volver al catálogo</Link>
      </div>
    </main>
  ),
  component: BookPage,
});

function BookPage() {
  const { book } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const [format, setFormat] = useState(book.format ?? "Tapa blanda");
  const [tab, setTab] = useState<"desc" | "specs" | "reviews">("desc");
  const [zip, setZip] = useState("");
  const [showSticky, setShowSticky] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [bundle, setBundle] = useState<Record<string, boolean>>({});

  const related = books.filter(b => b.id !== book.id && b.category === book.category).slice(0, 4);
  const bundleBooks = books.filter(b => b.id !== book.id).slice(0, 2);
  const discount = book.oldPrice ? Math.round((1 - book.price / book.oldPrice) * 100) : 0;
  const unitPrice = format === "Tapa dura" ? +(book.price * 1.4).toFixed(2) : book.price;
  const subtotal = +(unitPrice * qty).toFixed(2);

  const bundleTotal = useMemo(() => {
    return unitPrice + bundleBooks.reduce((acc, b) => acc + (bundle[b.id] ? b.price : 0), 0);
  }, [bundle, bundleBooks, unitPrice]);
  const bundleSaving = +(bundleTotal * 0.1).toFixed(2);

  // sticky bar: appears after scrolling past purchase panel, hides when scrolling up
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const threshold = 900;
    const update = () => {
      const y = window.scrollY;
      const goingDown = y > lastY + 4;
      const goingUp = y < lastY - 4;
      const nearBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 220;
      if (y < threshold || nearBottom) {
        setShowSticky(false);
      } else if (goingDown) {
        setShowSticky(true);
      } else if (goingUp) {
        setShowSticky(false);
      }
      lastY = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ETA fixed dates (no Date.now to avoid hydration)
  const etaMin = "lun. 26 mayo";
  const etaMax = "mié. 28 mayo";

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 pt-6">
        <nav className="text-xs text-muted-foreground flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-coral">Inicio</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/catalogo" className="hover:text-coral">Catálogo</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="hover:text-coral cursor-pointer">{book.category}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground truncate">{book.title}</span>
        </nav>
      </div>

      {/* Hero PDP */}
      <section className="mx-auto max-w-7xl px-6 py-10 grid lg:grid-cols-12 gap-12">
        {/* Left column: gallery + tabs + side info */}
        <div className="lg:col-span-6 space-y-8">
          <div className="relative group/img">
            <div className="rounded-3xl bg-gradient-to-br from-blush via-cream to-coral-soft p-12 md:p-16 grid place-items-center overflow-hidden relative">
              <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_1px_1px,var(--ink)_1px,transparent_0)] [background-size:24px_24px]" />
              <div className="w-2/3 max-w-sm transform-gpu transition-all duration-700 ease-out hover:-rotate-3 hover:scale-105">
                <BookCover book={book} />
              </div>
              <button className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-xs font-medium text-ink shadow-sm hover:bg-white">
                <ZoomIn className="h-3.5 w-3.5" /> Ampliar
              </button>
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-ink/85 backdrop-blur text-white px-3 py-1.5 text-[11px] font-medium">
                <Eye className="h-3 w-3" /> 248 personas viendo este libro
              </div>
            </div>
            {book.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-coral text-white px-3 py-1 text-xs font-semibold uppercase tracking-wider">{book.badge}</span>
            )}
            {discount > 0 && (
              <span className="absolute right-4 top-4 grid h-16 w-16 place-items-center rounded-full bg-sun text-ink font-display text-lg rotate-12 shadow-lg">−{discount}%</span>
            )}
          </div>

          {/* Tabs */}
          <div>
            <div className="border-b border-border flex gap-1">
              {([["desc","Descripción"],["specs","Especificaciones"],["reviews","Reseñas ("+book.reviews.toLocaleString("es")+")"]] as const).map(([k,l]) => (
                <button key={k} onClick={() => setTab(k)} className={`relative px-4 py-3 text-sm transition ${tab === k ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`}>
                  {l}
                  {tab === k && <span className="absolute inset-x-3 -bottom-px h-0.5 bg-coral" />}
                </button>
              ))}
            </div>
            <div className="py-6">
              {tab === "desc" && (
                <div className="prose max-w-none">
                  <p className="text-base text-foreground leading-relaxed">{book.description ?? "Una obra esencial publicada por " + book.publisher + "."}</p>
                  <p className="mt-4 text-sm text-foreground/80 leading-relaxed">
                    Esta edición se fabrica bajo demanda en la imprenta partner más cercana a tu dirección, garantizando una calidad de impresión profesional con papel FSC certificado y tintas vegetales. Cada ejemplar es único.
                  </p>
                  <ul className="mt-5 space-y-2">
                    {["Edición revisada y actualizada", "Encuadernación duradera", "Papel FSC libre de cloro", "Disponible en " + (book.language ?? "español")].map(x => (
                      <li key={x} className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="h-4 w-4 text-mint" /> {x}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tab === "specs" && (
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm">
                  {[
                    ["Editorial", book.publisher],
                    ["Autor", book.author],
                    ["Año de publicación", String(book.year ?? 2024)],
                    ["Páginas", String(book.pages ?? "—")],
                    ["Idioma", book.language ?? "Español"],
                    ["Formato", format],
                    ["ISBN", book.isbn ?? "—"],
                    ["Categoría", book.category],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-border py-2.5">
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="font-medium text-foreground text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {tab === "reviews" && (
                <div id="reviews" className="space-y-5">
                  <div className="flex items-center gap-6 rounded-2xl bg-cream p-5">
                    <div className="text-center">
                      <div className="font-display text-4xl text-ink">{book.rating}</div>
                      <div className="flex justify-center mt-1">{[...Array(5)].map((_,i) => <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(book.rating) ? "fill-sun text-sun" : "text-border"}`} />)}</div>
                      <div className="text-xs text-muted-foreground mt-1">{book.reviews.toLocaleString("es")} reseñas</div>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[5,4,3,2,1].map(s => (
                        <div key={s} className="flex items-center gap-3 text-xs">
                          <span className="w-6 text-muted-foreground">{s}★</span>
                          <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                            <div className="h-full bg-sun" style={{ width: `${s === 5 ? 78 : s === 4 ? 16 : s === 3 ? 4 : 1}%` }} />
                          </div>
                          <span className="w-10 text-right text-muted-foreground">{s === 5 ? "78%" : s === 4 ? "16%" : s === 3 ? "4%" : "1%"}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {[
                    { a: "Mariana G.", d: "hace 3 días", q: "Lectura imprescindible. La edición impresa es preciosa, papel grueso y tipografía cuidada." },
                    { a: "Tomás R.", d: "hace 1 semana", q: "Llegó en cinco días desde Madrid. Calidad superior a la esperada." },
                  ].map((r, i) => (
                    <article key={i} className="border-b border-border pb-5">
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-full bg-coral text-white font-medium text-sm">{r.a[0]}</div>
                        <div>
                          <div className="font-medium text-foreground text-sm">{r.a}</div>
                          <div className="text-xs text-muted-foreground">{r.d} · Compra verificada</div>
                        </div>
                        <div className="ml-auto flex">{[...Array(5)].map((_,i) => <Star key={i} className="h-3.5 w-3.5 fill-sun text-sun" />)}</div>
                      </div>
                      <p className="mt-3 text-sm text-foreground/80">«{r.q}»</p>
                    </article>
                  ))}
                  <button className="w-full rounded-full border-2 border-ink text-ink py-3 text-sm font-medium hover:bg-ink hover:text-white transition">Ver las {book.reviews.toLocaleString("es")} reseñas</button>
                </div>
              )}
            </div>
          </div>

          {/* Side info cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-grape text-white p-5 sm:col-span-2">
              <div className="text-[11px] uppercase tracking-wider opacity-80">Sobre el autor</div>
              <div className="mt-2 font-display text-2xl">{book.author}</div>
              <p className="mt-2 text-sm text-white/80">Autor publicado en {book.publisher}. Sus obras combinan rigor académico con una narrativa accesible.</p>
              <a href="#" className="mt-3 inline-block text-sm border-b border-white/60 pb-0.5 hover:border-white">Ver más libros del autor</a>
            </div>
            <div className="rounded-2xl bg-blush text-ink p-5">
              <div className="text-[11px] uppercase tracking-wider text-coral font-semibold">Envío internacional</div>
              <div className="mt-2 text-sm">Entrega estimada entre el <strong>{etaMin}</strong> y el {etaMax}.</div>
              <div className="mt-2 text-xs text-ink/70">Imprenta asignada: Madrid 🇪🇸</div>
            </div>
            <div className="rounded-2xl border border-border bg-white p-5">
              <div className="text-[11px] uppercase tracking-wider text-mint font-semibold">Tu compra apoya</div>
              <ul className="mt-2 space-y-1.5 text-sm text-foreground">
                <li className="flex items-center gap-2"><Leaf className="h-4 w-4 text-mint" /> Reforestación · 1 árbol/pedido</li>
                <li className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-coral" /> Editoriales independientes</li>
                <li className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-grape" /> Royalties directos al autor</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-6">
          <div className="flex items-center gap-2 flex-wrap text-[11px] uppercase tracking-[0.2em] font-semibold">
            <span className="text-coral">{book.category}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{book.publisher}</span>
            <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-mint/15 text-mint px-2 py-0.5 normal-case tracking-normal">
              <Check className="h-3 w-3" /> Editor verificado
            </span>
          </div>
          <h1 className="mt-3 font-display text-4xl md:text-5xl text-ink leading-[1.05] text-balance">{book.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground">por <a href="#" className="text-foreground hover:text-coral underline-offset-4 hover:underline">{book.author}</a></p>

          <div className="mt-4 flex items-center gap-3 text-sm">
            <div className="flex">{[...Array(5)].map((_,i) => <Star key={i} className={`h-4 w-4 ${i < Math.round(book.rating) ? "fill-sun text-sun" : "text-border"}`} />)}</div>
            <span className="font-medium text-foreground">{book.rating}</span>
            <a href="#reviews" className="text-muted-foreground hover:text-coral">({book.reviews.toLocaleString("es")} reseñas)</a>
            <span className="h-4 w-px bg-border" />
            <span className="text-muted-foreground inline-flex items-center gap-1"><Hash className="h-3 w-3" /> {book.isbn}</span>
          </div>

          {/* Key highlights */}
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-foreground/85">
            {[
              { I: BookOpen, t: `${book.pages ?? 320} páginas` },
              { I: Languages, t: book.language ?? "Español" },
              { I: Calendar, t: `Edición ${book.year ?? 2024}` },
              { I: Sparkles, t: "Papel FSC · tinta vegetal" },
            ].map(({ I, t }) => (
              <li key={t} className="inline-flex items-center gap-2"><I className="h-3.5 w-3.5 text-coral" /> {t}</li>
            ))}
          </ul>

          {/* Price card */}
          <div className="mt-7 rounded-3xl border border-border bg-white p-6 space-y-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-4xl text-coral font-semibold">{book.price.toFixed(2)} €</span>
              {book.oldPrice && <span className="text-lg text-muted-foreground line-through">{book.oldPrice.toFixed(2)} €</span>}
              {discount > 0 && <span className="rounded-full bg-coral-soft text-coral px-2.5 py-0.5 text-xs font-semibold">Ahorras {(book.oldPrice! - book.price).toFixed(2)} €</span>}
            </div>
            <div className="text-xs text-muted-foreground -mt-3">o 3 plazos sin intereses de <span className="font-semibold text-foreground">{(book.price / 3).toFixed(2)} €</span> con Klarna</div>

            {/* Stock urgency */}
            <div className="rounded-2xl bg-coral-soft/60 border border-coral/20 p-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-1.5 font-medium text-ink"><Flame className="h-4 w-4 text-coral" /> Alta demanda</span>
                <span className="text-coral font-semibold">12 ejemplares en imprenta cercana</span>
              </div>
              <div className="h-1.5 rounded-full bg-white overflow-hidden">
                <div className="h-full bg-coral w-[28%]" />
              </div>
              <div className="text-[11px] text-ink/70">Reimpresión automática · listo para imprimir en 24 h</div>
            </div>

            {/* Format */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Formato</div>
                <a href="#" className="text-xs text-coral hover:underline">Comparar formatos</a>
              </div>
              <div className="flex gap-2">
                {(["Tapa blanda","Tapa dura"] as const).map(f => (
                  <button key={f} onClick={() => setFormat(f)} className={`flex-1 rounded-xl border-2 px-4 py-3 text-sm font-medium transition text-left relative ${format === f ? "border-coral bg-coral-soft/50 text-ink" : "border-border hover:border-foreground"}`}>
                    {format === f && <Check className="absolute top-2 right-2 h-4 w-4 text-coral" />}
                    <div>{f}</div>
                    <span className="block text-xs text-muted-foreground mt-0.5">{f === "Tapa dura" ? `${(book.price * 1.4).toFixed(2)} €` : `${book.price.toFixed(2)} €`}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Gift option */}
            <label className="flex items-start gap-3 rounded-xl border border-dashed border-border p-3 cursor-pointer hover:border-coral transition">
              <input type="checkbox" className="mt-0.5 h-4 w-4 accent-coral" />
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground inline-flex items-center gap-1.5"><Gift className="h-4 w-4 text-grape" /> Envolver como regalo (+3,90 €)</div>
                <div className="text-xs text-muted-foreground">Papel kraft con sello editorial + tarjeta personalizada</div>
              </div>
            </label>

            {/* Qty + CTA */}
            <div className="flex items-stretch gap-3">
              <div className="flex items-center border-2 border-border rounded-full">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-12 w-12 place-items-center hover:bg-cream rounded-l-full"><Minus className="h-4 w-4" /></button>
                <span className="w-10 text-center font-medium tabular-nums">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="grid h-12 w-12 place-items-center hover:bg-cream rounded-r-full"><Plus className="h-4 w-4" /></button>
              </div>
              <button className="flex-1 group inline-flex items-center justify-center gap-2 rounded-full bg-coral text-white px-6 py-3 font-medium hover:brightness-110 transition shadow-[0_8px_24px_-8px_oklch(0.68_0.19_30/0.6)] active:scale-[0.99]">
                <ShoppingBag className="h-4 w-4 transition group-hover:-rotate-12" /> Añadir — {subtotal.toFixed(2)} €
              </button>
            </div>

            <button className="w-full rounded-full bg-ink text-white py-3 font-medium hover:bg-grape transition inline-flex items-center justify-center gap-2">
              <Lock className="h-4 w-4" /> Comprar ahora
            </button>

            {/* Payment icons */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><ShieldCheck className="h-3.5 w-3.5 text-mint" /> Pago cifrado</div>
              <div className="flex items-center gap-1.5 opacity-80">
                {["VISA","MC","AMEX","PayPal","Klarna","Apple"].map(p => (
                  <span key={p} className="text-[10px] font-semibold px-1.5 py-0.5 rounded border border-border bg-cream text-ink/70">{p}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t border-border">
              <button className="inline-flex items-center gap-1.5 hover:text-coral"><Heart className="h-4 w-4" /> Guardar</button>
              <button className="inline-flex items-center gap-1.5 hover:text-coral"><Share2 className="h-4 w-4" /> Compartir</button>
              <button className="ml-auto inline-flex items-center gap-1.5 hover:text-coral">Comparar</button>
            </div>
          </div>

          {/* Shipping estimator */}
          <div className="mt-4 rounded-2xl border border-border bg-white p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-ink"><Truck className="h-4 w-4 text-coral" /> Calcula la entrega</div>
            <div className="mt-3 flex gap-2">
              <div className="flex-1 inline-flex items-center gap-2 rounded-full border border-border px-3 h-11 focus-within:border-coral">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <input
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="Código postal"
                  className="flex-1 bg-transparent outline-none text-sm"
                />
              </div>
              <button className="rounded-full bg-ink text-white text-sm px-5 hover:bg-coral transition">Calcular</button>
            </div>
            <div className="mt-3 grid sm:grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl bg-cream p-3">
                <div className="font-medium text-foreground">Estándar · Gratis desde 45 €</div>
                <div className="text-muted-foreground mt-0.5">Llega entre <strong className="text-foreground">{etaMin}</strong> y {etaMax}</div>
              </div>
              <div className="rounded-xl bg-grape-soft/40 p-3 border border-grape/20">
                <div className="font-medium text-foreground">Express DHL · 4,90 €</div>
                <div className="text-muted-foreground mt-0.5">Mañana <strong className="text-foreground">22 mayo</strong> antes de 14 h</div>
              </div>
            </div>
          </div>

          {/* Trust list */}
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            {([
              { I: Truck, t: "Envío gratis desde 45€" },
              { I: RotateCcw, t: "30 días para devolverlo" },
              { I: Leaf, t: "Impresión carbono neutro" },
              { I: ShieldCheck, t: "Pago 100% seguro" },
            ]).map(({ I, t }, i) => (
              <div key={i} className="flex items-center gap-2 text-foreground">
                <I className="h-4 w-4 text-coral shrink-0" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently bought together */}
      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="rounded-3xl bg-gradient-to-br from-grape-soft/50 via-blush/60 to-coral-soft/50 p-6 md:p-10">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-grape font-semibold"><Package className="h-4 w-4" /> Llévatelos juntos</div>
          <h2 className="mt-2 font-display text-3xl text-ink">Pack recomendado — ahorra un 10 %</h2>

          <div className="mt-8 grid lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 flex items-center gap-3 md:gap-6 flex-wrap">
              {[book, ...bundleBooks].map((b, i) => (
                <div key={b.id} className="flex items-center gap-3 md:gap-6">
                  <label className="flex flex-col items-center gap-2 cursor-pointer">
                    <div className="w-24 md:w-28">
                      <BookCover book={b} />
                    </div>
                    <div className="text-center max-w-[7rem]">
                      <div className="text-xs font-medium text-ink truncate">{b.title}</div>
                      <div className="text-xs text-coral font-semibold">{(i === 0 ? unitPrice : b.price).toFixed(2)} €</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={i === 0 ? true : !!bundle[b.id]}
                      disabled={i === 0}
                      onChange={(e) => setBundle({ ...bundle, [b.id]: e.target.checked })}
                      className="h-4 w-4 accent-coral"
                    />
                  </label>
                  {i < 2 && <Plus className="h-5 w-5 text-grape shrink-0" />}
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-white p-5">
              <div className="text-xs text-muted-foreground">Total del pack</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-3xl text-ink">{(bundleTotal - bundleSaving).toFixed(2)} €</span>
                <span className="text-sm text-muted-foreground line-through">{bundleTotal.toFixed(2)} €</span>
              </div>
              <div className="mt-1 text-xs text-mint font-medium">Ahorras {bundleSaving.toFixed(2)} €</div>
              <button className="mt-4 w-full rounded-full bg-coral text-white py-3 text-sm font-medium hover:brightness-110">Añadir pack al carrito</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-6 pb-16 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="text-[11px] uppercase tracking-[0.2em] text-coral font-medium">Preguntas frecuentes</div>
          <h2 className="mt-2 font-display text-3xl text-ink text-balance">Resuelve tus dudas antes de comprar</h2>
          <p className="mt-3 text-sm text-muted-foreground">Nuestro equipo responde en menos de 2 horas, de lunes a sábado.</p>
        </div>
        <div className="lg:col-span-8 space-y-2">
          {[
            { q: "¿Cómo funciona la impresión bajo demanda?", a: "Imprimimos tu libro en la imprenta certificada más cercana a tu dirección de envío, solo cuando lo pides. Esto reduce stock muerto y emisiones." },
            { q: "¿Puedo devolverlo si no me gusta?", a: "Sí. Tienes 30 días para devolverlo, incluso si fue impreso bajo demanda. Reembolso íntegro o cambio sin coste." },
            { q: "¿Qué calidad tiene el papel?", a: "Papel offset FSC de 90 g/m² para tapa blanda y 120 g/m² para tapa dura. Tintas vegetales certificadas." },
            { q: "¿Hacéis facturas para universidades?", a: "Sí, ofrecemos precios especiales para adopción académica y emitimos factura con IVA al instante." },
          ].map((f, i) => (
            <details
              key={i}
              open={openFaq === i}
              onToggle={(e) => (e.currentTarget as HTMLDetailsElement).open && setOpenFaq(i)}
              className="group rounded-2xl border border-border bg-white px-5 py-4 open:bg-cream transition"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-medium text-ink">{f.q}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-foreground/80">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-coral font-medium">También te puede interesar</div>
            <h2 className="mt-2 font-display text-3xl text-ink">Lectores que vieron este también vieron</h2>
          </div>
          <Link to="/catalogo" className="text-sm text-foreground hover:text-coral inline-flex items-center gap-1">Ver más <ChevronDown className="h-4 w-4 -rotate-90" /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {related.map(b => <BookCard key={b.id} book={b} />)}
        </div>
      </section>

      {/* Sticky add-to-cart bar */}
      <div
        aria-hidden={!showSticky}
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 backdrop-blur shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${showSticky ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-full opacity-0 pointer-events-none"}`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:block w-10 shrink-0">
            <BookCover book={book} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-ink truncate">{book.title}</div>
            <div className="text-xs text-muted-foreground truncate">{format} · <span className="sm:hidden font-semibold text-coral">{subtotal.toFixed(2)} €</span><span className="hidden sm:inline">{book.author}</span></div>
          </div>
          <div className="hidden md:flex items-baseline gap-2">
            <span className="font-display text-xl text-coral font-semibold">{subtotal.toFixed(2)} €</span>
            {book.oldPrice && <span className="text-xs text-muted-foreground line-through">{(book.oldPrice * qty).toFixed(2)} €</span>}
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-coral text-white px-4 sm:px-5 py-2.5 text-sm font-medium hover:brightness-110 active:scale-[0.98] transition shrink-0">
            <ShoppingBag className="h-4 w-4" /> <span className="hidden xs:inline sm:inline">Añadir</span>
          </button>
        </div>
      </div>

      {/* Spacer so sticky bar never tapa contenido en móvil */}
      <div aria-hidden className={`transition-all duration-300 ${showSticky ? "h-20 sm:h-16" : "h-0"}`} />

      <Footer />
    </main>
  );
}