# Angra Ocean morning brief — news scope

Use this when building or refreshing `data/news.json` for the daily morning brief.

## Geography (expanded)

Keep a **Brazil coastal / ocean** focus. Prefer **SE Brazil**, especially:

- RJ, SP, ES, PR, SC ocean and coast when relevant to diving, marine life, pollution, or conservation
- Guanabara Bay, Sepetiba, Ilha Grande Bay, Santos/São Vicente estuary, Ubatuba–Caraguá–Ilhabela–São Sebastião corridor
- Nearby Costa Verde (Angra, Paraty, Mangaratiba) and Lagos (Arraial, Cabo Frio, Búzios)

**Do not** require every story to name Rio–Ilhabela. Broader SE coast stories that affect the same waters, fauna, or dive community are in scope.

National marine policy that **affects these waters** is in scope: IBAMA, ICMBio, Marinha, CONAMA, MPAs, fishing bans/defesos, oil & gas offshore SE basins (Campos, Santos, etc.).

## Topics

Whales, dolphins (incl. boto-cinza), sea turtles, sharks, coral, mangroves, plastic, oil spills/sheens, sewage outfalls, beach water quality (CETESB/INEA), scuba/freediving/spearfishing/visibility/shipwrecks, marine research institutes (USP, UFF, UFRJ, Unesp, UERJ, Instituto Bioma, Projeto Baleia Jubarte, Argonauta, Aruanã, Costão Rochoso, etc.), climate/ocean extremes on the coast (storm surge, erosion, red tide, sargassum if Brazil).

## Time window

Last **~4 months** OK; **prioritize last 6–8 weeks**. Brazilian and international sources with a clear Brazil coastal angle.

## Exclusions

- Pure inland Amazon (unless clearly coastal/marine)
- Unrelated politics
- Generic world ocean with no Brazil link
- Invented or unverifiable articles — every item needs a real URL

## Volume targets

Aim for roughly **20–30 good** and **12–20 bad** when sources support it. Quality over spam; no duplicates; newest-first by `date` (YYYY-MM-DD).

## Item schema

Each item: `id`, `title`, `summary`, `source`, `url`, `date`, `location`, `tags`.  
Ask Grok / dig-deeper text is generated in `app.js` from title/location/source/url/summary — keep summaries dive/ocean-useful.

## Classification

- **Good**: conservation wins, cleanups, sanitation that keeps sewage/trash out of the sea, wildlife recovery/sightings, responsible tourism rules, research that helps management, successful rescues.
- **Bad**: oil/sewage pollution, unfit bathing water, illegal fishing, strandings/deaths with public-health or gear risk, enforcement failures, chronic outfall pressure.

Update `region` in `news.json` to reflect the expanded SE Brazil coast brief while keeping Angra Ocean identity. Bump `CACHE_BUST` in `app.js`, `index.html`, and `banho.html` when shipping.
