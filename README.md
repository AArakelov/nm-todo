# 📝 NM-TODO Angular App

A modern TODO management application built with Angular 17, Signals, Material UI, and reactive forms.

## 🔗 Demo

👉 [View Live on GitHub Pages](https://aarakelov.github.io/nm-todo/)

## 🛠️ Setup & Run

### 1. Clone the project

```bash
git clone https://github.com/AArakelov/nm-todo.git
cd nm-todo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
ng serve
```

Visit `http://localhost:4200/nm-todo` (base href is set for GitHub Pages).

---

## Build & Deploy

### Production build

```bash
ng build --base-href=/nm-todo/
```

### Deploy to GitHub Pages

Using [angular-cli-ghpages](https://github.com/angular-schule/angular-cli-ghpages):

```bash
npx angular-cli-ghpages --dir=dist/nm-todo
```

> GitHub Pages must be enabled on the `gh-pages` branch.

---

## Architecture Notes

- **State Management:** Signals (`signal()`, `computed()`) in `TodoService`
- **Storage:** `@ngx-pwa/local-storage` with typed access & schema support
- **Forms:** ReactiveForms with global and control-level validators
- **Routing:** Standalone Angular Router with declarative setup
- **CD Optimized:** Countdown timers run outside Angular zone

---

## Tech Stack

- Angular 19
- Angular Material
- Signals
- ngx-material-timepicker
- @ngx-pwa/local-storage

---


