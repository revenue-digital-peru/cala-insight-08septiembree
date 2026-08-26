import { createFileRoute } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/cala_logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CALA - Reporte de Performance Agosto 2026" },
      { name: "description", content: "Reporte de performance de marketing de agosto 2026 para CALA." },
      { property: "og:title", content: "CALA - Reporte de Performance Agosto 2026" },
      { property: "og:description", content: "Reporte de performance de marketing de agosto 2026 para CALA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const kpis = [
  {
    label: "Total leads (pauta)",
    value: "144",
    sub: "Formulario + WhatsApp Ads · generados en agosto",
    borderClass: "border-t-cala-purple-500",
    valueClass: "text-cala-purple-500",
  },
  {
    label: "Leads clasificados",
    value: "103",
    sub: "71.5% del total · A+B+C buyer",
    borderClass: "border-t-cala-blue",
    valueClass: "text-cala-blue",
  },
  {
    label: "Agendaron VG",
    value: "169",
    sub: "Base VG oficial · Fecha VG en agosto",
    borderClass: "border-t-cala-green",
    valueClass: "text-cala-green",
  },
  {
    label: "Asistieron VG",
    value: "29",
    sub: "17.2% de las agendadas",
    borderClass: "border-t-cala-orange",
    valueClass: "text-cala-orange",
  },
  {
    label: "Pagos de Admisión (PA)",
    value: "10",
    sub: "5.9% de las agendadas · +2 'Después de VG'",
    borderClass: "border-t-cala-pink",
    valueClass: "text-cala-pink",
  },
];

const channels = [
  {
    name: "Formulario",
    total: 52,
    themeClass: "cala-blue",
    dotClass: "bg-cala-blue",
    totalClass: "text-cala-blue",
    buyers: [
      { label: "Abuyer", count: 12, pct: 23, barClass: "bg-cala-a-fg" },
      { label: "Bbuyer", count: 21, pct: 40, barClass: "bg-cala-b-fg" },
      { label: "Cbuyer", count: 19, pct: 37, barClass: "bg-cala-c-fg" },
      { label: "Sin clasificar", count: 0, pct: 0, barClass: "bg-cala-n-fg" },
    ],
    footer: { confirmaron: 15, asistieron: 7, pa: 2 },
    note: "+1 'Después de VG' no incluido en el PA",
    footerGradientClass: "from-cala-form-footer-start",
  },
  {
    name: "WhatsApp Ads",
    total: 92,
    themeClass: "cala-purple-accent",
    dotClass: "bg-cala-purple-accent",
    totalClass: "text-cala-purple-accent",
    buyers: [
      { label: "Abuyer", count: 18, pct: 20, barClass: "bg-cala-a-fg" },
      { label: "Bbuyer", count: 22, pct: 24, barClass: "bg-cala-b-fg" },
      { label: "Cbuyer", count: 11, pct: 12, barClass: "bg-cala-c-fg" },
      { label: "Sin clasificar", count: 41, pct: 45, barClass: "bg-cala-n-fg" },
    ],
    footer: { confirmaron: 16, asistieron: 2, pa: 0 },
    note: "0 casos 'Después de VG'",
    footerGradientClass: "from-cala-whatsapp-footer-start",
  },
];

function Header() {
  return (
    <header className="bg-linear-120 from-cala-purple-900 via-cala-purple-700 to-cala-purple-500 px-6 py-7 text-white sm:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-center gap-4 sm:gap-5">
          <div className="h-14 w-14 shrink-0 rounded-[14px] bg-white p-1.5">
            <img
              src={logoAsset.url}
              alt="CALA"
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <h1 className="font-space text-xl font-bold sm:text-2xl">
              CALA - Reporte de Performance Agosto 2026
            </h1>
            <p className="mt-1 max-w-3xl text-xs opacity-85 sm:text-sm">
              Fuente: Clientify CRM (exportación 26/08/2026) cruzado con Base de datos VG 2027/2028 oficial — solo registros de agosto
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 text-xs font-semibold">
            Datos hasta 25/08
          </span>
          <span className="rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 text-xs font-semibold">
            100% Validado
          </span>
        </div>
      </div>
    </header>
  );
}

