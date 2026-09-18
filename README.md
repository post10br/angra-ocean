# Angra Ocean

Minimal static site for a daily Brazil-coast ocean brief covering **Rio de Janeiro ↔ Ilhabela**.

Content lives in a single JSON file so daily updates never touch the HTML/CSS/JS.

## Layout

```
angra-ocean/
├── index.html      # Single-page shell
├── styles.css      # Calm ocean aesthetic
├── app.js          # Tabs + news.json loader
├── data/
│   └── news.json   # Daily brief (edit this)
└── README.md
```

## Preview locally

From this directory:

```bash
cd /workspace/angra-ocean
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/` in a browser.  
(Fetching `data/news.json` needs a local server; opening `index.html` as a `file://` URL may be blocked by the browser.)

## Daily update

1. Edit **`data/news.json`** only.
2. Set `date` to the brief day as `YYYY-MM-DD` (America/Sao_Paulo).
3. Set `updatedAt` to an ISO-8601 timestamp (prefer `-03:00` offset).
4. Replace the `good` and `bad` arrays with real items.
5. Remove example entries (or drop `"example": true` / `[Example]` title prefixes).

### Item shape

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

### Empty days

Leave `good` or `bad` as `[]`. The UI shows a polished empty state for that tab.

## Redeploy

This is a static folder. Copy or sync the whole `angra-ocean/` tree to any static host (nginx, S3/CloudFront, GitHub Pages, Netlify, etc.).

Typical flow:

1. Update `data/news.json`.
2. Sync/upload the directory (or only `data/news.json` if assets are unchanged).
3. Hard-refresh or purge CDN cache if the host caches JSON aggressively.  
   `app.js` already requests `news.json` with `cache: "no-store"`.

No build step. No public deploy URL is defined in this repo.

## Design notes

- Deep blues, soft cream/sand accents, serif headlines + sans body.
- Two tabs: **Good news** | **Bad news**, with keyboard arrow support.
- Mobile-friendly, generous whitespace, subtle panel fade on tab switch.
