# Support Ticket UI

React SPA for the SUPPORT-2847 internal support ticket tracker.

## Prerequisites

- Node.js 18+
- Backend API running on `http://localhost:8080` (`support-ticket-service`)

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Vite proxies `/api` to the backend.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` |

## Routes

| Path | Screen |
|------|--------|
| `/` | Ticket list with search and status filter |
| `/new` | Create ticket form |
| `/tickets/:id` | Detail, edit, comments, status actions |
