# CALA Insights (36)

Crea un dashboard de performance de marketing para "CALA - Reporte de Performance Agosto 2026" con este diseño y esta data:

LOGO Y HEADER:
- Header con gradiente morado oscuro (120deg, de #2a1a5e a #4c2f9e a #6d3fd6), texto blanco
- A la izquierda: logo de CALA_ED en un recuadro blanco redondeado de 56x56px (voy a subir el archivo del logo)
- Título "CALA - Reporte de Performance Agosto 2026"
- Subtítulo: "Fuente: Clientify CRM (exportación 26/08/2026) cruzado con Base de datos VG 2027/2028 oficial — solo registros de agosto"
- 2 badges a la derecha/debajo: "Datos hasta 25/08" y "100% Validado"

TIPOGRAFÍA: Space Grotesk para títulos y números, Inter para el resto

SECCIÓN "Resumen de agosto 2026" — 5 tarjetas KPI en fila (cada una con borde superior de color distinto: morado, azul, verde, naranja, rosa/magenta):
1. Total leads (pauta): 144 — "Formulario + WhatsApp Ads · generados en agosto"
2. Leads clasificados: 103 — "71.5% del total · A+B+C buyer"
3. Agendaron VG: 169 — "Base VG oficial · Fecha VG en agosto"
4. Asistieron VG: 29 — "17.2% de las agendadas"
5. Pagos de Admisión (PA): 10 — "5.9% de las agendadas · +2 'Después de VG'"

SECCIÓN "Desglose por canal" — 2 tarjetas lado a lado:

Tarjeta Formulario (azul, total 52 leads):
- Barras horizontales: Abuyer 12 (23%), Bbuyer 21 (40%), Cbuyer 19 (37%), Sin clasificar 0 (0%)
- Footer con 3 métricas: Confirmaron 15, Asistieron 7, PA 2
- Nota pequeña debajo del footer: "+1 'Después de VG' no incluido en el PA"

Tarjeta WhatsApp Ads (morado, total 92 leads):
- Barras horizontales: Abuyer 18 (20%), Bbuyer 22 (24%), Cbuyer 11 (12%), Sin clasificar 41 (45%)
- Footer con 3 métricas: Confirmaron 16, Asistieron 2, PA 0
- Nota pequeña debajo del footer: "0 casos 'Después de VG'"

Colores de las barras: Abuyer verde (#16a34a), Bbuyer azul (#2563eb), Cbuyer naranja (#ea580c), Sin clasificar gris (#9c9cb0)

Usa React + Tailwind. Todo es data estática ya validada, sin necesidad de backend ni tiempo real.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://cala-insight-08septiembree.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ef0a81a2-d31e-43dc-87b6-aa7206cb127e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
