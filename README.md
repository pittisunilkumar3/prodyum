# Prodyum

> Ultra-Premium Dual-Vertical Enterprise Digital Experience for **Prodyum Pvt. Ltd.** (prodyum.in)

Founded by Srikanth Singam in Kukatpally, Hyderabad, Prodyum operates two synergistic divisions:
1. **ProDyum IT & Creative Services**: High-performance web development, SEO dominance, Meta Ads performance marketing, 3D brand identity, and AI creative solutions.
2. **ProDyum Entertainments**: Feature film productions, web series, short films, music videos, artist casting, and line production.

---

## Tech Stack
- **Frontend**: React 18 + Vite, Tailwind CSS, Lucide React
- **Backend**: Express (Node) + `mysql2`, JWT auth (httpOnly cookie), bcryptjs
- **Database**: MySQL (local XAMPP for development) with a versioned migration system
- **Canvas Engine**: HTML5 Canvas procedural kinetic mesh & audio-visual waveform scrubber
- **Typography**: Syne (Display), Plus Jakarta Sans (UI), Space Mono (Badges & Metrics), Inter (Body)

---

## Project Structure

```
├── src/                    # Public website (React)
│   ├── components/         #   marketing site sections
│   ├── admin/              #   /admin superadmin dashboard (code-split)
│   ├── lib/api.js          #   API client + offline localStorage fallback
│   └── data/content.js     #   all site copy/data
├── server/                 # Express API backend
│   ├── index.js            #   app entry (auto-runs migrations on boot)
│   ├── db.js               #   MySQL pool + ensureDatabase()
│   ├── migrate.js          #   migration runner (up / status / rollback)
│   ├── migrations/         #   versioned migration files (001, 002, …)
│   ├── routes/             #   auth.js, submissions.js, admin.js
│   ├── middleware/auth.js  #   JWT session guard
│   └── schema.sql          #   reference snapshot (migrations are authoritative)
└── .env                    # DB + auth config (never committed)
```

---

## Development Setup (XAMPP MySQL)

1. **Start XAMPP** → launch the **MySQL** module (Apache not required).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure `.env` (defaults match stock XAMPP: user `root`, empty password):
   ```env
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=prodyum
   JWT_SECRET=<long-random-string>
   ADMIN_USERNAME=superadmin
   ADMIN_PASSWORD=Prodyum@2025
   ```
4. Run everything (Vite dev server + API + auto-migrations):
   ```bash
   npm run dev:all
   ```

| URL | What |
|---|---|
| `http://localhost:5173` | Public website |
| `http://localhost:5173/admin` | Superadmin dashboard |
| `http://localhost:5000/api/health` | API health check |

Login with `ADMIN_USERNAME` / `ADMIN_PASSWORD` from `.env`.

### Production-style local run
```bash
npm run build     # frontend → dist/
npm start         # Express serves dist/ + API on http://localhost:5000
```

---

## Database Migrations

The database schema is **versioned and tracked** in the `schema_migrations` table.
Migration files live in `server/migrations/` and run in filename order (`001_…`, `002_…`).

```bash
npm run db:migrate     # apply all pending migrations
npm run db:status      # show applied/pending migrations
npm run db:rollback    # revert the most recently applied migration (down())
```

The API server also runs pending migrations automatically on boot, so `npm run dev:all`
is enough on a fresh machine.

### How to add a new migration

1. Create `server/migrations/004_your_change.js`:
   ```js
   export async function up(pool) {
     await pool.query('ALTER TABLE inquiries ADD COLUMN source VARCHAR(60) DEFAULT NULL');
   }
   export async function down(pool) {
     await pool.query('ALTER TABLE inquiries DROP COLUMN source');
   }
   ```
2. Run `npm run db:migrate`.

Rules: never edit an already-applied migration — always add a new numbered file.

---

## How Submissions Flow

```
Website form ──POST /api/inquiries|projects|applications|casting──▶ MySQL
                     │
                     └─ API unreachable? → falls back to localStorage,
                        site never breaks (toast tells the user)
Superadmin ──GET/PATCH/DELETE /api/admin/*──▶ manage records,
                                              statuses, CSV export
```

---

## Deployment Note

Local XAMPP MySQL is only reachable from your machine. For the live Vercel site,
point `DB_*` env vars at a cloud MySQL (TiDB Cloud / Aiven / Railway / VPS) —
no code changes needed, then run `npm run db:migrate` once against it.
