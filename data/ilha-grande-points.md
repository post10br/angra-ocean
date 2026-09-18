# Ilha Grande — INEA balneabilidade points (research)

**Date researched:** 2026-09-18 (BRT)  
**Question:** Which INEA measuring points exist on Ilha Grande for the Angra Ocean swim map?

## Finding (current weekly bulletin)

**None of the currently published weekly INEA Angra dos Reis points are on Ilha Grande.**

Sources checked (2026-09):

| Source | Result |
|--------|--------|
| [toemcasa Angra balneabilidade](https://toemcasa.com.br/balneabilidade/angra-dos-reis-rj/) (INEA aggregator, bulletin **14/09/2026**) | **21 praias / 22 pontos** — all mainland Angra names (Praia Grande, Anil, Bexiga, Biscaia, Bonfim, Brava, Costeirinha, Éguas, Enseada, Figueira, Frade, Garatucaia, Gordas, Itinga, Jacuecanga, Laboratório, **Leste**, Mambucaba, Pontal, Retiro, Vermelha). |
| toemcasa `/abraão/` | Soft 404 → national index (no Abraão beach page / no INEA points). |
| INEA site / news (Yuri Moura reports, Extra/O Diário do Rio) | Last dedicated **Ilha Grande** balneabilidade bulletin cited as **May 2015**; Abraão’s two points were **Imprópria** then. Monitoring of island beaches was **not resumed** in weekly Costa Verde lists through 2024–2026 reporting. |
| G1 (03/05/2016) on INEA boletim 25/04/2016 | Historical island list (see below). |
| INEA PDF histórico Angra (point codes) | **Leste LT0000** = “Em frente a Av. Vereador Benedito Adelino, n° 2386” → **Contorno mainland**, not Praia do Leste (Ilha Grande). |

### Abraão status

**Abraão (Vila do Abraão / Praia do Abraão) is NOT on INEA’s current weekly list.**  
No live Própria / Parcial / Imprópria status was invented for the map. Do not treat tourism or sewage news as a substitute for an INEA bulletin.

## Historical Ilha Grande points (last public weekly-style lists ~2015–2016)

From G1 summary of INEA Costa Verde boletim **25/04/2016**:

| Beach | Then status | Notes |
|-------|-------------|-------|
| **Abraão** | Imprópria | Also reported as two Abraão points Imprópria in May 2015 |
| **Araçatiba** | Própria | West/NW side of the island |
| **Provetá** | Própria | SW community |
| **Saco do Céu** | Própria | Near Lagoa Azul / Enseada das Estrelas corridor |

These four are **not** present in the 2026-09-14 weekly Angra list, so they were **not** added to `swim-safety.json` as live pins.

## Geocodes (Nominatim `User-Agent: AngraOcean/1.0`, ~1s delay) + sanity anchors

Used for documentation / future restore if INEA resumes monitoring. Live map currently has **zero** Ilha Grande INEA pins after correcting Leste.

| Place | Role | lat | lon | Source |
|-------|------|-----|-----|--------|
| Praia do Abraão | Historic INEA; popular hub | -23.13894 | -44.16871 | Nominatim beach (anchor ≈ -23.141, -44.168) |
| Vila do Abraão | Village centroid | -23.14135 | -44.16747 | Nominatim |
| Araçatiba (Praia de Araçatiba) | Historic INEA | -23.15366 | -44.32406 | Nominatim village |
| Provetá (praia) | Historic INEA | -23.18171 | -44.34111 | Nominatim beach |
| Saco do Céu | Historic INEA | -23.10863 | -44.21841 | Nominatim village (anchor Lagoa Azul ≈ -23.105, -44.220) |
| Lopes Mendes | Popular — **not in weekly INEA** | -23.17267 | -44.12571 | Nominatim beach (anchor ≈ -23.164, -44.126) |
| Dois Rios | Popular — **not monitored** | -23.18216 | -44.19013 | Nominatim hamlet (anchor ≈ -23.182, -44.191) |
| Praia de Palmas | Popular — **not monitored** | -23.147 | -44.134 | Task sanity anchor (Nominatim restaurant nearby -23.14585, -44.13896) |
| Praia Preta | Popular — **not monitored** | -23.13178 | -44.16986 | Nominatim beach (anchor ≈ -23.136, -44.158) |
| Mangues | Popular — **not monitored** | -23.128 | -44.195 | Task sanity anchor (Nominatim miss) |
| Bananal | Popular — **not monitored** | -23.10734 | -44.24912 | Nominatim beach (anchor ≈ -23.116, -44.256) |
| Aventureiro | Popular — **not monitored** | -23.18775 | -44.31852 | Nominatim beach (anchor ≈ -23.185, -44.312) |
| Lagoa Azul | Popular — **not monitored** | -23.08314 | -44.22913 | Nominatim attraction |
| Praia do Leste (island) | **Not an INEA weekly point** | -23.17910 | -44.27291 | Nominatim beach (was wrongly used for `angra-leste`) |

### Corrected live pin (mainland)

| id | name | lat | lon | INEA address |
|----|------|-----|-----|--------------|
| `angra-leste` | Leste (Contorno) | -23.02502 | -44.34960 | Em frente a Av. Vereador Benedito Adelino, n° 2386 (shore near Contorno; was previously misplaced on Ilha Grande Praia do Leste) |

Status on 14/09/2026 bulletin: **Própria** (1/1).

## Popular beaches **NOT** in current INEA weekly lists

Explicit gaps (no pin / no invented status):

- Abraão / Vila do Abraão  
- Lopes Mendes  
- Dois Rios  
- Palmas  
- Praia Preta  
- Mangues  
- Bananal  
- Aventureiro  
- Lagoa Azul / Saco do Céu (historically monitored; **not** in 2026 weekly list)  
- Araçatiba, Provetá (historically monitored; **not** in 2026 weekly list)  
- Praia do Leste (island) — distinct from mainland Contorno “Leste”

## Site actions taken

1. Corrected `angra-leste` coordinates + renamed to **Leste (Contorno)** so the only former island pin is no longer falsely on Ilha Grande.  
2. Updated `swim-safety.json` `note` to state Ilha Grande is absent from the weekly INEA Angra list.  
3. Did **not** add fake Abraão / Lopes Mendes / etc. rows.  
4. Cache bust bumped to `20260918j`.

## Live URLs

- https://post10br.github.io/angra-ocean/  
- https://post10br.github.io/angra-ocean/banho.html  
