// This is the main JS file. All pages use this file.
// It works on gallery.html, contact.html and theme on all pages.

//  gallery.html
// ---------- Task 1: Arrays & Variables ----------
const dragonsData = [
  {
    name: "European",
    desc: "Wings, breathes fire.",
    img: "https://thumbs.dreamstime.com/b/dragon-wings-open-mouth-protruding-tongue-vector-drawing-style-medieval-engraving-176383998.jpg",
  },
  {
    name: "Chinese",
    desc: "Long body, no wings.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtl05c_PtJfh4rRPnlJpZqoBgif9VDachpzWcBARrmmA&s=10",
  },
  {
    name: "Japanese",
    desc: "Serpentine body, 3 legs.",
    img: "https://img.magnific.com/premium-photo/black-dragon-with-watercolor-clouds-japanese-art-style_1282444-138061.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    name: "Zmey Gorynych",
    desc: "Three heads, breathes fire.",
    img: "https://kyivpastfuture.com.ua/wp-content/uploads/2020/08/zmej-gorynych1.jpg",
  },
  {
    name: "Wyvern",
    desc: "2 legs, stinger on the tail.",
    img: "https://auroswords.com/wp-content/uploads/2017/04/elephant-and-dragon-harley.jpg?w=616",
  },
  {
    name: "Sea Serpent",
    desc: "Lives in the ocean, sinks ships.",
    img: "https://pdr-assets.b-cdn.net/essays/olaus-magnus-sea-serpent/sea_monster_01.jpeg?width=1200&height=765",
  },
];

// ---------- Task 2: Functions & Loops ----------
const favorites = [];

//  contact.html
function validateEmail(email) {
  for (let i = 0; i < email.length; i++) {
    if (email[i] === "@") return true;
  }
  return false;
}

//  contact.html
function showError(id, msg) {
  document.getElementById(id).textContent = msg;
}

//  gallery.html
function renderGallery(filterText = "") {
  const container = document.getElementById("gallery-container");
  if (!container) return;
  container.innerHTML = "";

  dragonsData.forEach(function (dragon) {
    if (dragon.name.toLowerCase().includes(filterText.toLowerCase())) {
      const fig = document.createElement("figure");

      fig.innerHTML = `
        <img src="${dragon.img}" alt="${dragon.name}">
        <div class="cd" style="margin-top: 10px;">
          <h3>${dragon.name}</h3>
          <p>${dragon.desc}</p>
          <button class="btn btn-sm btn-warning" onclick="addToFav('${dragon.name}')">Add to favorites</button>
        </div>
      `;
      container.appendChild(fig);
    }
  });
}

//  gallery.html
function addToFav(name) {
  if (!favorites.includes(name)) {
    favorites.push(name);
    document.getElementById("fav-count").textContent = favorites.length;
    alert(name + " added to favorites!");
  }
}

// ---------- Task 3: Events & Form Validation ----------
document.addEventListener("DOMContentLoaded", function () {
  // ---------- 1. THEME LOGIC (Works on all pages) ----------
  // Check if the user saved a theme before.
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  const themeBtn = document.getElementById("theme-btn");

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");

      // Save the new theme in localStorage.
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  }

  // ---------- 2. GALLERY LOGIC ----------
  if (document.getElementById("gallery-container")) {
    renderGallery();
  }

  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", function (e) {
      renderGallery(e.target.value);
    });
  }

  // ---------- 3. FORM LOGIC ----------
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
