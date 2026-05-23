import { Instagram, Twitter, Youtube, Globe } from "lucide-react";
import { Link } from "@tanstack/react-router";

const cols = [
  { h: "Comprar", l: [["Catálogo","/catalogo"],["Más vendidos","#"],["Novedades","#"],["Universitario","#"],["Recomendados","#"],["Tarjeta regalo","#"]] },
  { h: "Editoriales", l: [["Publica con nosotros","#"],["Modelo de regalías","#"],["Ficha técnica","#"],["API e integraciones","#"],["Directorio","#"]] },
  { h: "Empresa", l: [["Sobre Folio & Press","#"],["Sostenibilidad","#"],["Sala de prensa","#"],["Trabaja con nosotros","#"],["Contacto","#"]] },
  { h: "Ayuda", l: [["Seguir mi pedido","#"],["Envíos","#"],["Devoluciones","#"],["Buscador ISBN","#"],["Preguntas frecuentes","#"]] },
] as const;

export function Footer() {
  return (
    <footer className="bg-ink text-ivory/80">
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-2 md:grid-cols-6 gap-10">
        <div className="col-span-2">
          <div className="flex items-baseline gap-1">
            <span className="font-display text-2xl text-ivory">Folio</span>
            <span className="text-coral font-display text-2xl">&</span>
            <span className="font-display text-2xl text-ivory">Press</span>
          </div>
          <p className="mt-4 text-sm text-ivory/60 max-w-xs">Libros impresos bajo demanda de las mejores editoriales del mundo. Hechos para ti, enviados desde la imprenta más cercana a tu puerta.</p>
          <div className="mt-6 flex gap-2">
            {[Instagram, Twitter, Youtube].map((I, i) => (
              <a key={i} href="#" aria-label="social" className="grid h-9 w-9 place-items-center rounded-full border border-ivory/20 hover:bg-coral hover:border-coral transition"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        {cols.map(c => (
          <div key={c.h}>
            <div className="text-[11px] uppercase tracking-[0.18em] text-ivory/50">{c.h}</div>
            <ul className="mt-4 space-y-2.5">
              {c.l.map(([label, href]) => (
                <li key={label}>
                  {href.startsWith("/")
                    ? <Link to={href} className="text-sm text-ivory/80 hover:text-coral transition">{label}</Link>
                    : <a href={href} className="text-sm text-ivory/80 hover:text-coral transition">{label}</a>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ivory/50">
          <div>© {new Date().getFullYear()} Folio & Press, S.A. — Certificado carbono neutro</div>
          <div className="flex items-center gap-5">
            <button className="flex items-center gap-1.5 hover:text-ivory transition"><Globe className="h-3.5 w-3.5" /> Español / EUR</button>
            <a href="#" className="hover:text-ivory">Privacidad</a>
            <a href="#" className="hover:text-ivory">Términos</a>
            <a href="#" className="hover:text-ivory">Cookies</a>
            <a href="#" className="hover:text-ivory">Accesibilidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}