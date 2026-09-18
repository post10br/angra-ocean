(() => {
  "use strict";

  const DATA_URL = "data/news.json";

  const els = {
    date: document.getElementById("brief-date"),
    region: document.getElementById("brief-region"),
    updatedAt: document.getElementById("updated-at"),
    status: document.getElementById("status"),
    countGood: document.getElementById("count-good"),
    countBad: document.getElementById("count-bad"),
    feedGood: document.getElementById("feed-good"),
    feedBad: document.getElementById("feed-bad"),
    emptyGood: document.getElementById("empty-good"),
    emptyBad: document.getElementById("empty-bad"),
    panelGood: document.getElementById("panel-good"),
    panelBad: document.getElementById("panel-bad"),
    tabs: document.querySelectorAll('[role="tab"]'),
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

  function isExample(item) {
    return item.example === true || /^\[Example\]/i.test(item.title || "");
  }

  function renderCard(item) {
    const example = isExample(item);
    const tags = Array.isArray(item.tags) ? item.tags : [];
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
        <div class="card-top">${exampleBadge}${location}</div>
        <h2 class="card-title">${escapeHtml(item.title || "Untitled")}</h2>
        <p class="card-summary">${escapeHtml(item.summary || "")}</p>
        <div class="card-footer">
          <a class="source-link" href="${escapeHtml(item.url || "#")}" target="_blank" rel="noopener noreferrer">
            ${escapeHtml(item.source || "Source")} ↗
          </a>
          ${tagHtml}
        </div>
      </li>
    `;
  }

  function renderFeed(items, feedEl, emptyEl, countEl) {
    const list = Array.isArray(items) ? items : [];
    countEl.textContent = String(list.length);

    if (list.length === 0) {
      feedEl.innerHTML = "";
      emptyEl.hidden = false;
      return;
    }

    emptyEl.hidden = true;
    feedEl.innerHTML = list.map(renderCard).join("");
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
    const isGood = name === "good";

    els.tabs.forEach((tab) => {
      const selected = tab.dataset.tab === name;
      tab.setAttribute("aria-selected", selected ? "true" : "false");
      tab.tabIndex = selected ? 0 : -1;
    });

    els.panelGood.classList.toggle("is-active", isGood);
    els.panelBad.classList.toggle("is-active", !isGood);
    els.panelGood.hidden = !isGood;
    els.panelBad.hidden = isGood;
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
  }

  bindTabs();
  activateTab("good");
  load();
})();
