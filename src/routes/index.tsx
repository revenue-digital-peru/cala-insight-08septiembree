import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Performance Setiembre 2026 | CALA" },
      {
        name: "description",
        content: "Dashboard de performance de marketing de setiembre 2026 para CALA y CMA-LHS.",
      },
      { property: "og:title", content: "Performance Setiembre 2026 | CALA" },
      {
        property: "og:description",
        content: "Leads de pauta, clasificación buyer y próximas visitas guiadas de CALA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PerformanceDashboard,
});

type Canal = "Formulario" | "WhatsApp Ads" | "Otro";
type Buyer = "Abuyer" | "Bbuyer" | "Cbuyer" | "Sin clasif.";

type Lead = {
  id: string;
  nombre: string;
  canal: Canal;
  buyer: Buyer;
  agendo_vg: boolean;
  confirmo_vg: boolean;
  asistio_vg: boolean;
  fecha_vg: string;
  grado_interes: string;
};

const SEPTEMBER_VG = "2026-09-17T08:00:00-05:00";
const OCTOBER_VG = "2026-10-01T08:00:00-05:00";
const PAST_VG = "2026-09-10T08:00:00-05:00";

const septemberVisitRows = [
  ["Katherine Milagritos Machuca", "Otro", "Sin clasif.", "Nursery (2027)"],
  ["Pamela Venegas", "Formulario", "Bbuyer", "Nursery (2027)"],
  ["Ingrid Prieto Hernández", "Formulario", "Cbuyer", "Nursery (2027)"],
  ["Johan Williams Mansilla", "Otro", "Sin clasif.", "Kinder (2028)"],
  ["Anaís Guevara Pastor", "Formulario", "Cbuyer", "Nursery (2027)"],
  ["Naysha Nestares", "WhatsApp Ads", "Sin clasif.", "Nursery (2028)"],
  ["Ursula Sandoval Gionti", "Formulario", "Cbuyer", "1st grade (2028)"],
  ["Adeli Haynee Vidal Cuba", "Formulario", "Cbuyer", "Nursery (2028)"],
  ["Roxana Torres", "WhatsApp Ads", "Abuyer", "Nursery (2027)"],
  ["Laura Karina Carrillo Tenicela", "WhatsApp Ads", "Abuyer", "Nursery (2027)"],
  ["Milagros Godos Vite", "Formulario", "Abuyer", "Nursery (2027)"],
  ["Sonia Condori", "Otro", "Sin clasif.", "Nursery (2027)"],
  ["Billy Francisco Gonzales", "Otro", "Abuyer", "Nursery (2027)"],
  ["Diana Ruiz", "Otro", "Sin clasif.", "Nursery (2027)"],
  ["Veronica Prudencio Yauri", "WhatsApp Ads", "Bbuyer", "Nursery (2027)"],
  ["Miguel Angel Ortiz", "WhatsApp Ads", "Sin clasif.", "Nursery (2028)"],
  ["Abigail Chuquipoma", "Otro", "Sin clasif.", "1st grade (2028)"],
  ["Paulo Cisneros", "Otro", "Sin clasif.", "Kinder (2027)"],
  ["Karol Cañete", "Otro", "Abuyer", "Nursery (2027)"],
  ["Melva Cayotopa", "WhatsApp Ads", "Abuyer", "Kinder (2027)"],
] satisfies Array<[string, Canal, Buyer, string]>;

const upcomingLeads: Lead[] = septemberVisitRows.map(([nombre, canal, buyer, grado_interes], index) => ({
  id: `vg-sep-${index + 1}`,
  nombre,
  canal: canal as Canal,
  buyer: buyer as Buyer,
  agendo_vg: true,
  confirmo_vg: index < 4,
  asistio_vg: false,
  fecha_vg: SEPTEMBER_VG,
  grado_interes,
}));

