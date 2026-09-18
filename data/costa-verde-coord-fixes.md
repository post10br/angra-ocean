# Costa Verde coordinate fixes

Updated **38** of **38** Angra/Paraty/Mangaratiba beaches (lat/lon only).
Added **14** Niterói beaches.

## Method
- Primary: OpenStreetMap Nominatim (+ Overpass beach inventory) with User-Agent `AngraOcean/1.0 (beach-map-correction)`.
- Bounds check: lat −23.45…−22.85, lon −44.85…−43.80 (Costa Verde); Niterói separately.
- Prefer `natural=beach`; reject inland city centres when a beach hit exists.

## Beach-by-beach (old → new)

| Beach | Municipality | Old | New | Δ km | Source | Uncertain |
|---|---|---|---|---|---|---|
| Vermelha (Angra) (`angra-vermelha`) | Angra dos Reis | -23.16, -44.28 | -23.02459, -44.49855 | 28.54 | Nominatim: Praia Vermelha Mambucaba (natural/beach) |  |
| São Gonçalo (`paraty-sao-goncalo`) | Paraty | -23.27, -44.68 | -23.038, -44.612 | 26.84 | São Gonçalo suburb Tarituba (-23.033,-44.618) coastal refine | ⚠️ yes |
| Garatucaia (`angra-garatucaia`) | Angra dos Reis | -23.04, -44.4 | -23.03524, -44.17493 | 24.99 | Nominatim: Praia de Garatucaia (natural/beach) |  |
| Biscaia (`angra-biscaia`) | Angra dos Reis | -23.045, -44.365 | -23.042, -44.195 | 18.87 | Ponta Leste / Monsuaba corridor; Av. A. Bertholdo (Ponta Leste suburb -23.055,-44.237) | ⚠️ yes |
| Brava (`angra-brava`) | Angra dos Reis | -23.055, -44.355 | -23.00728, -44.48252 | 15.11 | Nominatim: Praia Brava Mambucaba mainland (natural/beach) |  |
| Grande (`manga-grande`) | Mangaratiba | -22.96, -44.04 | -22.94739, -43.90597 | 14.94 | Nominatim: Praia Grande Itacurussá (natural/beach) |  |
| Conceição de Jacareí (`manga-conceicao`) | Mangaratiba | -22.98, -44.05 | -23.03268, -44.1629 | 13.83 | Nominatim: Praia de Conceição de Jacareí (natural/beach) |  |
| Paraty-Mirim (`paraty-mirim`) | Paraty | -23.25, -44.75 | -23.245, -44.64 | 12.22 | Paraty-Mirim village beach (OSM village/beach ~-23.24,-44.63) |  |
| Itinga (`angra-itinga`) | Angra dos Reis | -22.99, -44.295 | -22.95278, -44.38649 | 10.96 | Nominatim: Praia do Itinga (natural/beach) |  |
| Laboratório (`angra-laboratorio`) | Angra dos Reis | -23.035, -44.35 | -23.00984, -44.44492 | 10.90 | Nominatim: Praia do Laboratório (natural/beach) |  |
| Gordas (`angra-gordas`) | Angra dos Reis | -22.97, -44.28 | -23.0255, -44.3505 | 9.96 | Av. Vereador Benedito Adelino coastal corridor (street geocode + shore) | ⚠️ yes |
| Praia Grande de Corumbê (`paraty-grande-corumbe`) | Paraty | -23.24, -44.7 | -23.158, -44.701 | 9.10 | Corumbê/Praia Grande corridor (~5.5km N of Paraty centro) | ⚠️ yes |
| Praia Grande (`paraty-grande`) | Paraty | -23.23, -44.71 | -23.1522, -44.69758 | 8.75 | Nominatim: Praia Grande Paraty north of center (natural/beach) |  |
| Praia Grande (`angra-praia-grande`) | Angra dos Reis | -23.0065, -44.3145 | -23.044, -44.3728 | 7.69 | Nominatim: Praia Grande Angra (natural/beach) |  |
| Éguas (`angra-eguas`) | Angra dos Reis | -22.98, -44.29 | -23.01, -44.228 | 7.65 | Near Monsuaba (visite.angra); coastal refine | ⚠️ yes |
| Cepilho (`paraty-cepilho`) | Paraty | -23.28, -44.72 | -23.34451, -44.71457 | 7.19 | Nominatim: Praia do Cepilho Trindade (natural/beach) |  |
| Pontal (`angra-pontal`) | Angra dos Reis | -23.01, -44.32 | -22.95247, -44.33233 | 6.53 | Nominatim: Prainha do Pontal Cunhambebe (natural/beach) |  |
| Frade (`angra-frade`) | Angra dos Reis | -23.02, -44.42 | -22.9648, -44.4356 | 6.37 | Nominatim/OSM: Praia do Frade Vila Frade de Cima (natural/beach) |  |
| Tarituba (`paraty-tarituba`) | Paraty | -23.1, -44.6 | -23.04593, -44.5941 | 6.04 | Nominatim/Mapcarta: Praia de Tarituba (natural/beach) |  |
| Leste (`angra-leste`) | Angra dos Reis | -23.15, -44.23 | -23.1791, -44.27291 | 5.75 | Nominatim: Praia do Leste Ilha Grande (natural/beach) |  |
| Retiro (`angra-retiro`) | Angra dos Reis | -23.03, -44.36 | -22.99409, -44.32636 | 5.46 | Nominatim: Praia do Retiro (natural/beach) |  |
| Saco (`manga-saco`) | Mangaratiba | -22.95, -44.0 | -22.94679, -44.04141 | 4.61 | Nominatim: Praia do Saco (natural/beach) |  |
| Jacuecanga (`angra-jacuecanga`) | Angra dos Reis | -22.96, -44.27 | -22.9945, -44.248 | 4.54 | Coastal Jacuecanga near Camorim/BR-101 (suburb + shore refine) | ⚠️ yes |
| Figueira (`angra-figueira`) | Angra dos Reis | -23.07, -44.38 | -23.035, -44.365 | 4.23 | Near Praia Grande Contorno; Laje da Figueira locality -23.017,-44.367 | ⚠️ yes |
| Bexiga (`angra-bexiga`) | Angra dos Reis | -22.995, -44.305 | -22.997, -44.268 | 4.11 | Near Camorim access (visite.angra); coastal refine | ⚠️ yes |
| Itacuruça (`manga-itacuruca`) | Mangaratiba | -22.94, -43.88 | -22.932, -43.91 | 3.45 | Itacurussá mainland waterfront (admin -22.928,-43.908 + Praia da Guarda) |  |
| Prainha de Mambucaba (`paraty-prainha-mambucaba`) | Paraty | -23.04, -44.54 | -23.04642, -44.56855 | 3.25 | Nominatim: Prainha de Mambucaba (natural/beach) |  |
| Enseada (`angra-enseada`) | Angra dos Reis | -23.0, -44.3 | -22.98347, -44.31535 | 2.50 | Nominatim: Praia da Enseada/Verônica (natural/beach) |  |
| Costeirinha (`angra-costeirinha`) | Angra dos Reis | -23.025, -44.34 | -23.01482, -44.32187 | 2.31 | Nominatim: Praia da Costeirinha (natural/beach) |  |
| Ibicuí (`manga-ibicui`) | Mangaratiba | -22.97, -44.02 | -22.96272, -44.02734 | 1.15 | Nominatim: Praia de Ibicuí (natural/beach) |  |
| Anil (`angra-anil`) | Angra dos Reis | -23.012, -44.318 | -23.00607, -44.30994 | 1.11 | Nominatim: Praia do Anil (natural/beach) |  |
| Mambucaba (`angra-mambucaba`) | Angra dos Reis | -23.025, -44.525 | -23.02633, -44.51747 | 0.85 | Nominatim: Praia Vila Histórica de Mambucaba (natural/beach) |  |
| Praia do Meio (Trindade) (`paraty-meio-trindade`) | Paraty | -23.35, -44.72 | -23.35356, -44.72641 | 0.81 | Nominatim: Praia do Meio Trindade (natural/beach) |  |
| Pontal (`paraty-pontal`) | Paraty | -23.22, -44.715 | -23.21512, -44.71148 | 0.67 | Nominatim: Praia do Pontal Paraty (natural/beach) |  |
| Bonfim (`angra-bonfim`) | Angra dos Reis | -23.018, -44.328 | -23.02085, -44.33274 | 0.61 | Nominatim: Praia do Bonfim (natural/beach) |  |
| Muriqui (`manga-muriqui`) | Mangaratiba | -22.93, -43.95 | -22.92811, -43.94528 | 0.56 | Nominatim: Praia de Muriqui (natural/beach) |  |
| Jabaquara (`paraty-jabaquara`) | Paraty | -23.205, -44.715 | -23.20655, -44.71779 | 0.35 | Nominatim: Praia Jabaquara (natural/beach) |  |
| Mangaratiba (`manga-centro`) | Mangaratiba | -22.96, -44.0405 | -22.959, -44.0415 | 0.16 | Mangaratiba centro waterfront (near Praia do Saco) |  |

