import { createFileRoute } from "@tanstack/react-router";
import {
  channels,
  footnote,
  report,
  totals,
  type BuyerKey,
  type ChannelName,
} from "@/data-octubre";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CALA · Meta Ads — Performance Octubre 2026" },
      {
        name: "description",
        content:
          "Dashboard de performance de Meta Ads de octubre 2026 para CALA / CMA-LHS: leads de pauta Facebook Ads, clasificación buyer y visitas guiadas.",
      },
      { property: "og:title", content: "CALA · Meta Ads — Performance Octubre 2026" },
      {
        property: "og:description",
        content:
          "Leads de pauta Facebook Ads (Formulario + WhatsApp Ads), clasificación buyer y visitas guiadas de CALA · Octubre 2026 (corte al 13 de octubre).",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OctubreDashboard,
});

type KpiColor = "navy" | "blue" | "green" | "brown";

const kpiColor: Record<KpiColor, string> = {
  navy: "border-t-oc-navy text-oc-navy",
  blue: "border-t-oc-bl text-oc-bl",
  green: "border-t-oc-gr text-oc-gr",
  brown: "border-t-oc-br text-oc-br",
};

const buyerPill: Record<BuyerKey, string> = {
  A: "bg-oc-gr-soft text-oc-gr",
  B: "bg-oc-bl-soft text-oc-bl",
  C: "bg-oc-br-soft text-oc-br",
  S: "bg-oc-gy-soft text-oc-mu",
};

const barFill: Record<BuyerKey, string> = {
  A: "bg-oc-gr",
  B: "bg-oc-bl",
  C: "bg-oc-br",
  S: "bg-oc-gy",
};

const channelAccent: Record<ChannelName, string> = {
  Formulario: "text-oc-bl",
  "WhatsApp Ads": "text-oc-pu",
};

const channelDot: Record<ChannelName, string> = {
  Formulario: "bg-oc-bl",
  "WhatsApp Ads": "bg-oc-pu",
};

const channelStats: Record<ChannelName, string> = {
  Formulario: "bg-oc-bl-soft text-oc-bl",
  "WhatsApp Ads": "bg-oc-pu-soft text-oc-pu",
};

/** Porcentaje con un decimal, ej. 73.2 */
const pct = (part: number, total: number) => ((part / total) * 100).toFixed(1);

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-[13px] font-bold uppercase tracking-[0.06em] text-oc-mu">
      {children}
    </h2>
  );
}

