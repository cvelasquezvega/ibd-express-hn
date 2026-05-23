import { Star, Heart, ShoppingBag } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { BookCover } from "./BookCover";
import type { Book } from "@/data/books";

const badgeColors: Record<string,string> = {
  "Más vendido": "bg-coral text-white",
  "Novedad": "bg-grape text-white",
  "Recomendado": "bg-ink text-white",
  "Premiado": "bg-sun text-ink",
};

export function BookCard({ book }: { book: Book }) {
  return (
    <article className="group relative">
      <Link to="/libro/$slug" params={{ slug: book.slug }} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-cream p-6 transition-all duration-500 hover:shadow-[var(--shadow-lift)]">
          {book.badge && (
            <span className={`absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${badgeColors[book.badge]}`}>
              {book.badge}
            </span>
          )}
          {book.oldPrice && !book.badge && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-coral text-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
              −{Math.round((1 - book.price / book.oldPrice) * 100)}%
            </span>
          )}
          <button
            aria-label="Añadir a favoritos"
            onClick={(e) => { e.preventDefault(); }}
            className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-foreground opacity-0 backdrop-blur transition-all hover:bg-white hover:text-coral group-hover:opacity-100"
          >
            <Heart className="h-4 w-4" />
          </button>
          <div className="mx-auto w-[68%] transform-gpu transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:rotate-[-2deg]">
            <BookCover book={book} />
          </div>

          {/* hover CTA */}
          <button
            onClick={(e) => { e.preventDefault(); }}
            className="absolute inset-x-6 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2 rounded-full bg-ink text-white py-2.5 text-xs font-medium hover:bg-coral"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Añadir al carrito
          </button>
        </div>
      </Link>

      <div className="mt-4 space-y-1">
        <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          {book.category}
        </div>
        <h3 className="font-display text-[17px] leading-snug text-foreground">
          <Link to="/libro/$slug" params={{ slug: book.slug }} className="hover:text-coral transition">
            {book.title}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground">{book.author}</p>
        <div className="flex items-center gap-1.5 pt-1">
          <Star className="h-3.5 w-3.5 fill-sun text-sun" />
          <span className="text-xs font-medium text-foreground">{book.rating}</span>
          <span className="text-xs text-muted-foreground">({book.reviews.toLocaleString("es")})</span>
        </div>
        <div className="flex items-baseline gap-2 pt-1">
          <span className="font-display text-xl text-coral font-semibold">{book.price.toFixed(2)} €</span>
          {book.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">{book.oldPrice.toFixed(2)} €</span>
          )}
        </div>
      </div>
    </article>
  );
}