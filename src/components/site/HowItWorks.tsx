import { Search, Printer, Truck } from "lucide-react";

const steps = [
  { icon: Search, k: "01", t: "Descubre", d: "Explora 1,2M de títulos de 320 editoriales en 14 idiomas. Filtra por ISBN, curso o curador.", color: "bg-coral" },
  { icon: Printer, k: "02", t: "Lo imprimimos para ti", d: "Tu pedido se enruta a la imprenta más cercana —generalmente en menos de 24 h tras tu compra.", color: "bg-grape" },
  { icon: Truck, k: "03", t: "Te lo enviamos", d: "DHL Express con seguimiento, en 5–7 días hábiles a cualquier parte del mundo. Carbono neutro.", color: "bg-mint" },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-blush/40">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl">
          <div className="text-[11px] uppercase tracking-[0.2em] text-coral font-medium">Cómo funciona</div>
          <h2 className="mt-2 font-display text-4xl md:text-5xl text-ink text-balance">Sin almacenes. Sin sobrantes. Solo el libro que querías.</h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {steps.map(({ icon: Icon, k, t, d, color }) => (
            <div key={k} className="bg-white rounded-3xl p-8 md:p-10 hover:-translate-y-1 transition-transform shadow-sm">
              <div className="flex items-center justify-between">
                <div className={`grid h-12 w-12 place-items-center rounded-full ${color} text-white`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-display text-5xl text-coral-soft">{k}</span>
              </div>
              <h3 className="mt-8 font-display text-2xl text-foreground">{t}</h3>
              <p className="mt-3 text-muted-foreground text-pretty">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}