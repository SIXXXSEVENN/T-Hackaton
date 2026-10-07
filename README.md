# 67Flow 💸

A lightweight personal finance tracker — income, expenses, and balance in one interface.
Built by a team during the T-Bank hackathon hosted at KFU.

<p align="left">
  <img src="https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black" alt="Vanilla JS">
  <img src="https://img.shields.io/badge/build-no%20dependencies-brightgreen" alt="No dependencies">
  <img src="https://img.shields.io/badge/status-hackathon%20MVP-blueviolet" alt="Hackathon MVP">
</p>

---

## About

**67Flow** is a web app for tracking personal finances. Users log their income and expenses,
the app instantly recalculates the balance and stores the full transaction history locally in the browser —
no backend, no sign-up.

The interface follows T-Bank's brand style: a yellow accent, a light card-based layout
with a frosted-glass blur effect, and the Inter typeface.

## Features

- 💰 **Add transactions** — type (income/expense), amount, category, date, note
- 📊 **Real-time summary** — current balance, total income, and total expenses
- 🗂 **Transaction log** — history table sortable by date, category, and amount
- 🗑 **Delete entries** right from the table
- 📤 **One-click CSV export**
- 💾 **`localStorage` persistence** — data survives between sessions with no server required
- 📱 **Responsive layout** — switches to a single column on screens ≤ 900px

## Tech Stack

| Layer | Technologies |
|---|---|
| Markup | HTML5 (semantic tags, ARIA labels) |
| Styles | CSS3: `globals.css` (reset + Inter font), `styleguide.css` (design tokens), `style.css` (components) |
| Logic | Vanilla JavaScript, no frameworks or bundler |
| Data | Browser `localStorage` |

No `npm install` and no build step — the project opens as a plain static page.

## Quick Start

```bash
git clone https://github.com/SIXXXSEVENN/T-Hackaton.git
cd T-Hackaton
```

Then just open `index.html` in your browser, or spin up a local server:

```bash
# Python
python -m http.server 8000

# or Node
npx serve .
```

and go to `http://localhost:8000`.

## Project Structure

```
T-Hackaton/
├── index.html          # app markup
├── script.js            # all client-side logic (transactions, sorting, CSV)
├── style.css             # UI components
├── styleguide.css       # design tokens
├── globals.css           # style reset + typography
└── icons/                # UI SVG icons
```

## Roadmap

The icon set already lays the groundwork for features we didn't have time to finish during the hackathon:

- 🌙 dark mode toggle
- 📈 charts and a timeline of expenses/income
- 🔍 filters by category, type, and date range (the filtering logic already exists in `script.js`; only the UI is missing)
- ✏️ editing an existing transaction (the `editTransaction` function is ready; there's just no button in the UI yet)

## Team

Built during the hackathon by a team of several people — see [contributors](https://github.com/SIXXXSEVENN/T-Hackaton/graphs/contributors).

---

<p align="left">Made with 🟡 in a single hackathon.</p>