function OctubreDashboard() {
  const formulario = channels.find((c) => c.name === "Formulario");
  const whatsapp = channels.find((c) => c.name === "WhatsApp Ads");

  const kpis: Array<{
    label: string;
    value: number;
    strong: string;
    rest: string;
    color: KpiColor;
  }> = [
    {
      label: "Total leads de pauta",
      value: totals.leads,
      strong: `Formulario ${formulario?.total ?? 0}`,
      rest: ` · WhatsApp Ads ${whatsapp?.total ?? 0}`,
      color: "navy",
    },
    {
      label: "Leads clasificados",
      value: totals.clasificados,
      strong: `${pct(totals.clasificados, totals.leads)}%`,
      rest: " del total · A+B+C buyer",
      color: "blue",
    },
    {
      label: "Agendaron VG",
      value: totals.agendaron,
      strong: `${pct(totals.agendaron, totals.leads)}%`,
      rest: " vs leads",
      color: "green",
    },
    {
      label: "Asistieron a VG",
      value: totals.asistieron,
      strong: `${pct(totals.asistieron, totals.agendaron)}%`,
      rest: ` tasa asistencia · ${totals.confirmaron} confirmaron`,
      color: "brown",
    },
  ];

  return (
    <div className="min-h-screen bg-oc-bg font-inter text-oc-tx">
      <header
        className="flex flex-wrap items-center justify-between gap-4 px-5 py-[18px] text-white sm:px-8"
        style={{
          backgroundImage: "linear-gradient(90deg, #1e1a4a 0%, #3a2370 55%, #4c2a86 100%)",
        }}
      >
        <div className="min-w-0">
          <h1 className="text-[21px] font-extrabold tracking-[-0.01em] sm:text-[26px]">
            {report.title}
          </h1>
          <p className="mt-1 text-[13px] opacity-90">{report.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {report.pills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-white/45 bg-white/8 px-3.5 py-[7px] text-[13px] font-semibold whitespace-nowrap"
            >
              {pill}
            </span>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-[1132px] px-4 pb-6 pt-6 sm:px-8 sm:pt-9">
        <SectionTitle>{report.section1Title}</SectionTitle>
        <div className="mb-9 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <article
              key={kpi.label}
              className={cn(
                "rounded-xl border-t-4 bg-white px-[18px] pb-[18px] pt-5 shadow-[0_1px_3px_rgba(20,22,40,0.06)]",
                kpiColor[kpi.color],
              )}
            >
              <div className="text-xs font-semibold uppercase tracking-[0.04em] text-oc-tx">
                {kpi.label}
              </div>
              <div className="my-2.5 text-[44px] font-extrabold leading-[1.1] tracking-[-0.02em]">
                {kpi.value}
              </div>
              <div className="text-[13px] text-oc-mu">
                <b className="font-bold text-oc-tx">{kpi.strong}</b>
                {kpi.rest}
              </div>
            </article>
          ))}
        </div>

        <SectionTitle>
          {report.section2Title} <span className="text-oc-tag">{report.section2Tag}</span>
        </SectionTitle>
        <div className="mb-6 grid grid-cols-1 gap-3.5 lg:grid-cols-2">
          {channels.map((channel) => (
            <article
              key={channel.name}
              className="rounded-xl bg-white px-[18px] pb-5 pt-[22px] shadow-[0_1px_3px_rgba(20,22,40,0.06)]"
            >
              <div className="mb-[18px] flex items-start justify-between">
                <div
                  className={cn(
                    "mt-1.5 flex items-center gap-2 text-base font-bold",
                    channelAccent[channel.name],
                  )}
                >
                  <span
                    className={cn("h-[9px] w-[9px] rounded-full", channelDot[channel.name])}
                  />
                  {channel.name}
                </div>
                <div className="text-right">
                  <div
                    className={cn(
                      "text-2xl font-extrabold leading-none",
                      channelAccent[channel.name],
                    )}
                  >
                    {channel.total}
                  </div>
                  <div className="mt-1 text-[11px] text-oc-mu">
                    {pct(channel.total, totals.leads)}% de los leads
                  </div>
                </div>
              </div>

              <div className="mb-2.5 grid grid-cols-[76px_minmax(0,1fr)_80px] items-center gap-2 text-[11px] uppercase tracking-[0.04em] text-oc-mu sm:grid-cols-[84px_minmax(0,1fr)_90px] sm:gap-3">
                <span>Buyer</span>
                <span className="text-center">Leads</span>
                <span className="text-right">Con VG</span>
              </div>

              <div className="space-y-3">
                {channel.rows.map((row) => (
                  <div
                    key={row.buyer}
                    className="grid grid-cols-[76px_minmax(0,1fr)_80px] items-center gap-2 sm:grid-cols-[84px_minmax(0,1fr)_90px] sm:gap-3"
                  >
                    <span
                      className={cn(
                        "rounded-full py-[5px] text-center text-[13px] font-semibold",
                        buyerPill[row.key],
                      )}
                    >
                      {row.buyer}
                    </span>
                    <div className="h-[6px] overflow-hidden rounded-full bg-oc-track">
                      <div
                        className={cn("h-full rounded-full", barFill[row.key])}
                        style={{ width: `${(row.leads / channel.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-right text-[13px] whitespace-nowrap">
                      <b className="font-bold text-oc-tx">{row.leads}</b>{" "}
                      <span className="mx-0.5 text-[10px] text-oc-mu">▶</span>{" "}
                      <span className="font-semibold text-oc-gr">{row.vg} VG</span>
                    </span>
                  </div>
                ))}
              </div>

              <div
                className={cn(
                  "mt-5 grid grid-cols-2 gap-y-3 rounded-[10px] px-2 py-3.5 text-center sm:grid-cols-4",
                  channelStats[channel.name],
                )}
              >
                {[
                  { n: String(channel.stats.agendaron), l: "Agendaron VG" },
                  { n: String(channel.stats.confirmaron), l: "Confirmaron" },
                  { n: String(channel.stats.asistieron), l: "Asistieron" },
                  { n: `${pct(channel.stats.agendaron, channel.total)}%`, l: "Tasa VG" },
                ].map((item) => (
                  <div key={item.l}>
                    <div className="text-xl font-extrabold">{item.n}</div>
                    <div className="mt-0.5 text-[9.5px] font-bold uppercase tracking-[0.04em]">
                      {item.l}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="text-xs leading-relaxed text-oc-mu">{footnote}</p>
      </main>
    </div>
  );
}
