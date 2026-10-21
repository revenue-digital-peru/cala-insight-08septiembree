/**
 * CALA · Meta Ads — Performance Octubre 2026
 * Edita estas constantes en cada corte; la interfaz se actualiza sola.
 * Los porcentajes (% del total, tasa VG, tasa de asistencia, ancho de barras)
 * se calculan a partir de estos valores en la página.
 */

export const report = {
  title: "CALA · Meta Ads — Performance Octubre 2026",
  subtitle:
    "Fuente: Clientify CRM · Leads de pauta Facebook Ads (Formulario + WhatsApp Ads)",
  pills: ["Octubre 2026 · Al 20 oct", "Base VG 2027-2028"],
  section1Title: "RESUMEN DE PAUTA · OCTUBRE 2026 (1 AL 20 DE OCTUBRE)",
  section2Title: "DESGLOSE POR CANAL",
  section2Tag: "· ESTIMADO",
};

/** Totales reales del corte (1 al 20 de octubre). */
export const totals = {
  leads: 204,
  clasificados: 126,
  agendaron: 59,
  asistieron: 23,
  confirmaron: 36,
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
    total: 26,
    rows: [
      { buyer: "Abuyer", key: "A", leads: 5, vg: 2 },
      { buyer: "Bbuyer", key: "B", leads: 10, vg: 1 },
      { buyer: "Cbuyer", key: "C", leads: 11, vg: 4 },
    ],
    stats: { agendaron: 7, confirmaron: 5, asistieron: 2 },
  },
  {
    name: "WhatsApp Ads",
    total: 178,
    rows: [
      { buyer: "Abuyer", key: "A", leads: 36, vg: 27 },
      { buyer: "Bbuyer", key: "B", leads: 46, vg: 18 },
      { buyer: "Cbuyer", key: "C", leads: 18, vg: 7 },
      { buyer: "Sin clasif.", key: "S", leads: 78, vg: 0 },
    ],
    stats: { agendaron: 52, confirmaron: 31, asistieron: 21 },
  },
];

export const footnote =
  "Notas: Corte parcial del 1 al 20 de octubre. «Tasa de asistencia» = asistieron / agendaron VG. El desglose por canal es una estimación: reparte los totales reales del corte (204 leads, 126 clasificados, 59 agendaron, 23 asistieron) según la distribución por buyer y canal del corte al 13 de octubre. Los 36 confirmados también son estimados (61% de confirmación de septiembre). Reemplazar con la data de Clientify al cierre del corte.";
