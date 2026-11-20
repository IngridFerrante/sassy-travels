(() => {
  const trip = window.TRIP;
  const sections = [
    { id: "overview", label: "Overview", icon: "◫" },
    { id: "itinerary", label: "Itinerary", icon: "⌁" },
    { id: "cities", label: "Cities", icon: "⌖" },
    { id: "files", label: "Files", icon: "▤" },
    { id: "essentials", label: "Checklist", icon: "✓" }
  ];
  const fileCategories = ["All", ...new Set(trip.files.map((file) => file.category))];
  const content = document.querySelector("#page-content");
  const sectionNav = document.querySelector("#section-nav");
  const mobileNav = document.querySelector("#mobile-nav");
  const searchForm = document.querySelector("#guide-search");
  const searchInput = document.querySelector("#guide-search-input");
  const searchResults = document.querySelector("#search-results");
  let activeSection = "overview";
  let activeFileCategory = "All";

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]);
  }

  function normalize(value) {
    return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("en");
  }

  function renderNavigation() {
    const markup = sections.map((section) => `
      <button class="section-link ${section.id === activeSection ? "is-active" : ""}" type="button" data-section="${section.id}" aria-current="${section.id === activeSection ? "page" : "false"}">
        <span class="section-icon" aria-hidden="true">${section.icon}</span><span>${section.label}</span>
      </button>`).join("");
    sectionNav.innerHTML = markup;
    mobileNav.innerHTML = markup;
  }

  function sectionHeading(eyebrow, title, aside = "") {
    return `<div class="section-heading"><div><span class="eyebrow">${escapeHtml(eyebrow)}</span><h2>${escapeHtml(title)}</h2></div>${aside ? `<p class="heading-aside">${escapeHtml(aside)}</p>` : ""}</div>`;
  }

  function overviewTemplate() {
    const cards = [
      { icon: "⌖", label: "CITIES", value: "Milano · Modena · Napoli · Roma" },
      { icon: "◷", label: "YOUR PACE", value: "Food, culture & discovery" },
      { icon: "↗", label: "GETTING AROUND", value: "Trains, metro & exploring on foot" },
      { icon: "▤", label: "TRAVEL GUIDE", value: `${trip.files.length} city guide editions` }
    ];
    const phrases = [
      { tag: "GREETINGS", phrase: "Buongiorno", meaning: "Good morning / hello" },
      { tag: "PLEASE", phrase: "Per favore", meaning: "Please" },
      { tag: "THANK YOU", phrase: "Grazie", meaning: "Thank you" },
      { tag: "AT THE RESTAURANT", phrase: "Il conto, per favore", meaning: "The bill, please" }
    ];
    return `
      ${sectionHeading("CIAO, ITALIA", "A journey through four cities.", "A curated itinerary, local recommendations and an Italian city guide to keep close.")}
      <div class="overview-grid overview-grid--4">${cards.map((card) => `<article class="overview-card"><span class="overview-icon" aria-hidden="true">${card.icon}</span><span class="card-label">${card.label}</span><strong>${escapeHtml(card.value)}</strong></article>`).join("")}</div>
      <section class="highlights-section" aria-labelledby="highlights-title">
        <div class="section-heading"><div><span class="eyebrow">USEFUL ITALIAN</span><h2 id="highlights-title">A few words go a long way.</h2></div></div>
        <div class="highlights-grid">${phrases.map((item) => `<article class="highlight-card highlight-card--static" lang="it"><span class="bucket-tag">${item.tag}</span><strong>${escapeHtml(item.phrase)}</strong><span class="bucket-detail" lang="en">${escapeHtml(item.meaning)}</span></article>`).join("")}</div>
      </section>
      <div class="feature-grid">
        <article class="feature-card feature-itinerary"><div class="feature-topline"><span>FOUR STOPS</span><span aria-hidden="true">↗</span></div><h3>Milano to Roma.</h3><p>Explore the character, culture and cuisine of four remarkable cities.</p><button class="text-link" type="button" data-section="itinerary">Open the itinerary <span aria-hidden="true">→</span></button></article>
        <article class="feature-card feature-budget"><div class="feature-topline"><span>TRAVEL INSPIRATION</span><span aria-hidden="true">▤</span></div><h3>${trip.files.length} guide editions.</h3><p>Browse public travel guides to city highlights, food, art and shopping.</p><button class="text-link" type="button" data-section="files">Open the library <span aria-hidden="true">→</span></button></article>
      </div>
      <aside class="trip-facts trip-facts--standalone"><span class="card-label">THE ROUTE</span><strong>Italia, con amore.</strong><dl><div><dt>Start exploring</dt><dd>Milano</dd></div><div><dt>Keep wandering</dt><dd>Modena & Napoli</dd></div><div><dt>Make time for</dt><dd>Roma</dd></div></dl><div class="trip-facts-actions"><button class="text-link" type="button" data-section="files">Browse the travel guides <span aria-hidden="true">→</span></button></div></aside>`;
  }

  function itineraryTemplate() {
    return `
      ${sectionHeading("A CITY-BY-CITY ITINERARY", "The journey is part of it.", "A flexible travel outline for inspiration. Adjust it to your own plans.")}
      <div class="timeline">${trip.itinerary.map((day, index) => `
        <article class="timeline-day" id="day-${index}" data-day-search="${index}">
          <div class="day-marker"><span>DAY</span><strong>${escapeHtml(day.day)}</strong></div>
          <div class="day-content"><div class="day-heading"><div><h3>${escapeHtml(day.title)}</h3><span class="day-date">${escapeHtml(day.date)}</span><span class="day-place">⌖ ${escapeHtml(day.place)}</span></div><span class="day-chevron" aria-hidden="true">✳</span></div>
            ${day.time ? `<span class="day-stay">${escapeHtml(day.time)}</span>` : ""}
            <div class="day-moments"><div class="moment"><span class="moment-dot" aria-hidden="true"></span><ul class="moment-list">${day.moments.map((moment) => `<li>${escapeHtml(moment)}</li>`).join("")}</ul></div></div>
          </div>
        </article>`).join("")}</div>
      <p class="disclaimer">This itinerary is general travel inspiration, not a confirmed schedule. Check official websites for current opening times, transportation and ticket availability.</p>`;
  }

  function cityCardTemplate(city) {
    return `<article class="city-card" id="${city.id}">
      <div class="city-card-heading"><div><span class="eyebrow">${escapeHtml(city.region)}</span><h3>${escapeHtml(city.name)}</h3></div><span class="city-date">${escapeHtml(city.date)}</span></div>
      <p class="city-intro">${escapeHtml(city.intro)}</p>
      <div class="city-categories">${city.highlights.map((group) => `<section class="city-category"><h4>${escapeHtml(group.category)}</h4><ul>${group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>`).join("")}</div>
      <p class="city-note"><span aria-hidden="true">✳</span> ${escapeHtml(city.note)}</p>
    </article>`;
  }

  function citiesTemplate() {
    return `
      ${sectionHeading("FOUR CITIES", "A taste of what's to come.", "Ideas from your attached travel guide. Check opening hours and availability before visiting.")}
      <div class="city-grid">${trip.cities.map(cityCardTemplate).join("")}</div>
      <aside class="brands-note"><span class="card-label">DESIGN & MATERIALS · IDEAS TO LOOK FOR ALONG THE WAY</span><p>${trip.brands.map(escapeHtml).join(" · ")}</p></aside>`;
  }

  function documentTemplate(file) {
    const encodedName = encodeURIComponent(file.name);
    const isWord = file.name.endsWith(".docx");
    const action = isWord ? "Download guide" : "Open PDF";
    return `<article class="document-card" id="${fileId(file)}" data-document-search>
      <div class="document-card-top"><span class="document-icon" aria-hidden="true">${isWord ? "W" : "PDF"}</span><span class="bucket-tag">${escapeHtml(file.category)}</span></div>
      <h3>${escapeHtml(file.name)}</h3><p>${escapeHtml(file.description)}</p>
      <a class="document-open" href="public-files/${encodedName}" ${isWord ? "download" : 'target="_blank" rel="noopener noreferrer"'}>${action} <span aria-hidden="true">↗</span></a>
    </article>`;
  }

  function fileId(file) {
    return `file-${trip.files.indexOf(file)}`;
  }

  function filesTemplate() {
    const visibleFiles = activeFileCategory === "All" ? trip.files : trip.files.filter((file) => file.category === activeFileCategory);
    const filters = fileCategories.map((category) => `<button class="file-filter ${activeFileCategory === category ? "is-active" : ""}" type="button" data-file-category="${escapeHtml(category)}" aria-pressed="${activeFileCategory === category}">${escapeHtml(category)}<span>${category === "All" ? trip.files.length : trip.files.filter((file) => file.category === category).length}</span></button>`).join("");
    return `
      ${sectionHeading("YOUR TRAVEL FOLDER", "Every file, close at hand.", `${trip.files.length} public guide editions · select a file to open.`)}
      <p class="document-privacy"><span aria-hidden="true">●</span> These general travel guides are public. Keep personal bookings and travel documents private.</p>
      <div class="file-filters" aria-label="Filter documents">${filters}</div>
      <div class="document-grid">${visibleFiles.map(documentTemplate).join("")}</div>
      <article class="document-card" aria-label="Private travel documents">
        <div class="document-card-top"><span class="document-icon" aria-hidden="true">LOCK</span><span class="bucket-tag">PRIVATE · ONEDRIVE</span></div>
        <h3>Your private travel documents</h3>
        <p>Opens your OneDrive folder. Access is restricted to your account; other visitors must sign in and have permission.</p>
        <a class="document-open" href="https://1drv.ms/f/c/cc14f3ee608c32e8/IgAZzcgCr5kGQIxrGMJxn7T-Af7ukY1H8b6fEqWakt68Sj4?e=2UdDa5" target="_blank" rel="noopener noreferrer">Open private folder <span aria-hidden="true">↗</span></a>
      </article>`;
  }

  function readChecklist() {
    try {
      const saved = JSON.parse(localStorage.getItem("sassy-travels-checklist") || "[]");
      return Array.isArray(saved) ? saved.filter(Number.isInteger) : [];
    } catch (error) {
      console.warn("Could not read the checklist saved in this browser.", error);
      return [];
    }
  }

  function essentialsTemplate() {
    const checked = readChecklist();
    return `
      ${sectionHeading("BEFORE YOU GO", "Small details make a better trip.", `${checked.length} of ${trip.essentials.length} checked`)}
      <div class="essentials-layout"><div class="essentials-list">${trip.essentials.map((item, index) => `
        <label class="essential-item ${checked.includes(index) ? "is-checked" : ""}">
          <input type="checkbox" data-essential="${index}" ${checked.includes(index) ? "checked" : ""} aria-label="Mark ${escapeHtml(item.title)} as checked">
          <span class="check-visual" aria-hidden="true">✓</span><span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.detail)}</small></span>
        </label>`).join("")}</div>
        <aside class="culture-card"><span class="culture-icon" aria-hidden="true">✳</span><span class="card-label">A FRIENDLY REMINDER</span><p>Check your private booking confirmations for personal travel times and details.</p><button class="text-link" type="button" data-section="files">Browse public guides <span aria-hidden="true">→</span></button></aside>
      </div>
      <p class="disclaimer">Your checklist is saved only in this browser on this device.</p>`;
  }

  const templates = {
    overview: overviewTemplate,
    itinerary: itineraryTemplate,
    cities: citiesTemplate,
    files: filesTemplate,
    essentials: essentialsTemplate
  };

  function render() {
    renderNavigation();
    content.innerHTML = templates[activeSection]();
  }

  function scrollToContent() {
    const heading = content.querySelector(".section-heading");
    if (heading) heading.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function searchMatches(query) {
    const normalizedQuery = normalize(query);
    const results = [];
    trip.files.forEach((file) => {
      if (normalize(`${file.name} ${file.category} ${file.description}`).includes(normalizedQuery)) {
        results.push({
          title: file.name,
          meta: `${file.category} · open file`,
          href: `public-files/${encodeURIComponent(file.name)}`,
          isDocument: true
        });
      }
    });
    trip.cities.forEach((city) => {
      const details = city.highlights.flatMap((group) => group.items).join(" ");
      if (normalize(`${city.name} ${city.intro} ${details}`).includes(normalizedQuery)) {
        results.push({ title: city.name, meta: "City · view recommendations", section: "cities", target: city.id });
      }
    });
    trip.itinerary.forEach((day, index) => {
      if (normalize(`${day.date} ${day.title} ${day.place} ${day.time} ${day.moments.join(" ")}`).includes(normalizedQuery)) {
        results.push({ title: day.title, meta: `${day.date} · ${day.place}`, section: "itinerary", target: `day-${index}` });
      }
    });
    return results.slice(0, 7);
  }

  function updateSearchResults() {
    const query = searchInput.value.trim();
    if (!query) {
      searchResults.hidden = true;
      searchResults.replaceChildren();
      document.querySelector("#trip-hero").classList.remove("search-open");
      return;
    }
    const results = searchMatches(query);
    searchResults.innerHTML = results.length
      ? results.map((result) => result.isDocument
        ? `<a class="search-result" href="${result.href}" target="_blank" rel="noopener noreferrer"><span><strong>${escapeHtml(result.title)}</strong><small>${escapeHtml(result.meta)}</small></span><span aria-hidden="true">↗</span></a>`
        : `<button class="search-result" type="button" data-search-section="${result.section}" data-search-target="${result.target}"><span><strong>${escapeHtml(result.title)}</strong><small>${escapeHtml(result.meta)}</small></span><span aria-hidden="true">↗</span></button>`
      ).join("")
      : `<p class="search-empty">No matches found in this guide.</p>`;
    searchResults.hidden = false;
    document.querySelector("#trip-hero").classList.add("search-open");
  }

  document.addEventListener("click", (event) => {
    const sectionButton = event.target.closest("[data-section]");
    const categoryButton = event.target.closest("[data-file-category]");
    const searchResult = event.target.closest("[data-search-section]");
    if (categoryButton) {
      activeFileCategory = categoryButton.dataset.fileCategory;
      render();
    } else if (searchResult) {
      activeSection = searchResult.dataset.searchSection;
      render();
      searchResults.hidden = true;
      const target = document.getElementById(searchResult.dataset.searchTarget);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (sectionButton) {
      activeSection = sectionButton.dataset.section;
      render();
      if (sectionButton.matches("button")) scrollToContent();
    }
  });

  document.addEventListener("change", (event) => {
    const checkbox = event.target;
    if (!checkbox.matches("[data-essential]")) return;
    const checked = readChecklist().filter((index) => index !== Number(checkbox.dataset.essential));
    if (checkbox.checked) checked.push(Number(checkbox.dataset.essential));
    try {
      localStorage.setItem("sassy-travels-checklist", JSON.stringify(checked));
    } catch (error) {
      console.warn("Could not save the checklist in this browser.", error);
    }
    render();
  });

  searchInput.addEventListener("input", updateSearchResults);
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateSearchResults();
    const firstResult = searchResults.querySelector(".search-result");
    if (firstResult?.matches("button")) firstResult.click();
    else firstResult?.click();
  });

  render();
})();
