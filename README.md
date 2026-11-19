# ExpenseFlow

Production-grade SaaS personal finance web application built with React, Firebase, and Tailwind CSS.

## Features

- **Public Marketing Site** — Landing page, login, signup with premium fintech UI
- **Dashboard** — Balance overview, income vs expense charts, recent transactions
- **Transactions** — Full CRUD with search, filters, and categorization
- **Budgets** — Monthly category limits with progress tracking and overspend alerts
- **Goals** — Savings goals with deadlines and progress tracking
- **Analytics** — Pie charts, line charts, spending insights
- **Settings** — Theme toggle, currency selection, profile management

## Tech Stack

- React (Vite) · Tailwind CSS · React Router · Framer Motion · Zustand
- Recharts · Lucide React · React Hot Toast
- Firebase Auth · Firestore · Storage (final setup step)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5000](http://localhost:5000)

## Current Mode: Local (No Database)

The app runs with **Zustand + localStorage** for all data. Auth, transactions, budgets, and goals work fully without Firebase.

When you're ready to connect Firebase, see **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)**.

## Project Structure

```
src/
├── app/          # Routes, providers, Zustand stores
├── components/   # UI, layout, charts, transactions
├── pages/        # Landing, Auth, Dashboard, etc.
├── services/     # Firebase stubs (auto-switch when configured)
├── hooks/        # Custom React hooks
├── utils/        # Formatters, constants
└── styles/       # Tailwind + design tokens
```

## Scripts

| Command         | Description          |
|-----------------|----------------------|
| `npm run dev`   | Start dev server     |
| `npm run build` | Production build     |
| `npm run preview` | Preview production |

## Demo Login

Use any email/password in local mode — data persists in your browser.