const octoberVisitRows = [
    ["Frank Mateo Robles", "Formulario", "Abuyer", "Nursery (2027)"],
    ["Daniela Villega", "Formulario", "Abuyer", "Kinder (2027)"],
    ["Victor Chura", "Formulario", "Abuyer", "Nursery (2027)"],
    ["Edu Guerrero", "WhatsApp Ads", "Sin clasif.", "Nursery (2027)"],
    ["Betsy Mamani", "WhatsApp Ads", "Abuyer", "Kinder (2027)"],
    ["Samira De La Cruz", "Formulario", "Cbuyer", "Nursery (2027)"],
    ["Cintya Cordova", "Otro", "Sin clasif.", "Nursery (2027)"],
    ["Suzzetty Ching", "Otro", "Sin clasif.", "Kinder (2027)"],
] satisfies Array<[string, Canal, Buyer, string]>;

upcomingLeads.push(
  ...octoberVisitRows.map(([nombre, canal, buyer, grado_interes], index) => ({
    id: `vg-oct-${index + 1}`,
    nombre,
    canal: canal as Canal,
    buyer: buyer as Buyer,
    agendo_vg: true,
    confirmo_vg: false,
    asistio_vg: false,
    fecha_vg: OCTOBER_VG,
    grado_interes,
  })),
);

const targetCounts: Record<Exclude<Canal, "Otro">, Record<Buyer, number>> = {
  Formulario: { Abuyer: 11, Bbuyer: 24, Cbuyer: 29, "Sin clasif.": 14 },
  "WhatsApp Ads": { Abuyer: 18, Bbuyer: 20, Cbuyer: 9, "Sin clasif.": 71 },
};

function createSampleLeads(): Lead[] {
  const pautaUpcoming = upcomingLeads.filter((lead) => lead.canal !== "Otro");
  const pastScheduled: Lead[] = [
    ...Array.from({ length: 3 }, (_, index) => ({
      id: `past-form-${index + 1}`,
      nombre: `Lead Formulario ${index + 1}`,
      canal: "Formulario" as const,
      buyer: (["Abuyer", "Bbuyer", "Cbuyer"] as const)[index] ?? "Cbuyer",
      agendo_vg: true,
      confirmo_vg: true,
      asistio_vg: true,
      fecha_vg: PAST_VG,
      grado_interes: "Nursery (2027)",
    })),
    ...Array.from({ length: 10 }, (_, index) => ({
      id: `past-wa-${index + 1}`,
      nombre: `Lead WhatsApp ${index + 1}`,
      canal: "WhatsApp Ads" as const,
      buyer:
        (["Abuyer", "Bbuyer", "Cbuyer", "Sin clasif."] as const)[index % 4] ??
        "Sin clasif.",
      agendo_vg: true,
      confirmo_vg: index < 9,
      asistio_vg: index < 9,
      fecha_vg: PAST_VG,
      grado_interes: "Nursery (2027)",
    })),
  ];
  const scheduled = [...pautaUpcoming, ...pastScheduled];
  const leads = [...scheduled];

  (Object.keys(targetCounts) as Array<Exclude<Canal, "Otro">>).forEach((canal) => {
    (Object.keys(targetCounts[canal]) as Buyer[]).forEach((buyer) => {
      const existing = scheduled.filter(
        (lead) => lead.canal === canal && lead.buyer === buyer,
      ).length;
      const remaining = targetCounts[canal][buyer] - existing;
      for (let index = 0; index < remaining; index += 1) {
        leads.push({
          id: `${canal}-${buyer}-${index}`,
          nombre: `Lead ${canal} ${buyer} ${index + 1}`,
          canal,
          buyer,
          agendo_vg: false,
          confirmo_vg: false,
          asistio_vg: false,
          fecha_vg: "",
          grado_interes: "Por definir",
        });
      }
    });
  });

  return [...leads, ...upcomingLeads.filter((lead) => lead.canal === "Otro")];
}

const leads = createSampleLeads();
const buyers: Buyer[] = ["Abuyer", "Bbuyer", "Cbuyer", "Sin clasif."];
const marketingChannels: Array<Exclude<Canal, "Otro">> = ["Formulario", "WhatsApp Ads"];