function KPICard({
  label,
  value,
  sub,
  borderClass,
  valueClass,
}: {
  label: string;
  value: string;
  sub: string;
  borderClass: string;
  valueClass: string;
}) {
  return (
    <div className={cn("rounded-[14px] border-t-[3px] bg-white p-4 shadow-sm", borderClass)}>
      <div className="text-[10px] font-bold uppercase tracking-wider text-cala-gray-600">
        {label}
      </div>
      <div className={cn("font-space mt-2 text-[28px] font-bold leading-none", valueClass)}>
        {value}
      </div>
      <div className="mt-1.5 text-[11px] text-cala-gray-600">{sub}</div>
    </div>
  );
}

function ChannelCard({
  name,
  total,
  themeClass,
  buyers,
  footer,
  note,
  footerGradientClass,
}: {
  name: string;
  total: number;
  themeClass: string;
  buyers: { label: string; count: number; pct: number; barClass: string }[];
  footer: { confirmaron: number; asistieron: number; pa: number };
  note: string;
  footerGradientClass: string;
}) {
  return (
    <div className="rounded-[14px] bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-bold">
          <span className={cn("h-2.5 w-2.5 rounded-full", `bg-${themeClass}`)} />
          {name}
        </div>
        <div className={cn("font-space text-[22px] font-bold", `text-${themeClass}`)}>
          {total}
        </div>
      </div>

      <div className="space-y-2.5">
        {buyers.map((b) => (
          <div key={b.label} className="grid grid-cols-[80px_1fr_40px] items-center gap-2.5 text-xs sm:text-[13px]">
            <span className="font-semibold text-cala-gray-900">{b.label}</span>
            <div className="h-2 overflow-hidden rounded-md bg-cala-gray-100">
              <div
                className={cn("h-full rounded-md", b.barClass)}
                style={{ width: `${b.pct}%` }}
              />
            </div>
            <span className="text-right font-bold text-cala-gray-900">
              {b.count} ({b.pct}%)
            </span>
          </div>
        ))}
      </div>

      <div
        className={cn(
          "mt-4 grid grid-cols-3 gap-1.5 rounded-[10px] bg-linear-0 to-transparent px-1.5 pb-1 pt-3.5",
          footerGradientClass
        )}
      >
        <div className="text-center">
          <div className="font-space text-xl font-bold text-cala-gray-900">
            {footer.confirmaron}
          </div>
          <div className="mt-0.5 text-[9.5px] font-bold uppercase tracking-wider text-cala-gray-600">
            Confirmaron
          </div>
        </div>
        <div className="text-center">
          <div className="font-space text-xl font-bold text-cala-gray-900">
            {footer.asistieron}
          </div>
          <div className="mt-0.5 text-[9.5px] font-bold uppercase tracking-wider text-cala-gray-600">
            Asistieron
          </div>
        </div>
        <div className="text-center">
          <div className="font-space text-xl font-bold text-cala-gray-900">
            {footer.pa}
          </div>
          <div className="mt-0.5 text-[9.5px] font-bold uppercase tracking-wider text-cala-gray-600">
            PA
          </div>
        </div>
        <div className="col-span-3 text-center text-[10px] text-cala-gray-600">
          {note}
        </div>
      </div>
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-cala-gray-50 font-inter text-cala-gray-900">
      <Header />

      <main className="mx-auto max-w-7xl px-6 pb-16 pt-6 sm:px-10">
        <section>
          <h2 className="mb-3.5 text-[11px] font-bold uppercase tracking-wider text-cala-gray-600">
            Resumen de agosto 2026
          </h2>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
            {kpis.map((kpi) => (
              <KPICard key={kpi.label} {...kpi} />
            ))}
          </div>
        </section>

        <section className="mt-7">
          <h2 className="mb-3.5 text-[11px] font-bold uppercase tracking-wider text-cala-gray-600">
            Desglose por canal
          </h2>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {channels.map((channel) => (
              <ChannelCard key={channel.name} {...channel} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
