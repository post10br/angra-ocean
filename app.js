(() => {
  "use strict";

  const CACHE_BUST = "20260919a";
  const DATA_URL = `data/news.json?v=${CACHE_BUST}`;
  const SWIM_URL = `data/swim-safety.json?v=${CACHE_BUST}`;
  const GROUPS_URL = `data/groups.json?v=${CACHE_BUST}`;

  const GROK_ICON = `<svg class="grok-icon" viewBox="0 0 16 16" aria-hidden="true" width="14" height="14"><circle cx="8" cy="8" r="7.25" fill="#111" stroke="#fff" stroke-width="1.5"/><path fill="#fff" d="M5.2 10.6c1.1-2.4 2.2-3.6 2.8-4.1.6.5 1.7 1.7 2.8 4.1H9.4c-.25-.55-.55-1.05-.8-1.4-.25.35-.55.85-.8 1.4H5.2zm2.8-5.35c.35-.55.55-.9.55-1.25 0-.35-.2-.6-.55-.6s-.55.25-.55.6c0 .35.2.7.55 1.25z"/></svg>`;

  const els = {
    date: document.getElementById("brief-date"),
    region: document.getElementById("brief-region"),
    updatedAt: document.getElementById("updated-at"),
    status: document.getElementById("status"),
    countGood: document.getElementById("count-good"),
    countBad: document.getElementById("count-bad"),
    countSwim: document.getElementById("count-swim"),
    countGroups: document.getElementById("count-groups"),
    feedGood: document.getElementById("feed-good"),
    feedBad: document.getElementById("feed-bad"),
    emptyGood: document.getElementById("empty-good"),
    emptyBad: document.getElementById("empty-bad"),
    emptySwim: document.getElementById("empty-swim"),
    emptyGroups: document.getElementById("empty-groups"),
    panelGood: document.getElementById("panel-good"),
    panelBad: document.getElementById("panel-bad"),
    panelSwim: document.getElementById("panel-swim"),
    panelGroups: document.getElementById("panel-groups"),
    swimMeta: document.getElementById("swim-meta"),
    swimBulletinDate: document.getElementById("swim-bulletin-date"),
    swimSource: document.getElementById("swim-source"),
    swimNextUpdate: document.getElementById("swim-next-update"),
    swimNote: document.getElementById("swim-note"),
    swimUnsafeCount: document.getElementById("swim-unsafe-count"),
    swimBulletinLink: document.getElementById("swim-bulletin-link"),
    swimMapLink: document.getElementById("swim-map-link"),
    swimIneaLink: document.getElementById("swim-inea-link"),
    swimTable: document.getElementById("swim-table"),
    swimTbody: document.getElementById("swim-tbody"),
    groupsMeta: document.getElementById("groups-meta"),
    groupsMethodNote: document.getElementById("groups-method-note"),
    groupsTable: document.getElementById("groups-table"),
    groupsTbody: document.getElementById("groups-tbody"),
    tabs: document.querySelectorAll('[role="tab"]'),
  };

  const panels = {
    good: els.panelGood,
    bad: els.panelBad,
    swim: els.panelSwim,
    groups: els.panelGroups,
  };

  const lazyLoaders = {
    swim: { loaded: false, load: loadSwim },
    groups: { loaded: false, load: loadGroups },
  };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatUpdated(iso) {
    if (!iso) return "—";
    try {
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return iso;
      return new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Sao_Paulo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(d).replace(",", "");
    } catch {
      return iso;
    }
  }


  const PT_BR_MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

  function formatArticleDate(iso) {
    if (!iso || typeof iso !== "string") return "";
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
    if (!m) return iso;
    const year = Number(m[1]);
    const month = Number(m[2]);
    const day = Number(m[3]);
    if (!year || month < 1 || month > 12 || day < 1 || day > 31) return iso;
    return `${day} ${PT_BR_MONTHS[month - 1]} ${year}`;
  }

  function byDateDesc(a, b) {
    const da = (a && a.date) || "";
    const db = (b && b.date) || "";
    return String(db).localeCompare(String(da));
  }

  function isExample(item) {
    return item.example === true || /^\[Example\]/i.test(item.title || "");
  }

  function grokPrompt(item) {
    return (
      "Dig deeper into this Brazil-coast ocean news for scuba, spearfishing, and freediving context. " +
      "Summarize what matters, any risks, and useful follow-ups.\n\n" +
      `Title: ${item.title || ""}\n` +
      `Location: ${item.location || ""}\n` +
      `Source: ${item.source || ""}\n` +
      `Article: ${item.url || ""}\n\n` +
      `Summary from Angra Ocean:\n${item.summary || ""}`
    );
  }

  function grokLink(item) {
    const href = `https://grok.com/?q=${encodeURIComponent(grokPrompt(item))}`;
    return `<a class="grok-link" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${GROK_ICON}<span>Ask Grok</span></a>`;
  }

  function renderCard(item) {
    const example = isExample(item);
    const tags = Array.isArray(item.tags) ? item.tags : [];
    const dateLabel = formatArticleDate(item.date);
    const dateBadge = dateLabel
      ? `<time class="badge badge-date" datetime="${escapeHtml(item.date)}">${escapeHtml(dateLabel)}</time>`
      : "";
    const location = item.location
      ? `<span class="badge badge-location">${escapeHtml(item.location)}</span>`
      : "";
    const exampleBadge = example
      ? `<span class="badge badge-example">Example</span>`
      : "";
    const tagHtml = tags.length
      ? `<div class="tags">${tags
          .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
          .join("")}</div>`
      : "";

    return `
      <li class="card${example ? " is-example" : ""}">
        <div class="card-top">${dateBadge}${exampleBadge}${location}</div>
        <h2 class="card-title">${escapeHtml(item.title || "Untitled")}</h2>
        <p class="card-summary">${escapeHtml(item.summary || "")}</p>
        <div class="card-footer">
          <div class="card-links">
            <a class="source-link" href="${escapeHtml(item.url || "#")}" target="_blank" rel="noopener noreferrer">
              ${escapeHtml(item.source || "Source")} ↗
            </a>
            ${grokLink(item)}
          </div>
          ${tagHtml}
        </div>
      </li>
    `;
  }

  function renderFeed(items, feedEl, emptyEl, countEl) {
    const list = Array.isArray(items) ? [...items].sort(byDateDesc) : [];
    countEl.textContent = String(list.length);

    if (list.length === 0) {
      feedEl.innerHTML = "";
      emptyEl.hidden = false;
      return;
    }

    emptyEl.hidden = true;
    feedEl.innerHTML = list.map(renderCard).join("");
  }

  function statusDotClass(status) {
    if (status === "safe") return "green";
    if (status === "caution") return "orange";
    return "red";
  }


  let swimMap = null;
  let swimMapLayer = null;
  let pendingSwimBeaches = null;
  let lastSwimBulletinDate = "";

  // Marker style kept in sync with banho.html (shareable map-only page).
  function markerColor(status) {
    if (status === "safe") return "#3d8b6e";
    if (status === "caution") return "#d4a017";
    return "#c45c48";
  }

  function tipForStatus(status) {
    if (status === "safe") return "Própria para banho neste boletim. Evite após chuva forte.";
    if (status === "caution") return "Parcial: só alguns trechos liberados — confira o ponto mais perto de você.";
    return "Imprópria neste boletim. Prefira outra praia ou aguarde nova coleta.";
  }

  function destroySwimMap() {
    if (swimMap) {
      swimMap.remove();
      swimMap = null;
      swimMapLayer = null;
    }
  }

  function renderSwimMap(beaches) {
    const mapEl = document.getElementById("swim-map");
    if (!mapEl) return;
    if (typeof L === "undefined") {
      console.error("Leaflet (L) is not loaded");
      mapEl.classList.add("is-empty");
      mapEl.textContent = "Map library failed to load.";
      return;
    }

    destroySwimMap();
    mapEl.textContent = "";

    const withCoords = (Array.isArray(beaches) ? beaches : []).filter(
      (b) => Number.isFinite(b.lat) && Number.isFinite(b.lon)
    );

    if (withCoords.length === 0) {
      mapEl.innerHTML = "";
      mapEl.classList.add("is-empty");
      return;
    }
    mapEl.classList.remove("is-empty");

    swimMap = L.map(mapEl, {
      scrollWheelZoom: false,
      attributionControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(swimMap);

    const legend = L.control({ position: "bottomleft" });
    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "swim-map-legend");
      div.innerHTML =
        "<strong>Balneabilidade</strong>" +
        '<span><i class="dot safe"></i> Própria</span>' +
        '<span><i class="dot caution"></i> Parcial</span>' +
        '<span><i class="dot unsafe"></i> Imprópria</span>';
      return div;
    };
    legend.addTo(swimMap);

    swimMapLayer = L.featureGroup();
    withCoords.forEach((b) => {
      const color = markerColor(b.status);
      const marker = L.circleMarker([b.lat, b.lon], {
        radius: 8,
        color: "#fff",
        weight: 1.5,
        fillColor: color,
        fillOpacity: 0.92,
      });
      const dateBit = lastSwimBulletinDate
        ? `<br><small>Boletim: ${escapeHtml(lastSwimBulletinDate)}</small>`
        : "";
      const popup =
        `<strong>${escapeHtml(b.name || "")}</strong><br>` +
        `${escapeHtml(b.municipality || "")}<br>` +
        `<span style="color:${color}">${escapeHtml(b.label || b.status || "")}</span>` +
        (b.detail ? ` · ${escapeHtml(b.detail)}` : "") +
        dateBit +
        `<br><small>${escapeHtml(b.agency || "INEA")}</small>` +
        `<div class="popup-tip">${escapeHtml(tipForStatus(b.status))}</div>`;
      marker.bindPopup(popup);
      swimMapLayer.addLayer(marker);
    });
    swimMapLayer.addTo(swimMap);

    const bounds = swimMapLayer.getBounds();
    if (bounds.isValid()) {
      swimMap.fitBounds(bounds.pad(0.08));
    } else {
      swimMap.setView([-23.2, -44.5], 8);
    }

    requestAnimationFrame(() => {
      if (swimMap) swimMap.invalidateSize();
    });
    setTimeout(() => {
      if (swimMap) swimMap.invalidateSize();
    }, 200);
  }

  function renderSwim(data) {
    const beaches = Array.isArray(data.beaches) ? [...data.beaches] : [];
    lastSwimBulletinDate = data.bulletinDate || "";
    beaches.sort((a, b) => (a.rank || 0) - (b.rank || 0));

    const unsafeCount = beaches.filter((b) => b.status === "unsafe").length;

    els.countSwim.textContent = String(beaches.length);

    els.swimBulletinDate.textContent = data.bulletinDate || "—";
    els.swimSource.textContent = data.source || "CETESB";
    els.swimNextUpdate.textContent = data.nextUpdate || "—";
    els.swimNote.textContent = data.note || "";

    if (unsafeCount > 0) {
      els.swimUnsafeCount.hidden = false;
      els.swimUnsafeCount.textContent = `${unsafeCount} improper (imprópria) of ${beaches.length} listed`;
    } else {
      els.swimUnsafeCount.hidden = true;
    }

    if (data.sourceUrl) {
      els.swimBulletinLink.href = data.sourceUrl;
      els.swimBulletinLink.hidden = false;
    }
    if (data.mapUrl) {
      els.swimMapLink.href = data.mapUrl;
      els.swimMapLink.hidden = false;
    }
    if (els.swimIneaLink) {
      const inea = data.ineaUrl || "https://www.inea.rj.gov.br/ar-agua-e-solo/balneabilidade-das-praias/";
      els.swimIneaLink.href = inea;
      els.swimIneaLink.hidden = false;
    }

    els.swimMeta.hidden = false;

    if (beaches.length === 0) {
      els.swimTable.hidden = true;
      els.swimTbody.innerHTML = "";
      els.emptySwim.hidden = false;
      pendingSwimBeaches = [];
      destroySwimMap();
      return;
    }

    els.emptySwim.hidden = true;
    els.swimTable.hidden = false;
    els.swimTbody.innerHTML = beaches
      .map((b) => {
        const dot = statusDotClass(b.status);
        return `<tr>
          <td><span class="status-dot ${dot}" title="${escapeHtml(b.status || "")}"></span></td>
          <td>${escapeHtml(b.name || "")}</td>
          <td>${escapeHtml(b.municipality || "")}</td>
          <td>${escapeHtml(b.label || "")}</td>
          <td>${escapeHtml(b.indicator || "")}</td>
        </tr>`;
      })
      .join("");

    // Map is built when the Swim tab becomes visible (see activateTab)
    pendingSwimBeaches = beaches;
    destroySwimMap();
  }

  function renderGroups(data) {
    const groups = Array.isArray(data.groups) ? [...data.groups] : [];
    groups.sort((a, b) => (a.rank || 0) - (b.rank || 0));

    els.countGroups.textContent = String(groups.length);

    const note = data.methodNote || "";
    els.groupsMethodNote.textContent = note;
    els.groupsMeta.hidden = !note;

    if (groups.length === 0) {
      els.groupsTable.hidden = true;
      els.groupsTbody.innerHTML = "";
      els.emptyGroups.hidden = false;
      return;
    }

    els.emptyGroups.hidden = true;
    els.groupsTable.hidden = false;
    els.groupsTbody.innerHTML = groups
      .map((g) => {
        const why = g.why || g.summary || "";
        const link = g.url
          ? `<a class="groups-ext-link" href="${escapeHtml(g.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(g.linkLabel || "Visit")} ↗</a>`
          : "—";
        return `<tr>
          <td class="groups-rank">${escapeHtml(String(g.rank ?? ""))}</td>
          <td>${escapeHtml(g.organization || g.name || "")}</td>
          <td>${escapeHtml(g.focus || "")}</td>
          <td class="groups-why">${escapeHtml(why)}</td>
          <td>${escapeHtml(g.region || "")}</td>
          <td>${link}</td>
        </tr>`;
      })
      .join("");
  }

  function setStatus(msg, isError) {
    if (!msg) {
      els.status.hidden = true;
      els.status.textContent = "";
      els.status.classList.remove("error");
      return;
    }
    els.status.hidden = false;
    els.status.textContent = msg;
    els.status.classList.toggle("error", !!isError);
  }

  function activateTab(name) {
    els.tabs.forEach((tab) => {
      const selected = tab.dataset.tab === name;
      tab.setAttribute("aria-selected", selected ? "true" : "false");
      tab.tabIndex = selected ? 0 : -1;
    });

    Object.entries(panels).forEach(([key, panel]) => {
      if (!panel) return;
      const active = key === name;
      panel.classList.toggle("is-active", active);
      // Prefer class-based visibility; keep hidden in sync for a11y
      if (active) panel.removeAttribute("hidden");
      else panel.setAttribute("hidden", "");
    });

    const lazy = lazyLoaders[name];
    if (lazy && !lazy.loaded) {
      lazy.load();
    } else if (lazy && lazy.loaded === false) {
      // Retry after a prior failure
      lazy.load();
    }

    if (name === "swim") {
      const build = () => {
        try {
          if (pendingSwimBeaches && pendingSwimBeaches.length && !swimMap) {
            renderSwimMap(pendingSwimBeaches);
          } else if (swimMap) {
            swimMap.invalidateSize();
            if (swimMapLayer) {
              const b = swimMapLayer.getBounds();
              if (b.isValid()) swimMap.fitBounds(b.pad(0.12));
            }
          }
        } catch (err) {
          console.error("swim map build failed", err);
        }
      };
      requestAnimationFrame(() => {
        build();
        setTimeout(build, 100);
        setTimeout(() => { if (swimMap) swimMap.invalidateSize(); }, 300);
      });
    }
  }

  function bindTabs() {
    els.tabs.forEach((tab) => {
      tab.addEventListener("click", () => activateTab(tab.dataset.tab));
      tab.addEventListener("keydown", (e) => {
        const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
        if (!keys.includes(e.key)) return;
        e.preventDefault();
        const tabs = [...els.tabs];
        let i = tabs.indexOf(tab);
        if (e.key === "ArrowLeft") i = (i - 1 + tabs.length) % tabs.length;
        if (e.key === "ArrowRight") i = (i + 1) % tabs.length;
        if (e.key === "Home") i = 0;
        if (e.key === "End") i = tabs.length - 1;
        tabs[i].focus();
        activateTab(tabs[i].dataset.tab);
      });
    });
  }

  async function loadSwim() {
    try {
      const res = await fetch(SWIM_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!data || !Array.isArray(data.beaches)) {
        throw new Error("swim-safety.json missing beaches array");
      }
      renderSwim(data);
      lazyLoaders.swim.loaded = true;
      setStatus("");
    } catch (err) {
      console.error("swim load failed", err);
      lazyLoaders.swim.loaded = false;
      if (els.countSwim) els.countSwim.textContent = "0";
      if (els.swimMeta) els.swimMeta.hidden = true;
      if (els.swimTable) els.swimTable.hidden = true;
      if (els.emptySwim) els.emptySwim.hidden = false;
      pendingSwimBeaches = null;
      destroySwimMap();
      setStatus("Could not load swim-safety data.", true);
    }
  }

  async function loadGroups() {
    try {
      const res = await fetch(GROUPS_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      renderGroups(data);
      lazyLoaders.groups.loaded = true;
    } catch (err) {
      console.error("groups load failed", err);
      lazyLoaders.groups.loaded = false;
      if (els.countGroups) els.countGroups.textContent = "0";
      if (els.groupsMeta) els.groupsMeta.hidden = true;
      if (els.groupsTable) els.groupsTable.hidden = true;
      if (els.emptyGroups) els.emptyGroups.hidden = false;
      setStatus("Could not load conservation groups.", true);
    }
  }

  async function load() {
    setStatus("Loading brief…");
    try {
      const res = await fetch(DATA_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      els.date.textContent = data.date || "—";
      if (data.region) els.region.textContent = data.region;
      els.updatedAt.textContent = formatUpdated(data.updatedAt);

      renderFeed(data.good, els.feedGood, els.emptyGood, els.countGood);
      renderFeed(data.bad, els.feedBad, els.emptyBad, els.countBad);
      setStatus("");
    } catch (err) {
      console.error(err);
      setStatus("Could not load today’s brief. Check data/news.json.", true);
      els.countGood.textContent = "0";
      els.countBad.textContent = "0";
      els.emptyGood.hidden = false;
      els.emptyBad.hidden = false;
    }

    // Prefetch so tab counts are ready
    loadSwim();
    loadGroups();
  }

  bindTabs();
  activateTab("good");
  load();
})();
