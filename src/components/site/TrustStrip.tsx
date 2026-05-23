import { Truck, ShieldCheck, Leaf, RotateCcw, Award } from "lucide-react";

const items = [
  { icon: Truck, title: "Envío gratis internacional", sub: "Desde 45€ · DHL Express", color: "text-coral bg-coral-soft" },
  { icon: ShieldCheck, title: "Pago 100% seguro", sub: "PCI DSS · 3D Secure · Stripe", color: "text-grape bg-grape-soft" },
  { icon: Leaf, title: "Impresión carbono neutro", sub: "Papel FSC, tinta climate-positive", color: "text-mint bg-mint/15" },
  { icon: RotateCcw, title: "Reimpresión garantizada", sub: "¿Llegó dañado? Lo reimprimimos.", color: "text-sun bg-sun/20" },
  { icon: Award, title: "86 universidades confían", sub: "Precios especiales para adopción", color: "text-coral bg-coral-soft" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-white">
      <div className="mx-auto max-w-7xl px-6 py-6 grid grid-cols-2 md:grid-cols-5 gap-6">
        {items.map(({ icon: Icon, title, sub, color }) => (
          <div key={title} className="flex items-start gap-3">
            <div className={`grid h-10 w-10 place-items-center rounded-full shrink-0 ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground leading-tight">{title}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}