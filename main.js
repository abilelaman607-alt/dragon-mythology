// ---------- Task 1: Arrays & Data (Used on: gallery.html) ---------
const dragonsData = [
  {
    name: "European",
    desc: "Wings, breathes fire.",
    type: "European",
    img: "https://thumbs.dreamstime.com/b/dragon-wings-open-mouth-protruding-tongue-vector-drawing-style-medieval-engraving-176383998.jpg",
  },
  {
    name: "Chinese",
    desc: "Long body, no wings.",
    type: "Chinese",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtl05c_PtJfh4rRPnlJpZqoBgif9VDachpzWcBARrmmA&s=10",
  },
  {
    name: "Japanese",
    desc: "Serpentine body, 3 legs.",
    type: "Japanese",
    img: "https://img.magnific.com/premium-photo/black-dragon-with-watercolor-clouds-japanese-art-style_1282444-138061.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    name: "Zmey Gorynych",
    desc: "Three heads, breathes fire.",
    type: "Slavic",
    img: "https://kyivpastfuture.com.ua/wp-content/uploads/2020/08/zmej-gorynych1.jpg",
  },
  {
    name: "Wyvern",
    desc: "2 legs, stinger on the tail.",
    type: "European",
    img: "https://auroswords.com/wp-content/uploads/2017/04/elephant-and-dragon-harley.jpg?w=616",
  },
  {
    name: "Sea Serpent",
    desc: "Lives in the ocean, sinks ships.",
    type: "Sea",
    img: "https://pdr-assets.b-cdn.net/essays/olaus-magnus-sea-serpent/sea_monster_01.jpeg?width=1200&height=765",
  },
];

// ---------- Task 2: Local Storage Functions (Used on: gallery.html) ----------
function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem("dragonFavorites")) || [];
  } catch {
    return [];
  }
}

// Used on: gallery.html
function saveFavorites(favs) {
  localStorage.setItem("dragonFavorites", JSON.stringify(favs));
}

// Used on: gallery.html
function loadUserDragons() {
  try {
    const raw = localStorage.getItem("userDragons");
    if (!raw) return [];
    return JSON.parse(raw).map((obj) => Dragon.fromJSON(obj));
  } catch {
    return [];
  }
}

// Used on: gallery.html
function saveUserDragons(dragons) {
  localStorage.setItem(
    "userDragons",
    JSON.stringify(dragons.map((d) => d.toJSON())),
  );
}

// Global state variables
let favorites = loadFavorites();
let userDragons = loadUserDragons();
let currentFilter = "";
let currentSort = "name";
let currentSource = "all";

// ---------- Task 3: Form Validation (Used on: contact.html) ----------
function validateEmail(email) {
  for (let i = 0; i < email.length; i++) {
    if (email[i] === "@") return true;
  }
  return false;
}

// Used on: contact.html
function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

// ---------- Task 4: Gallery Rendering & Search/Filter/Sort (Used on: gallery.html) ----------
function renderGallery(filterText = "", sortBy = "name", sourceFilter = "all") {
  const container = document.getElementById("gallery-container");
  if (!container) return;

  const standard = dragonsData.map(
    (d) => new Dragon({ ...d, source: "standard" }),
  );
  const all = [...standard, ...userDragons];

  const filtered = all.filter((dragon) => {
    const text = filterText.toLowerCase();
    const matchText =
      dragon.name.toLowerCase().includes(text) ||
      dragon.desc.toLowerCase().includes(text);
    const matchSource =
      sourceFilter === "all" || dragon.source === sourceFilter;
    return matchText && matchSource;
  });

  filtered.sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "type") return a.type.localeCompare(b.type);
    if (sortBy === "source") return a.source.localeCompare(b.source);
    return 0;
  });

  container.innerHTML = "";
  if (filtered.length === 0) {
    container.innerHTML =
      '<p class="text-muted text-center w-100">No dragons match your search.</p>';
    return;
  }
  filtered.forEach((dragon) => container.appendChild(dragon.renderCard()));
}

// ---------- Task 5: Favorites (Used on: gallery.html, types.html) ----------
function addToFav(name) {
  if (!favorites.includes(name)) {
    favorites.push(name);
    saveFavorites(favorites);
    const counter = document.getElementById("fav-count");
    if (counter) counter.textContent = favorites.length;
    alert(name + " added to favorites!");
  }
}

// ---------- Task 6: CRUD for User Dragons (Used on: gallery.html) ----------
function renderUserDragons() {
  const container = document.getElementById("user-dragons");
  if (!container) return;
  container.innerHTML = "";

  if (userDragons.length === 0) {
    container.innerHTML =
      '<p class="text-muted">No custom dragons yet. Add one above!</p>';
    return;
  }

  userDragons.forEach((dragon, index) => {
    const card = dragon.renderCard();
    const controls = document.createElement("div");
    controls.className = "mt-2 d-flex gap-2";
    controls.innerHTML = `
      <button class="btn btn-sm btn-outline-secondary" onclick="editDragon(${index})">✎ Edit</button>
      <button class="btn btn-sm btn-outline-danger" onclick="deleteDragon(${index})">🗑 Delete</button>
    `;
    card.appendChild(controls);
    container.appendChild(card);
  });
}

