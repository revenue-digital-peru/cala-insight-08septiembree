import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CALA · Performance Setiembre 2026 — Colegio María Alvarado" },
      {
        name: "description",
        content:
          "Reporte de performance de leads de pauta Facebook Ads (Formulario + WhatsApp Ads) del Colegio María Alvarado, setiembre 2026.",
      },
      { property: "og:title", content: "CALA · Performance Setiembre 2026" },
      {
        property: "og:description",
        content:
          "Leads de pauta, clasificación por buyer y visitas guiadas del Colegio María Alvarado (CMA-LHS).",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const stats = [
  {
    label: "Total leads de pauta",
    value: "133",
    sub: "48 Formulario + 85 WhatsApp Ads",
    border: "border-t-cp-blue",
  },
  {
    label: "Leads clasificados",
    value: "97",
    sub: "73% del total · A+B+C buyer (recalculado proporcional)",
    border: "border-t-cp-green",
  },
  {
    label: "Agendaron VG",
    value: "31",
    sub: "8.3% tasa de conversión a VG (recalculado proporcional)",
    border: "border-t-cp-purple-2",
  },
  {
    label: "Asistieron a VG",
    value: "12",
    sub: "Las VG programadas (10 y 17 set) aún no ocurren",
    border: "border-t-cp-orange",
  },
];

type BuyerRow = {
  tag: string;
  tagClass: string;
  fillClass: string;
  pct: number;
  leads: number;
  vg: number;
};

const channels = [
  {
    name: "Formulario",
    total: 48,
    topBorder: "border-t-cp-blue",
    dotClass: "bg-cp-blue",
    totalClass: "text-cp-blue",
    stripClass: "bg-cp-strip-blue",
    rows: [
      { tag: "Abuyer", tagClass: "bg-cp-tag-a-bg text-cp-tag-a-fg", fillClass: "bg-cp-green", pct: 45, leads: 9, vg: 3 },
      { tag: "Bbuyer", tagClass: "bg-cp-tag-b-bg text-cp-tag-b-fg", fillClass: "bg-cp-blue", pct: 95, leads: 19, vg: 1 },
      { tag: "Cbuyer", tagClass: "bg-cp-tag-c-bg text-cp-tag-c-fg", fillClass: "bg-cp-orange", pct: 100, leads: 20, vg: 2 },
    ] as BuyerRow[],
    metrics: [
      { label: "Agendaron VG", value: "6" },
      { label: "Confirmaron", value: "1" },
      { label: "Asistieron", value: "0" },
      { label: "Tasa VG", value: "12.5%" },
    ],
  },
  {
    name: "WhatsApp Ads",
    total: 85,
    topBorder: "border-t-cp-purple-2",
    dotClass: "bg-cp-purple-2",
    totalClass: "text-cp-purple-2",
    stripClass: "bg-cp-strip-purple",
    rows: [
      { tag: "Abuyer", tagClass: "bg-cp-tag-a-bg text-cp-tag-a-fg", fillClass: "bg-cp-green", pct: 42, leads: 15, vg: 3 },
      { tag: "Bbuyer", tagClass: "bg-cp-tag-b-bg text-cp-tag-b-fg", fillClass: "bg-cp-blue", pct: 61, leads: 22, vg: 1 },
      { tag: "Cbuyer", tagClass: "bg-cp-tag-c-bg text-cp-tag-c-fg", fillClass: "bg-cp-orange", pct: 33, leads: 12, vg: 0 },
      { tag: "Sin clasif.", tagClass: "bg-cp-tag-sin-bg text-cp-tag-sin-fg", fillClass: "bg-cp-fill-sin", pct: 100, leads: 36, vg: 1 },
    ] as BuyerRow[],
    metrics: [
      { label: "Agendaron VG", value: "5" },
      { label: "Confirmaron", value: "0" },
      { label: "Asistieron", value: "0" },
      { label: "Tasa VG", value: "5.9%" },
    ],
  },
];

const upcomingVG = [
  { fecha: "Miércoles 10 de setiembre 2026", agendados: 6, confirmados: 1, canal: "Formulario · WhatsApp Ads" },
  { fecha: "Miércoles 17 de setiembre 2026", agendados: 5, confirmados: 0, canal: "Formulario · WhatsApp Ads" },
];

function Header() {
  return (
    <header className="rounded-[20px] bg-linear-90 from-cp-purple-1 to-cp-purple-3 px-6 py-7 text-white sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 sm:gap-[18px]">
          <span className="rounded-[10px] bg-white px-4 py-2.5 text-sm font-extrabold tracking-wide text-cp-purple-1">
            CALA
          </span>
          <div>
            <h1 className="font-space text-xl font-extrabold sm:text-[26px]">
              Performance Setiembre 2026
            </h1>
            <p className="mt-1 max-w-2xl text-xs opacity-90 sm:text-[13px]">
              Fuente: Clientify CRM · Exportación 09/09/2026 · Leads de pauta Facebook Ads
              (Formulario + WhatsApp Ads)
            </p>
            <p className="mt-1 text-[11px] opacity-75">Colegio María Alvarado (CMA-LHS)</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="whitespace-nowrap rounded-full bg-white/20 px-4 py-2 text-[13px] font-semibold">
            Set 2026 (1–8)
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-cp-warn-bg px-4 py-2 text-[13px] font-semibold text-cp-warn-fg">
            ⚠️ Mes en curso — parcial
          </span>
        </div>
      </div>
    </header>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="mx-1 mb-3 mt-6 text-xs font-bold uppercase tracking-wide text-cp-muted">
      {children}
    </div>
  );
}

function Index() {
  const [tab, setTab] = useState<"resumen" | "vg">("resumen");

  return (
    <div className="min-h-screen bg-cp-gray-bg p-5 font-inter text-cp-text sm:p-6">
      <div className="mx-auto max-w-[1300px]">
        <Header />

        <div className="mt-5 flex gap-7 border-b border-cp-border px-1">
          {(
            [
              ["resumen", "Resumen Setiembre"],
              ["vg", "Próximas Visitas Guiadas"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={cn(
                "border-b-[3px] px-1 py-3 text-sm font-semibold transition-colors",
                tab === key
                  ? "border-cp-purple-1 text-cp-purple-1"
                  : "border-transparent text-cp-muted hover:text-cp-text"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "resumen" ? (
          <>
            <SectionLabel>Resumen de pauta · 1–8 setiembre 2026</SectionLabel>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className={cn(
                    "rounded-[14px] border-t-4 bg-white px-5 py-[18px] shadow-sm",
                    s.border
                  )}
                >
                  <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-cp-muted">
                    {s.label}
                  </div>
                  <div className="font-space mb-1 text-[32px] font-extrabold leading-none">
                    {s.value}
                  </div>
                  <div className="text-xs leading-snug text-cp-muted">{s.sub}</div>
                </div>
              ))}
            </div>

            <SectionLabel>Desglose por canal</SectionLabel>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {channels.map((c) => (
                <div
                  key={c.name}
                  className={cn(
                    "rounded-[14px] border-t-4 bg-white px-6 py-5 shadow-sm",
                    c.topBorder
                  )}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[15px] font-bold">
                      <span className={cn("h-2.5 w-2.5 rounded-full", c.dotClass)} />
                      {c.name}
                    </div>
                    <div className={cn("font-space text-2xl font-extrabold", c.totalClass)}>
                      {c.total}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {c.rows.map((r) => (
                      <div
                        key={r.tag}
                        className="grid grid-cols-[90px_1fr_auto_auto] items-center gap-3 text-[13px]"
                      >
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-[3px] text-center text-xs font-bold",
                            r.tagClass
                          )}
                        >
                          {r.tag}
                        </span>
                        <div className="h-2.5 overflow-hidden rounded-md bg-cp-track">
                          <div
                            className={cn("h-full rounded-md", r.fillClass)}
                            style={{ width: `${r.pct}%` }}
                          />
                        </div>
                        <span className="whitespace-nowrap font-semibold">{r.leads} leads</span>
                        <span className="whitespace-nowrap font-bold text-cp-purple-1">
                          ▶ {r.vg} VG
                        </span>
                      </div>
                    ))}
                  </div>

                  <div
                    className={cn(
                      "mt-4 grid grid-cols-2 gap-2 rounded-xl p-4 sm:grid-cols-4",
                      c.stripClass
                    )}
                  >
                    {c.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-cp-muted">
                          {m.label}
                        </div>
                        <div className="font-space text-xl font-extrabold">{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <SectionLabel>Visitas guiadas programadas · setiembre 2026</SectionLabel>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {upcomingVG.map((v) => (
                <div
                  key={v.fecha}
                  className="rounded-[14px] border-t-4 border-t-cp-purple-2 bg-white px-6 py-5 shadow-sm"
                >
                  <div className="text-[15px] font-bold">{v.fecha}</div>
                  <div className="mt-1 text-xs text-cp-muted">{v.canal}</div>
                  <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-cp-strip-purple p-4">
                    <div className="text-center">
                      <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-cp-muted">
                        Agendados
                      </div>
                      <div className="font-space text-xl font-extrabold">{v.agendados}</div>
                    </div>
                    <div className="text-center">
                      <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-cp-muted">
                        Confirmados
                      </div>
                      <div className="font-space text-xl font-extrabold">{v.confirmados}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mx-1 mt-4 text-xs text-cp-muted">
              Las VG del 10 y 17 de setiembre aún no ocurren, por lo que la asistencia se
              actualizará después de cada fecha.
            </p>
          </>
        )}

        <div className="mx-1 mt-8 text-xs text-cp-muted">
          <Link to="/agosto-2026" className="font-semibold text-cp-purple-1 hover:underline">
            Ver reporte de agosto 2026 →
          </Link>
        </div>
      </div>
    </div>
  );
}
