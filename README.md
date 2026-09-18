# Angra Ocean

Minimal static site for a daily Brazil-coast ocean brief covering **Rio de Janeiro ↔ Ilhabela**.

Content lives in JSON files so daily updates never touch the HTML/CSS/JS.

## Layout

```
angra-ocean/
├── index.html           # Single-page shell (4 tabs)
├── styles.css           # Calm ocean aesthetic
├── app.js               # Tabs + news/swim/groups loaders + Ask Grok links
├── data/
│   ├── news.json        # Daily good/bad brief (edit this)
│   ├── swim-safety.json # CETESB Litoral Norte swim bulletin
│   └── groups.json      # Ranked conservation groups (stub until researched)
└── README.md
```

## Preview locally

From this directory:

```bash
cd /workspace/angra-ocean
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/` in a browser.  
(Fetching JSON needs a local server; opening `index.html` as a `file://` URL may be blocked by the browser.)

## Daily update

1. Edit **`data/news.json`** for the good/bad brief.
2. Set `date` to the brief day as `YYYY-MM-DD` (America/Sao_Paulo).
3. Set `updatedAt` to an ISO-8601 timestamp (prefer `-03:00` offset).
4. Replace the `good` and `bad` arrays with real items.
5. Remove example entries (or drop `"example": true` / `[Example]` title prefixes).
6. When CETESB publishes a new bulletin, refresh **`data/swim-safety.json`** (`bulletinDate`, `nextUpdate`, `beaches`).
7. When conservation rankings are ready, fill **`data/groups.json`** (`groups` array). Leave `[]` for the empty state.

### News item shape

```json
{
  "id": "unique-slug",
  "title": "Headline",
  "summary": "Two to four sentences.",
  "source": "Publisher name",
  "url": "https://…",
  "location": "Ilhabela",
  "tags": ["visibility"],
  "example": false
}
```

- `location` and `tags` are optional.
- `example: true` (or a title starting with `[Example]`) shows an “Example” badge and dashed card border.
- Each card includes an **Ask Grok** dig-deeper link (opens grok.com with a scuba/spearfishing/freediving prompt).

### Swim safety

`data/swim-safety.json` mirrors CETESB CONAMA 274/2000 classifications for monitored Litoral Norte points:

- `unsafe` (red) = Imprópria
- `caution` (orange) = Satisfatória (when present)
- `safe` (green) = Própria (modest set only when confirmed)

Confirm day-of status on the [CETESB weekly bulletin](https://cetesb.sp.gov.br/praias/boletim-semanal/) or [interactive map](https://arcgis.cetesb.sp.gov.br/portal/apps/experiencebuilder/experience/?id=bdd0cbd4bf094df9a000bf663254c21f&page=Classifica%C3%A7%C3%A3o-Atual).

### Groups (Conservation)

`data/groups.json` powers the **Groups** tab — a ranked table of ocean / coastal conservation organizations relevant to Rio ↔ Ilhabela.

```json
{
  "updatedAt": "2026-09-18T07:12:00-03:00",
  "region": "Rio de Janeiro – Ilhabela",
  "methodNote": "How ranking was chosen…",
  "groups": [
    {
      "rank": 1,
      "organization": "Org name",
      "focus": "Short focus label",
      "why": "Why this group ranks here / summary",
      "region": "Ilhabela",
      "url": "https://…",
      "linkLabel": "Website"
    }
  ]
}
```

- Prefer real, verified NGOs only — do not invent names.
- `why` (or `summary`) appears in the **Why / summary** column.
- Leave `groups: []` to show the polished empty state; keep `methodNote` so the ranking method stays visible.

### Empty days

Leave `good`, `bad`, or `groups` as `[]`. The UI shows a polished empty state for that tab.

## Redeploy

This is a static folder. Copy or sync the whole `angra-ocean/` tree to any static host (nginx, S3/CloudFront, GitHub Pages, Netlify, etc.).

Typical flow:

1. Update `data/news.json`, `data/swim-safety.json`, and/or `data/groups.json`.
2. Sync/upload the directory (or only changed data files if assets are unchanged).
3. Hard-refresh or purge CDN cache if the host caches JSON aggressively.  
   `app.js` already requests JSON with `cache: "no-store"`.

No build step. No public deploy URL is defined in this repo.

## Design notes

- Deep blues, soft cream/sand accents, serif headlines + sans body.
- Four tabs: **Good news** | **Bad news** | **Swim safety** | **Groups**, with keyboard arrow support.
- Status dots (red / orange / green) on the swim table; ranked conservation table on Groups; shell ~860px for tables.
- Mobile-friendly (2×2 tab wrap), generous whitespace, subtle panel fade on tab switch.
