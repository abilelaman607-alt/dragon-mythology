// dragon.js — класс Dragon (ООП)
class Dragon {
  constructor({ name, desc, type = "Unknown", img = "", source = "local" }) {
    this.name = name;
    this.desc = desc;
    this.type = type;
    // Если картинка не передана, оставляем пустую строку
    this.img = img;
    this.source = source;
  }

  // Отрисовка карточки дракона
  renderCard() {
    const card = document.createElement("div");
    card.className = "cd h-100";

    let imageHTML = "";
    // Если картинка ЕСТЬ, показываем <img>. Если НЕТ — сразу показываем CSS-заглушку.
    // Браузер даже не будет пытаться делать запрос в сеть!
    if (this.img && this.img.trim() !== "") {
      imageHTML = `<img src="${this.img}" alt="${this.name}" 
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="dragon-placeholder" style="display:none;">🐉</div>`;
    } else {
      imageHTML = `<div class="dragon-placeholder">🐉</div>`;
    }

    card.innerHTML = `
      ${imageHTML}
      <h4 class="mt-2">${this.name}</h4>
      <p>${this.desc}</p>
      <small class="text-muted">Type: ${this.type} | Source: ${this.source}</small>
      <div class="mt-2">
        <button class="btn btn-sm btn-warning"
                onclick="addToFav('${this.name.replace(/'/g, "\\'")}')">
          ★ Favorite
        </button>
      </div>
    `;
    return card;
  }

  toJSON() {
    return {
      name: this.name,
      desc: this.desc,
      type: this.type,
      img: this.img,
      source: this.source,
    };
  }

  static fromJSON(obj) {
    return new Dragon(obj);
  }
}
