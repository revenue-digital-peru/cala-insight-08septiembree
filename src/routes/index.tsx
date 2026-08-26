import { createFileRoute } from "@tanstack/react-router";
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
    color: "cala-purple-500",
  },
  {
    label: "Leads clasificados",
    value: "103",
    sub: "71.5% del total · A+B+C buyer",
    color: "cala-blue",
  },
  {
    label: "Agendaron VG",
    value: "169",
    sub: "Base VG oficial · Fecha VG en agosto",
    color: "cala-green",
  },
  {
    label: "Asistieron VG",
    value: "29",
    sub: "17.2% de las agendadas",
    color: "cala-orange",
  },
  {
    label: "Pagos de Admisión (PA)",
    value: "10",
    sub: "5.9% de las agendadas · +2 'Después de VG'",
    color: "cala-pink",
  },
];

const channels = [
  {
    name: "Formulario",
    total: 52,
    themeColor: "cala-blue",
    buyers: [
      { label: "Abuyer", count: 12, pct: 23, color: "cala-a-fg" },
      { label: "Bbuyer", count: 21, pct: 40, color: "cala-b-fg" },
      { label: "Cbuyer", count: 19, pct: 37, color: "cala-c-fg" },
      { label: "Sin clasificar", count: 0, pct: 0, color: "cala-n-fg" },
    ],
    footer: { confirmaron: 15, asistieron: 7, pa: 2 },
    note: "+1 'Después de VG' no incluido en el PA",
    footerGradient: "from-cala-form-footer-start",
  },
  {
    name: "WhatsApp Ads",
    total: 92,
    themeColor: "cala-purple-accent",
    buyers: [
      { label: "Abuyer", count: 18, pct: 20, color: "cala-a-fg" },
      { label: "Bbuyer", count: 22, pct: 24, color: "cala-b-fg" },
      { label: "Cbuyer", count: 11, pct: 12, color: "cala-c-fg" },
      { label: "Sin clasificar", count: 41, pct: 45, color: "cala-n-fg" },
    ],
    footer: { confirmaron: 16, asistieron: 2, pa: 0 },
    note: "0 casos 'Después de VG'",
    footerGradient: "from-cala-whatsapp-footer-start",
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
  color,
}: {
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <div className={`rounded-[14px] border-t-[3px] border-t-${color} bg-white p-4 shadow-sm`}>
      <div className="text-[10px] font-bold uppercase tracking-wider text-cala-gray-600">
        {label}
      </div>
      <div className={`font-space mt-2 text-[28px] font-bold leading-none text-${color}`}>
        {value}
      </div>
      <div className="mt-1.5 text-[11px] text-cala-gray-600">{sub}</div>
    </div>
  );
}

function ChannelCard({
  name,
  total,
  themeColor,
  buyers,
  footer,
  note,
  footerGradient,
}: {
  name: string;
  total: number;
  themeColor: string;
  buyers: { label: string; count: number; pct: number; color: string }[];
  footer: { confirmaron: number; asistieron: number; pa: number };
  note: string;
  footerGradient: string;
}) {
  return (
    <div className="rounded-[14px] bg-white p-5 sm:p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-bold">
          <span className={`h-2.5 w-2.5 rounded-full bg-${themeColor}`} />
          {name}
        </div>
        <div className={`font-space text-[22px] font-bold text-${themeColor}`}>
          {total}
        </div>
      </div>

      <div className="space-y-2.5">
        {buyers.map((b) => (
          <div key={b.label} className="grid grid-cols-[80px_1fr_40px] items-center gap-2.5 text-xs sm:text-[13px]">
            <span className="font-semibold text-cala-gray-900">{b.label}</span>
            <div className="h-2 rounded-md bg-cala-gray-100 overflow-hidden">
              <div
                className={`h-full rounded-md bg-${b.color}`}
                style={{ width: `${b.pct}%` }}
              />
            </div>
            <span className="text-right font-bold text-cala-gray-900">
              {b.count} ({b.pct}%)
            </span>
          </div>
        ))}
      </div>

      <div className={`mt-4 grid grid-cols-3 gap-1.5 rounded-[10px] bg-linear-0 ${footerGradient} to-transparent px-1.5 pt-3.5 pb-1`}>
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