const buyerStyles: Record<Buyer, { tag: string; fill: string }> = {
  Abuyer: { tag: "bg-cala-a-bg text-cala-a-fg", fill: "bg-cala-green" },
  Bbuyer: { tag: "bg-cala-b-bg text-cala-b-fg", fill: "bg-cala-blue" },
  Cbuyer: { tag: "bg-cala-c-bg text-cala-c-fg", fill: "bg-cala-orange" },
  "Sin clasif.": { tag: "bg-cala-n-bg text-cala-n-fg", fill: "bg-cala-gray-400" },
};

const channelStyles: Record<Canal, string> = {
  Formulario: "bg-cala-b-bg text-cala-b-fg",
  "WhatsApp Ads": "bg-cala-wa-bg text-cala-wa-fg",
  Otro: "bg-cala-n-bg text-cala-n-fg",
};

const vgLabels: Record<string, string> = {
  [SEPTEMBER_VG]: "Jueves 17 de septiembre · 8:00 a.m. a 10:30 a.m.",
  [OCTOBER_VG]: "Jueves 1 de octubre · 8:00 a.m. a 10:30 a.m.",
};

function percentage(value: number, total: number) {
  return total === 0 ? "0%" : `${((value / total) * 100).toFixed(1)}%`;
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="mb-3 mt-6 px-0.5 text-xs font-bold uppercase tracking-wide text-cala-gray-600">
      {children}
    </h2>
  );
}

