# 🐉 Dragons — Educational Project

A multi-page website about dragons in world mythology, built with HTML5, CSS3, Bootstrap 5, JavaScript, and jQuery.

# 🔗 Links

Deployed website: (paste your GitHub Pages / Netlify URL here)

Source repository: (paste your GitHub repository URL here)

# 👤 Author

Name: Yelaman Abil

# 🚀 How to Run Locally

Clone the repository:

# bash

git clone <https://github.com/abilelaman607-alt/dragon-mythology.git
Open the project folder in your code editor (e.g., VS Code).

Start a local server (recommended — API calls may require http://, not file://):

bash

# Using Python 3

python -m http.server 8000
Open http://localhost:8000/index.html in your browser.

# 📡 API Information

Provider: Open5e — a free public D&D 5e API, no API key required.

Endpoint used: GET https://api.open5e.com/v2/creatures/?type=dragon&document__key__in=srd-2024&limit=6

Returned fields used: name, desc, type, size.

Where it appears: the Types page (types.html) in the section "🐲 Live Dragons from API".

States handled: loading (spinner), success (cards), empty (message), error (alert with reason).

Implementation: async/await + fetch, results are processed and converted into Dragon objects using OOP.

# ✨ Final-stage features

Mandatory Features
API integration — live dragons loaded from Open5e on the Types page (loading / success / empty / error states, dynamic DOM rendering).

Object-Oriented Programming — Dragon class (dragon.js) with constructor, properties, renderCard(), toJSON(), and static fromJSON(). Used for standard data, user data, favorites, and API data to prevent code duplication.

localStorage —

dragonFavorites — favorites list (saved/restored, counter updates live).

userDragons — user-created dragons (JSON format, safe parsing with try...catch).

theme — dark-mode preference saved between visits.

Additional Features (Chosen 2)
Full CRUD — on the Gallery page users can Create, Read, Update (via edit), and Delete their own dragons. Data persists in localStorage.

Advanced search, sorting & filtering — Gallery supports text search, sort by name/type/source, and filter by source (standard/user). All controls are combined dynamically.

Previously Assessed Features (Still Working)
Responsive layout with Bootstrap grid + custom media queries.

Multi-page navigation with active state.

Dark-mode toggle with persistence.

Contact form validation (name length + @ in email).

jQuery: fade-in of gallery, slide toggle of the fact box, card hover shadow.

# 📂 Project Structure

text
/
├── index.html
├── about.html
├── types.html
├── gallery.html
├── contact.html
├── base.css
├── layout.css
├── resp.css
├── dragon.js ← Dragon class (OOP)
├── main.js ← App logic (API, CRUD, localStorage, validation)
├── jquery.js ← jQuery animations
└── README.md

# 🧪 Testing Checklist

□ Open each page — no console errors.
□ Toggle dark mode — preference persists after reload.
□ Gallery: search, sort, filter — cards update instantly.
□ Gallery: add / edit / delete a dragon — appears in the grid and persists after reload.
□ Types page: API dragons load (or a clear error message appears if offline).
□ Contact form: empty and invalid values show inline errors; valid values show success.
□ Favorites counter updates and survives reload.

# 🛠 Tech Stack

HTML5, CSS3 (Flexbox + Grid + media queries)

Bootstrap 5.3

Vanilla JavaScript (ES6+: class, async/await, fetch)

jQuery 3.7

Open5e public API
