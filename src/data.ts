/**
 * CALA · Meta Ads — Performance Septiembre 2026
 * Edita estas constantes cada mes; la interfaz se actualiza sola.
 */

export const report = {
  title: "CALA · Meta Ads — Performance Septiembre 2026",
  subtitle:
    "Fuente: Clientify CRM · Exportación 30/09/2026 · Leads de pauta Facebook Ads (Formulario + WhatsApp Ads)",
  pills: ["Septiembre 2026 · Completo", "Base VG 2027-2028"],
  section1Title: "RESUMEN DE PAUTA · SEPTIEMBRE 2026 (MES COMPLETO)",
  section2Title: "DESGLOSE POR CANAL",
};

export type KpiColor = "purple" | "blue" | "green" | "orange";

export type Kpi = {
  label: string;
  value: number;
  /** Segmento en negrita dentro de la nota */
  strong: string;
  /** Resto de la nota */
  rest: string;
  color: KpiColor;
  /** Color del número grande; por defecto usa el color del borde */
  numberColor?: string;
};

export const kpis: Kpi[] = [
  {
    label: "TOTAL LEADS DE PAUTA",
    value: 226,
    strong: "226 únicos",
    rest: " · 0 duplicados detectados",
    color: "purple",
    numberColor: "#2a1a66",
  },
  {
    label: "LEADS CLASIFICADOS",
    value: 153,
    strong: "67.7%",
    rest: " del total · A+B+C buyer",
    color: "blue",
  },
  {
    label: "AGENDARON VG",
    value: 130,
    strong: "57.5%",
    rest: " vs leads · VG del 3, 10 y 17 sep",
    color: "green",
  },
  {
    label: "ASISTIERON A VG",
    value: 39,
    strong: "30.0%",
    rest: " tasa asistencia · 79 confirmaron · 7 iniciaron PA",
    color: "orange",
  },
];

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
  strip: Array<{ label: string; value: string }>;
};

export const channels: Channel[] = [
  {
    name: "Formulario",
    total: 93,
    rows: [
      { buyer: "Abuyer", key: "A", leads: 17, vg: 9 },
      { buyer: "Bbuyer", key: "B", leads: 35, vg: 5 },
      { buyer: "Cbuyer", key: "C", leads: 41, vg: 10 },
    ],
    strip: [
      { label: "AGENDARON VG", value: "24" },
      { label: "CONFIRMARON", value: "2" },
      { label: "ASISTIERON", value: "0" },
      { label: "TASA VG", value: "25.8%" },
    ],
  },
  {
    name: "WhatsApp Ads",
    total: 133,
    rows: [
      { buyer: "Abuyer", key: "A", leads: 22, vg: 4 },
      { buyer: "Bbuyer", key: "B", leads: 27, vg: 1 },
      { buyer: "Cbuyer", key: "C", leads: 11, vg: 0 },
      { buyer: "Sin clasif.", key: "S", leads: 73, vg: 0 },
    ],
    strip: [
      { label: "AGENDARON VG", value: "5" },
      { label: "CONFIRMARON", value: "2" },
      { label: "ASISTIERON", value: "1" },
      { label: "TASA VG", value: "3.8%" },
    ],
  },
];

/** La barra más larga corresponde al valor más alto entre ambos canales. */
export const maxLeads = Math.max(
  ...channels.flatMap((channel) => channel.rows.map((row) => row.leads)),
);

export const footnote =
  "Notas: «Agendaron / Confirmaron / Asistieron» del resumen son el total del mes según la base de VG (personas únicas, VG de septiembre), sin cruce persona por persona. En el desglose por canal, «Agendaron VG» son leads de septiembre con la etiqueta «sí se inscribió a visita guiada»; confirmaron y asistieron se cruzan por teléfono con la base de VG. 29 leads de pauta en estado «cliente» no se excluyeron.";