function PerformanceDashboard() {
  const [activeTab, setActiveTab] = useState<"summary" | "visits">("summary");
  const dashboard = useMemo(() => {
    const pauta = leads.filter((lead) => lead.canal !== "Otro");
    const classified = pauta.filter((lead) => lead.buyer !== "Sin clasif.");
    const scheduled = pauta.filter((lead) => lead.agendo_vg);
    const attended = pauta.filter((lead) => lead.asistio_vg);
    const channels = marketingChannels.map((name) => {
      const channelLeads = pauta.filter((lead) => lead.canal === name);
      const rows = buyers.map((buyer) => {
        const group = channelLeads.filter((lead) => lead.buyer === buyer);
        return {
          buyer,
          count: group.length,
          scheduled: group.filter((lead) => lead.agendo_vg).length,
        };
      });
      const maxCount = Math.max(...rows.map((row) => row.count), 1);
      return {
        name,
        leads: channelLeads,
        rows: rows.map((row) => ({ ...row, width: (row.count / maxCount) * 100 })),
      };
    });
    const upcoming = Object.entries(vgLabels).map(([date, label]) => ({
      date,
      label,
      leads: leads.filter((lead) => lead.fecha_vg === date),
    }));
    return { pauta, classified, scheduled, attended, channels, upcoming };
  }, []);

  const kpis = [
    {
      label: "Total leads de pauta",
      value: dashboard.pauta.length,
      note: `${dashboard.pauta.filter((lead) => lead.canal === "Formulario").length} Formulario + ${dashboard.pauta.filter((lead) => lead.canal === "WhatsApp Ads").length} WhatsApp Ads`,
      border: "border-t-cala-blue",
    },
    {
      label: "Leads clasificados",
      value: dashboard.classified.length,
      note: `${percentage(dashboard.classified.length, dashboard.pauta.length)} del total · A+B+C buyer`,
      border: "border-t-cala-purple-accent",
    },
    {
      label: "Agendaron VG",
      value: dashboard.scheduled.length,
      note: `${percentage(dashboard.scheduled.length, dashboard.pauta.length)} tasa de conversión a VG`,
      border: "border-t-cala-green",
    },
    {
      label: "Asistieron a VG",
      value: dashboard.attended.length,
      note: `${percentage(dashboard.attended.length, dashboard.scheduled.length)} de las VG agendadas`,
      border: "border-t-cala-orange",
    },
  ];

  return (
    <main className="min-h-screen bg-cala-gray-50 px-4 py-5 font-inter text-cala-gray-900 sm:px-6">
      <div className="mx-auto max-w-[1160px]">
        <header className="rounded-2xl bg-linear-135 from-cala-purple-accent to-cala-purple-dark px-5 py-6 text-primary-foreground sm:px-7">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div className="flex min-w-0 flex-wrap items-center gap-4 sm:flex-nowrap">
              <span className="shrink-0 rounded-lg bg-card px-4 py-2 text-sm font-extrabold tracking-wide text-cala-purple-dark">
                CALA
              </span>
              <div className="min-w-0">
                <h1 className="font-space text-[22px] font-bold leading-tight">
                  Performance Setiembre 2026
                </h1>
                <p className="mt-1 max-w-3xl text-xs leading-relaxed text-primary-foreground/85">
                  Fuente: Clientify CRM · Exportación 16/09/2026 · Leads de pauta Facebook
                  Ads (Formulario + WhatsApp Ads)
                </p>
                <p className="mt-1 text-[11px] font-medium text-primary-foreground/70">
                  Colegio María Alvarado · CMA-LHS
                </p>
              </div>
            </div>
            <span className="shrink-0 rounded-full bg-primary-foreground/15 px-4 py-2 text-[13px] font-semibold">
              Set 2026 (1–15)
            </span>
          </div>
        </header>

        <nav aria-label="Secciones del reporte" className="mt-5 flex gap-7 overflow-x-auto border-b border-cala-gray-200 px-1">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setActiveTab("summary")}
            className={cn(
              "h-auto rounded-none border-b-2 px-0 py-3 text-sm shadow-none hover:bg-transparent",
              activeTab === "summary"
                ? "border-cala-purple-accent text-cala-purple-accent hover:text-cala-purple-accent"
                : "border-transparent text-cala-gray-600 hover:text-cala-gray-900",
            )}
          >
            Resumen Setiembre
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setActiveTab("visits")}
            className={cn(
              "h-auto rounded-none border-b-2 px-0 py-3 text-sm shadow-none hover:bg-transparent",
              activeTab === "visits"
                ? "border-cala-purple-accent text-cala-purple-accent hover:text-cala-purple-accent"
                : "border-transparent text-cala-gray-600 hover:text-cala-gray-900",
            )}
          >
            Próximas Visitas Guiadas
          </Button>
        </nav>

        {activeTab === "summary" ? (
          <section>
            <SectionTitle>Resumen de pauta · 1–15 setiembre 2026</SectionTitle>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
              {kpis.map((kpi) => (
                <article
                  key={kpi.label}
                  className={cn(
                    "min-w-0 rounded-xl border border-cala-gray-200 border-t-[3px] bg-card px-4 py-4 sm:px-5",
                    kpi.border,
                  )}
                >
                  <p className="text-[10px] font-bold uppercase leading-snug tracking-wide text-cala-gray-600 sm:text-[11px]">
                    {kpi.label}
                  </p>
                  <p className="font-space my-1 text-[30px] font-bold leading-none sm:text-[34px]">
                    {kpi.value}
                  </p>
                  <p className="text-[11px] leading-relaxed text-cala-gray-600 sm:text-xs">
                    {kpi.note}
                  </p>
                </article>
              ))}
            </div>

            <SectionTitle>Desglose por canal</SectionTitle>
            <div className="grid gap-4 lg:grid-cols-2 lg:gap-[18px]">
              {dashboard.channels.map((channel) => {
                const scheduled = channel.leads.filter((lead) => lead.agendo_vg).length;
                const confirmed = channel.leads.filter((lead) => lead.confirmo_vg).length;
                const attended = channel.leads.filter((lead) => lead.asistio_vg).length;
                const isForm = channel.name === "Formulario";
                return (
                  <article
                    key={channel.name}
                    className={cn(
                      "rounded-[14px] border border-cala-gray-200 border-t-[3px] bg-card p-5",
                      isForm ? "border-t-cala-blue" : "border-t-cala-purple-accent",
                    )}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="flex items-center gap-2 text-[15px] font-bold">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "h-2.5 w-2.5 rounded-full",
                            isForm ? "bg-cala-blue" : "bg-cala-purple-accent",
                          )}
                        />
                        {channel.name}
                      </h3>
                      <p
                        className={cn(
                          "font-space text-2xl font-bold",
                          isForm ? "text-cala-blue" : "text-cala-purple-accent",
                        )}
                      >
                        {channel.leads.length}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {channel.rows.map((row) => (
                        <div
                          key={row.buyer}
                          className="grid grid-cols-[78px_minmax(44px,1fr)_58px_48px] items-center gap-2 text-xs sm:grid-cols-[82px_minmax(80px,1fr)_62px_52px] sm:gap-2.5"
                        >
                          <span className={cn("rounded-md px-2 py-1 text-center text-[11px] font-bold", buyerStyles[row.buyer].tag)}>
                            {row.buyer}
                          </span>
                          <div className="h-2 overflow-hidden rounded bg-cala-track">
                            <div
                              className={cn("h-full rounded", buyerStyles[row.buyer].fill)}
                              style={{ width: `${row.width}%` }}
                            />
                          </div>
                          <span className="text-right text-cala-gray-600">{row.count} leads</span>
                          <span className="text-right font-bold">{row.scheduled} VG</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 grid grid-cols-4 gap-1 rounded-[10px] bg-cala-gray-100 px-2 py-3 sm:gap-2 sm:px-3">
                      {[
                        ["Agendaron VG", scheduled],
                        ["Confirmaron", confirmed],
                        ["Asistieron", attended],
                        ["Tasa VG", percentage(scheduled, channel.leads.length)],
                      ].map(([label, value], index) => (
                        <div key={label} className="min-w-0 text-center">
                          <p className="min-h-7 text-[9px] font-bold uppercase leading-tight tracking-wide text-cala-gray-600 sm:text-[10px]">
                            {label}
                          </p>
                          <p className={cn("font-space text-base font-bold sm:text-lg", index === 3 && "text-cala-purple-accent")}>
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : (
          <section>
            <SectionTitle>Próximas visitas guiadas · leads con VG agendada</SectionTitle>
            <div className="space-y-[18px]">
              {dashboard.upcoming.map((visit) => (
                <article key={visit.date} className="overflow-hidden rounded-[14px] border border-cala-gray-200 bg-card">
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-cala-gray-100 px-4 py-3 sm:px-5">
                    <h3 className="text-sm font-bold">{visit.label}</h3>
                    <span className="font-space text-sm font-bold text-cala-purple-accent">
                      {visit.leads.length} inscritos
                    </span>
                  </div>
                  <Table className="min-w-[720px]">
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="h-10 px-5 text-[11px] font-bold uppercase text-cala-gray-600">Nombre</TableHead>
                        <TableHead className="h-10 px-5 text-[11px] font-bold uppercase text-cala-gray-600">Canal</TableHead>
                        <TableHead className="h-10 px-5 text-[11px] font-bold uppercase text-cala-gray-600">Buyer</TableHead>
                        <TableHead className="h-10 px-5 text-[11px] font-bold uppercase text-cala-gray-600">Grado de interés</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {visit.leads.map((lead) => (
                        <TableRow key={lead.id} className="hover:bg-cala-gray-50">
                          <TableCell className="px-5 py-2.5 text-[13px] font-medium">{lead.nombre}</TableCell>
                          <TableCell className="px-5 py-2.5">
                            <span className={cn("rounded-md px-2 py-1 text-[11px] font-bold", channelStyles[lead.canal])}>
                              {lead.canal}
                            </span>
                          </TableCell>
                          <TableCell className="px-5 py-2.5">
                            <span className={cn("rounded-md px-2 py-1 text-[11px] font-bold", buyerStyles[lead.buyer].tag)}>
                              {lead.buyer}
                            </span>
                          </TableCell>
                          <TableCell className="px-5 py-2.5 text-[13px] text-cala-gray-600">{lead.grado_interes}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </article>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-7 border-t border-cala-gray-200 px-0.5 py-5 text-xs text-cala-gray-600">
          <Link to="/agosto-2026" className="font-semibold text-cala-purple-accent hover:underline">
            Ver reporte de agosto 2026 →
          </Link>
        </footer>
      </div>
    </main>
  );
}