import type { Book } from "@/data/books";

export function BookCover({ book, className = "" }: { book: Book; className?: string }) {
  return (
    <div
      className={`book-cover aspect-[2/3] w-full rounded-sm flex flex-col justify-between p-3 text-white ${className}`}
      style={{ ["--cover-c1" as any]: book.c1, ["--cover-c2" as any]: book.c2 }}
    >
      <div className="text-[9px] uppercase tracking-[0.2em] opacity-70 font-sans">
        {book.publisher}
      </div>
      <div>
        <div className="font-display text-[15px] leading-tight font-medium text-balance">
          {book.title}
        </div>
        <div className="mt-2 h-px w-8 bg-white/40" />
        <div className="mt-2 text-[10px] uppercase tracking-[0.18em] opacity-80">
          {book.author}
        </div>
      </div>
    </div>
  );
}
