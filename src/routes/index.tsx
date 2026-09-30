import { createFileRoute } from "@tanstack/react-router";
import {
  channels,
  footnote,
  kpis,
  maxLeads,
  report,
  type BuyerKey,
  type ChannelName,
  type KpiColor,
} from "@/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CALA · Meta Ads — Performance Septiembre 2026" },
      {
        name: "description",
        content:
          "Dashboard de performance de Meta Ads de septiembre 2026 para CALA / CMA-LHS: leads de pauta Facebook Ads, clasificación buyer y visitas guiadas.",
      },
      { property: "og:title", content: "CALA · Meta Ads — Performance Septiembre 2026" },
      {
        property: "og:description",
        content:
          "Leads de pauta Facebook Ads (Formulario + WhatsApp Ads), clasificación buyer y visitas guiadas de CALA · Septiembre 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MetaAdsDashboard,
});

const kpiBorder: Record<KpiColor, string> = {
  purple: "border-t-ca-pu",
  blue: "border-t-ca-bl",
  green: "border-t-ca-gr",
  orange: "border-t-ca-or",
};

const kpiNumber: Record<KpiColor, string> = {
  purple: "text-ca-num",
  blue: "text-ca-bl",
  green: "text-ca-gr",
  orange: "text-ca-or",
};

const buyerPill: Record<BuyerKey, string> = {
  A: "bg-ca-pill-a-bg text-ca-pill-a-fg",
  B: "bg-ca-pill-b-bg text-ca-pill-b-fg",
  C: "bg-ca-pill-c-bg text-ca-pill-c-fg",
  S: "bg-ca-pill-s-bg text-ca-pill-s-fg",
};

const barFill: Record<BuyerKey, string> = {
  A: "bg-ca-fill-a",
  B: "bg-ca-fill-b",
  C: "bg-ca-fill-c",
  S: "bg-ca-fill-s",
};

const channelAccent: Record<ChannelName, string> = {
  Formulario: "text-ca-bl",
  "WhatsApp Ads": "text-ca-wa",
};

const channelStrip: Record<ChannelName, string> = {
  Formulario: "bg-ca-strip-f text-ca-bl",
  "WhatsApp Ads": "bg-ca-strip-w text-ca-wa",
};

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="mb-2.5 mt-[22px] text-xs font-semibold tracking-[0.08em] text-ca-mu">
      {children}
    </h2>
  );
}

function MetaAdsDashboard() {
  return (
    <div className="min-h-screen bg-ca-bg font-inter text-ca-tx">
      <header
        className="flex flex-wrap items-center justify-between gap-3 px-5 py-[22px] text-white shadow-[0_4px_14px_rgba(30,17,70,0.25)]"
        style={{
          backgroundImage: "linear-gradient(100deg, #1d1140, #311d62 55%, #4e2cac)",
        }}
      >
        <div className="min-w-0">
          <h1 className="text-[26px] font-extrabold leading-tight">{report.title}</h1>
          <p className="mt-1 text-xs opacity-85">{report.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-0.5">
          {report.pills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-white/30 bg-white/18 px-3.5 py-1.5 text-xs font-semibold"
            >
              {pill}
            </span>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-5 py-5">
        <SectionTitle>{report.section1Title}</SectionTitle>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <article
              key={kpi.label}
              className={cn(
                "rounded-[14px] border border-ca-bd border-t-[3px] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
                kpiBorder[kpi.color],
              )}
            >
              <small className="text-[11px] font-semibold tracking-[0.05em] text-ca-mu">
                {kpi.label}
              </small>
              <b
                className={cn(
                  "my-1.5 block text-[40px] font-extrabold leading-none",
                  kpiNumber[kpi.color],
                )}
                style={kpi.numberColor ? { color: kpi.numberColor } : undefined}
              >
                {kpi.value}
              </b>
              <span className="text-xs text-ca-mu">
                <strong className="font-semibold text-ca-tx">{kpi.strong}</strong>
                {kpi.rest}
              </span>
            </article>
          ))}
        </div>

        <SectionTitle>{report.section2Title}</SectionTitle>
        <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-2">
          {channels.map((channel) => (
            <article
              key={channel.name}
              className="rounded-[14px] bg-white p-[18px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            >
              <div className="mb-3 flex items-center justify-between font-bold">
                <span className={cn("text-base", channelAccent[channel.name])}>
                  ● {channel.name}
                </span>
                <b className={cn("text-2xl", channelAccent[channel.name])}>{channel.total}</b>
              </div>

              <div className="mb-1.5 flex items-center justify-between text-[10px] tracking-[0.06em] text-ca-mu">
                <span>BUYER</span>
                <span>LEADS</span>
                <span className="pr-1">CON VG</span>
              </div>

              <div>
                {channel.rows.map((row) => (
                  <div
                    key={row.buyer}
                    className="my-2 grid grid-cols-[84px_1fr_34px_62px] items-center gap-2 text-[13px]"
                  >
                    <span
                      className={cn(
                        "rounded-[14px] py-1 text-center text-xs font-semibold",
                        buyerPill[row.key],
                      )}
                    >
                      {row.buyer}
                    </span>
                    <div className="h-[7px] overflow-hidden rounded-[5px] bg-ca-bd">
                      <div
                        className={cn("h-full rounded-[5px]", barFill[row.key])}
                        style={{ width: `${(row.leads / maxLeads) * 100}%` }}
                      />
                    </div>
                    <b className="text-right font-bold">{row.leads}</b>
                    <em className="text-xs font-semibold not-italic text-ca-gr">
                      ▶ {row.vg} VG
                    </em>
                  </div>
                ))}
              </div>

              <div
                className={cn(
                  "mt-3.5 grid grid-cols-4 rounded-[10px] px-1 py-3 text-center text-[9px] font-bold",
                  channelStrip[channel.name],
                )}
              >
                {channel.strip.map((item) => (
                  <div key={item.label}>
                    <b className="block text-[22px] font-extrabold leading-tight">{item.value}</b>
                    {item.label}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-[18px] text-[11px] leading-relaxed text-ca-mu">{footnote}</p>
      </main>
    </div>
  );
}