// Used on: gallery.html
function editDragon(index) {
  const dragon = userDragons[index];
  const newName = prompt("New name:", dragon.name);
  if (newName === null) return;
  const newDesc = prompt("New description:", dragon.desc);
  if (newDesc === null) return;

  dragon.name = newName.trim() || dragon.name;
  dragon.desc = newDesc.trim() || dragon.desc;
  saveUserDragons(userDragons);
  renderUserDragons();
  renderGallery(currentFilter, currentSort, currentSource);
}

// Used on: gallery.html
function deleteDragon(index) {
  if (confirm("Delete this dragon?")) {
    userDragons.splice(index, 1);
    saveUserDragons(userDragons);
    renderUserDragons();
    renderGallery(currentFilter, currentSort, currentSource);
  }
}

// ---------- Task 7: API Integration (Used on: types.html) ----------
async function loadDragonsFromAPI() {
  const container = document.getElementById("api-dragons");
  if (!container) return;

  // Loading state
  container.innerHTML = `
    <div class="text-center p-4">
      <div class="spinner-border text-warning" role="status"></div>
      <p class="mt-2">Loading dragons from API...</p>
    </div>`;

  try {
    const response = await fetch(
      "https://api.open5e.com/v2/creatures/?type=dragon&document__key__in=srd-2024&limit=6",
    );
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);

    const data = await response.json();
    const results = data.results || [];

    // Empty state
    container.innerHTML = "";
    if (results.length === 0) {
      container.innerHTML =
        '<p class="text-warning text-center">No dragons found in API.</p>';
      return;
    }

    // Success state
    const row = document.createElement("div");
    row.className = "row g-3";
    results.forEach((item) => {
      // Безопасно извлекаем название типа
      const dragonType =
        item.type && item.type.name ? item.type.name : "Dragon";

      // Безопасно извлекаем размер (size)
      const dragonSize =
        item.size && item.size.name ? item.size.name : "unknown";

      // Формируем описание
      const description = item.desc
        ? item.desc.substring(0, 160) + "…"
        : `A ${dragonType.toLowerCase()} of size ${dragonSize}.`;

      const dragon = new Dragon({
        name: item.name,
        desc: description,
        type: dragonType,
        source: "api",
      });

      const col = document.createElement("div");
      col.className = "col-md-4";
      col.appendChild(dragon.renderCard());
      row.appendChild(col);
    });
    container.appendChild(row);
  } catch (error) {
    // Error state
    container.innerHTML = `<div class="alert alert-danger">Failed to load API data: ${error.message}</div>`;
  }
}

// ---------- Task 8: Event Listeners & Initialization (Used on: ALL pages) ----------
document.addEventListener("DOMContentLoaded", function () {
  // 1. Theme logic (Used on: ALL pages)
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
  const themeBtn = document.getElementById("theme-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem(
        "theme",
        document.body.classList.contains("dark-mode") ? "dark" : "light",
      );
    });
  }

  // 2. Update Favorites counter (Used on: gallery.html)
  const favCount = document.getElementById("fav-count");
  if (favCount) favCount.textContent = favorites.length;

  // 3. Initialize Gallery (Used on: gallery.html)
  if (document.getElementById("gallery-container")) {
    renderGallery();
  }

  // 4. Search, Sort, and Filter Events (Used on: gallery.html)
  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", function (e) {
      currentFilter = e.target.value;
      renderGallery(currentFilter, currentSort, currentSource);
    });
  }
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", function (e) {
      currentSort = e.target.value;
      renderGallery(currentFilter, currentSort, currentSource);
    });
  }
  const sourceSelect = document.getElementById("filter-source");
  if (sourceSelect) {
    sourceSelect.addEventListener("change", function (e) {
      currentSource = e.target.value;
      renderGallery(currentFilter, currentSort, currentSource);
    });
  }

  // 5. Initialize CRUD (Used on: gallery.html)
  if (document.getElementById("dragon-form")) {
    renderUserDragons();
    document
      .getElementById("dragon-form")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("d-name").value.trim();
        const desc = document.getElementById("d-desc").value.trim();
        const type = document.getElementById("d-type").value;

        if (name.length < 2 || desc.length < 3) {
          alert("Name (min 2 chars) and description (min 3 chars) required.");
          return;
        }

        const newDragon = new Dragon({ name, desc, type, source: "user" });
        userDragons.push(newDragon);
        saveUserDragons(userDragons);
        renderUserDragons();
        renderGallery(currentFilter, currentSort, currentSource);
        e.target.reset();
      });
  }

  // 6. Initialize API (Used on: types.html)
  if (document.getElementById("api-dragons")) {
    loadDragonsFromAPI();
  }

  // 7. Contact Form Validation (Used on: contact.html)
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      let isValid = true;

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;

      if (name.length < 3) {
        showError("name-err", "Name must be longer than 3 letters");
        isValid = false;
      } else {
        showError("name-err", "");
      }

      if (!validateEmail(email)) {
        showError("email-err", "Invalid format (no @)");
        isValid = false;
      } else {
        showError("email-err", "");
      }

      if (isValid) {
        document.getElementById("success-msg").textContent =
          "Successfully sent!";
        document.getElementById("success-msg").style.color = "green";
        form.reset();
      }
    });
  }
});