## Worst offenders (largest moves)

- **Vermelha (Angra)**: (-23.16, -44.28) → (-23.02459, -44.49855) (28.5 km) — Nominatim: Praia Vermelha Mambucaba (natural/beach)
- **São Gonçalo**: (-23.27, -44.68) → (-23.038, -44.612) (26.8 km) — São Gonçalo suburb Tarituba (-23.033,-44.618) coastal refine
- **Garatucaia**: (-23.04, -44.4) → (-23.03524, -44.17493) (25.0 km) — Nominatim: Praia de Garatucaia (natural/beach)
- **Biscaia**: (-23.045, -44.365) → (-23.042, -44.195) (18.9 km) — Ponta Leste / Monsuaba corridor; Av. A. Bertholdo (Ponta Leste suburb -23.055,-44.237)
- **Brava**: (-23.055, -44.355) → (-23.00728, -44.48252) (15.1 km) — Nominatim: Praia Brava Mambucaba mainland (natural/beach)
- **Grande**: (-22.96, -44.04) → (-22.94739, -43.90597) (14.9 km) — Nominatim: Praia Grande Itacurussá (natural/beach)
- **Conceição de Jacareí**: (-22.98, -44.05) → (-23.03268, -44.1629) (13.8 km) — Nominatim: Praia de Conceição de Jacareí (natural/beach)
- **Paraty-Mirim**: (-23.25, -44.75) → (-23.245, -44.64) (12.2 km) — Paraty-Mirim village beach (OSM village/beach ~-23.24,-44.63)

