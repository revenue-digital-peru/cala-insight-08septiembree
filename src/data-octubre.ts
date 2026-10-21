/**
 * CALA · Meta Ads — Performance Octubre 2026
 * Edita estas constantes cada mes; la interfaz se actualiza sola.
 * Los porcentajes (% del total, tasa VG, ancho de barras) se calculan
 * a partir de estos valores en la página.
 */

export const report = {
  title: "CALA · Meta Ads — Performance Octubre 2026",
  subtitle:
    "Fuente: Clientify CRM · Leads de pauta Facebook Ads (Formulario + WhatsApp Ads)",
  pills: ["Octubre 2026 · Al 13 oct", "Base VG 2027-2028"],
  section1Title: "RESUMEN DE PAUTA · OCTUBRE 2026 (1 AL 13 DE OCTUBRE)",
  section2Title: "DESGLOSE POR CANAL",
  section2Tag: "· ESTIMADO",
};

/** Totales reales del corte (1 al 13 de octubre). */
export const totals = {
  leads: 149,
  clasificados: 109,
  agendaron: 45,
  asistieron: 12,
  confirmaron: 27,
};

export type BuyerKey = "A" | "B" | "C" | "S";
export type BuyerName = "Abuyer" | "Bbuyer" | "Cbuyer" | "Sin clasif.";

export type BuyerRow = {
  buyer: BuyerName;
  key: BuyerKey;
  leads: number;
  vg: number;
};

export type ChannelName = "Formulario" | "WhatsApp Ads";

export type Channel = {
  name: ChannelName;
  total: number;
  rows: BuyerRow[];
  stats: { agendaron: number; confirmaron: number; asistieron: number };
};

export const channels: Channel[] = [
  {
    name: "Formulario",
    total: 21,
    rows: [
      { buyer: "Abuyer", key: "A", leads: 4, vg: 2 },
      { buyer: "Bbuyer", key: "B", leads: 8, vg: 1 },
      { buyer: "Cbuyer", key: "C", leads: 9, vg: 3 },
    ],
    stats: { agendaron: 6, confirmaron: 4, asistieron: 1 },
  },
  {
    name: "WhatsApp Ads",
    total: 128,
    rows: [
      { buyer: "Abuyer", key: "A", leads: 32, vg: 20 },
      { buyer: "Bbuyer", key: "B", leads: 40, vg: 14 },
      { buyer: "Cbuyer", key: "C", leads: 16, vg: 5 },
      { buyer: "Sin clasif.", key: "S", leads: 40, vg: 0 },
    ],
    stats: { agendaron: 39, confirmaron: 23, asistieron: 11 },
  },
];

export const footnote =
  "Notas: Corte parcial del 1 al 13 de octubre. «Tasa de asistencia» = asistieron / agendaron VG. El desglose por canal es una estimación: reparte los totales reales del corte (149 leads, 109 clasificados, 45 agendaron, 12 asistieron) según la distribución por buyer y canal de septiembre. Los 27 confirmados también son estimados (61% de confirmación de septiembre). Reemplazar con la data de Clientify al cierre del corte.";
