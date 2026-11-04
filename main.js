// ---------- Task 1: Arrays & Variables ----------
const dragonsData = [
  { name: "Европейский", desc: "Крылья, дышит огнем." },
  { name: "Китайский", desc: "Длинное тело, без крыльев." },
  { name: "Японский", desc: "Змеиное тело, 3 лапы." },
  { name: "Змей Горыныч", desc: "Три головы, дышит огнем." },
  { name: "Виверна", desc: "2 лапы, жало на хвосте." },
];
const favorites = [];

// ---------- Task 2: Functions & Loops ----------
function validateEmail(email) {
  for (let i = 0; i < email.length; i++) {
    if (email[i] === "@") return true;
  }
  return false;
}

function showError(id, msg) {
  document.getElementById(id).textContent = msg;
}

function renderGallery(filterText = "") {
  const container = document.getElementById("gallery-container");
  if (!container) return;
  container.innerHTML = "";

  dragonsData.forEach(function (dragon) {
    if (dragon.name.toLowerCase().includes(filterText.toLowerCase())) {
      const fig = document.createElement("figure");
      fig.innerHTML = `
        <div class="cd">
          <h3>${dragon.name}</h3>
          <p>${dragon.desc}</p>
          <button class="btn btn-sm btn-warning" onclick="addToFav('${dragon.name}')">В избранное</button>
        </div>
      `;
      container.appendChild(fig);
    }
  });
}

function addToFav(name) {
  if (!favorites.includes(name)) {
    favorites.push(name);
    document.getElementById("fav-count").textContent = favorites.length;
    alert(name + " добавлен в избранное!");
  }
}

// ---------- Task 3: Events & Form Validation ----------
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("gallery-container")) {
    renderGallery();
  }

  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", function (e) {
      renderGallery(e.target.value);
    });
  }

  const themeBtn = document.getElementById("theme-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
    });
  }

  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      let isValid = true;

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;

      if (name.length < 3) {
        showError("name-err", "Имя должно быть больше 3 букв");
        isValid = false;
      } else {
        showError("name-err", "");
      }

      if (!validateEmail(email)) {
        showError("email-err", "Неверный формат (нет @)");
        isValid = false;
      } else {
        showError("email-err", "");
      }

      if (isValid) {
        document.getElementById("success-msg").textContent =
          "Успешно отправлено!";
        document.getElementById("success-msg").style.color = "green";
        form.reset();
      }
    });
  }
});