## Sanity anchors

- Frade: now -22.9648, -44.4356 (OSM Praia do Frade; was −23.02, −44.42)
- Tarituba: now -23.04593, -44.5941 (was −23.1, −44.6)
- Mambucaba: -23.02633, -44.51747
- Jabaquara: -23.20655, -44.71779
- Itacuruçá: -22.932, -43.91
- Muriqui: -22.92811, -43.94528

## Uncertain (neighborhood coastal refine — no exact OSM beach name)

- Bexiga (Angra dos Reis): (-22.997, -44.268) — Near Camorim access (visite.angra); coastal refine
- Gordas (Angra dos Reis): (-23.0255, -44.3505) — Av. Vereador Benedito Adelino coastal corridor (street geocode + shore)
- Jacuecanga (Angra dos Reis): (-22.9945, -44.248) — Coastal Jacuecanga near Camorim/BR-101 (suburb + shore refine)
- Éguas (Angra dos Reis): (-23.01, -44.228) — Near Monsuaba (visite.angra); coastal refine
- Praia Grande de Corumbê (Paraty): (-23.158, -44.701) — Corumbê/Praia Grande corridor (~5.5km N of Paraty centro)
- Biscaia (Angra dos Reis): (-23.042, -44.195) — Ponta Leste / Monsuaba corridor; Av. A. Bertholdo (Ponta Leste suburb -23.055,-44.237)
- Figueira (Angra dos Reis): (-23.035, -44.365) — Near Praia Grande Contorno; Laje da Figueira locality -23.017,-44.367
- São Gonçalo (Paraty): (-23.038, -44.612) — São Gonçalo suburb Tarituba (-23.033,-44.618) coastal refine

## Niterói beaches added

| Beach | Status | lat, lon | Source |
|---|---|---|---|
| Icaraí | Imprópria (0/4 points) | -22.90902, -43.11144 | Nominatim beach + toemcasa/INEA 14/09/2026 |
| Piratininga | Própria (4/4 points) | -22.95534, -43.08093 | Nominatim beach + toemcasa/INEA 14/09/2026 |
| Charitas | Imprópria (0/3 points) | -22.92916, -43.09743 | Nominatim beach + toemcasa/INEA 14/09/2026 |
| São Francisco | Imprópria (0/3 points) | -22.91801, -43.09485 | Nominatim beach + toemcasa/INEA 14/09/2026 |
| Camboinhas | Própria (2/2 points) | -22.96309, -43.05293 | Nominatim beach + toemcasa/INEA 14/09/2026 |
| Flechas | Imprópria (0/2 points) | -22.90546, -43.12156 | Nominatim beach + toemcasa/INEA 14/09/2026 |
| Itacoatiara | Parcial (1/2 points) | -22.97486, -43.03196 | Nominatim beach + toemcasa/INEA 14/09/2026 |
| Itaipu | Imprópria (0/2 points) | -22.97075, -43.04583 | Nominatim beach + toemcasa/INEA 14/09/2026 |
| Jurujuba | Imprópria (0/2 points) | -22.92673, -43.1191 | Nominatim beach + toemcasa/INEA 14/09/2026 |
| Adão | Imprópria (0/1 points) | -22.92757, -43.12276 | Nominatim beach + toemcasa/INEA 14/09/2026 |
| Boa Viagem | Imprópria (0/1 points) | -22.90858, -43.13016 | Nominatim beach + toemcasa/INEA 14/09/2026 |
| Eva | Imprópria (0/1 points) | -22.92966, -43.12264 | Nominatim beach + toemcasa/INEA 14/09/2026 |
| Gragoatá | Imprópria (0/1 points) | -22.90214, -43.1361 | Nominatim beach + toemcasa/INEA 14/09/2026 |
| Sossego | Própria (1/1 points) | -22.95812, -43.06989 | Nominatim beach + toemcasa/INEA 14/09/2026 |

## Notes
- Frade OSM beach (−22.965, −44.436) is the named Praia do Frade west of downtown; the prior pin (−23.02, −44.42) was inland of the Frade coast corridor.
- Brava uses mainland Praia Brava (Mambucaba), not Ilha Grande Praia Brava.
- Vermelha uses Praia Vermelha (Mambucaba), the monitored Angra mainland point.
- Paraty Praia Grande uses the Corumbê-north beach (−23.152, −44.698), not Cajaíba.

