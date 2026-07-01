# Entertainment Single-Page Site — Design

**Date:** 2026-07-02
**Status:** Approved (recommended section order)
**Scope:** Convert `/entertainment` from a multi-page site into a single scrolling page, mirroring the existing `/it` single-page pattern.

## Goal

`/entertainment` becomes one page. The shared `Header` keeps its current visual design, but nav clicks **smooth-scroll** to a section on that page instead of navigating to a separate route. This reuses the exact mechanism already implemented for the `/it` site.

## How Scrolling Works (existing infrastructure, reused — no new dependencies)

- `src/index.css` defines `html { scroll-behavior: smooth }`.
- Nav links are plain `<a href="/entertainment#section">`. Same-path hash clicks scroll natively and smoothly; cross-route clicks land via `ScrollToTop.jsx`.
- `src/components/ScrollToTop.jsx` already handles deep links and legacy-redirect arrivals (e.g. landing on `/entertainment#contact`) by smooth-`scrollIntoView` after mount.
- Each target section uses `id="…"` + Tailwind `scroll-mt-24` to clear the fixed 80px header.

## Section Order (approved: recommended)

On the single `/entertainment` page, top to bottom:

1. **Home** (hero) — `id="home"`
2. **Synopsis** — existing `section-synopsis` (not a nav target; kept as content)
3. **Projects** — `id="projects"`
4. **Services** — `id="services"`
5. **Presentation** — existing `section-presentation` (not a nav target; kept as content)
6. **Investors** — `id="investors"`
7. **Casting & Crew** — `id="casting"`
8. **Contact** — `id="contact"`

## Changes by File

### 1. Section components — convert 5 pages to sections

Each dedicated entertainment page currently returns `<div className="min-h-screen bg-black pt-32 pb-24">` (standalone-page styling). Convert the root to a `<section>` with an id and section padding, mirroring `pages/it/Services.jsx` (`<section id="services" className="bg-black scroll-mt-24">`):

| File | Section id |
|---|---|
| `src/pages/Projects.jsx` | `projects` |
| `src/pages/Services.jsx` | `services` |
| `src/pages/Investors.jsx` | `investors` |
| `src/pages/Casting.jsx` | `casting` |
| `src/pages/Contact.jsx` | `contact` |

Conversion rule per file: root `<div className="min-h-screen bg-black pt-32 pb-24">` → `<section id="<id>" className="bg-black scroll-mt-24 py-20 lg:py-28">`. Keep all internal markup and content unchanged.

### 2. `src/pages/Home.jsx` → single-page composer

Mirrors the role of `pages/it/Home.jsx`:

- Add `id="home"` to the hero `<section>` (currently `className="relative h-screen …"`).
- Remove the duplicate teaser sections `section-projects` and `section-services` (their content is superseded by the full section components below).
- Keep the unique sections `section-synopsis` and `section-presentation`.
- Import and render the section components in the approved order: Synopsis, `<ProjectsSection/>`, `<ServicesSection/>`, Presentation, `<InvestorsSection/>`, `<CastingSection/>`, `<ContactSection/>`.
- Convert all internal CTA `<Link to="/entertainment/…">` buttons to `<a href="/entertainment#…">` so in-page CTAs also smooth-scroll. Affected lines: projects, services, investors, casting, contact links (≈10 occurrences).
- `Home.jsx` does **not** import Header/Footer (App wraps it), so no double header.

### 3. `src/components/Header.jsx` — same look, anchor behavior

Visually unchanged. Behavioral changes to match `ITHeader.jsx`:

- `navLinks`: change from `{ path, label }` to `{ section, label }` with sections `home, projects, services, investors, casting, contact` (label for casting stays `"Casting & Crew"`).
- Desktop + mobile nav items: `<Link to={link.path}>` → `<a href={`/entertainment#${link.section}`}>`.
- Add scroll-spy: `activeSection` state + `IntersectionObserver` (same config as `ITHeader`: `rootMargin: '-45% 0px -50% 0px', threshold: 0`) observing each section; active styling keyed on `activeSection === link.section`.
- "Get Started" CTA (desktop + mobile): `<Link to="/entertainment/contact">` → `<a href="/entertainment#contact">`.
- Mobile menu continues to close on click.
- Logo remains `<Link to="/entertainment">`.

### 4. `src/components/Footer.jsx`

- Change `<Link to="/entertainment/contact">` (footer Contact link) → `<a href="/entertainment#contact">`.
- Leave the logo link, `/it` link, and social links unchanged.
- Note: there is an existing `<a href="#about">` in the footer that does not map to an entertainment section; leave as-is (out of scope) unless it is trivially safe to repoint.

### 5. `src/App.js`

Mirror the `/it` routing block:

- Keep `<Route path="/entertainment" element={<EntertainmentLayout><Home /></EntertainmentLayout>} />`.
- Replace the 5 routed component routes with legacy redirects:
  - `/entertainment/projects` → `<Navigate to="/entertainment#projects" replace />`
  - `/entertainment/services` → `<Navigate to="/entertainment#services" replace />`
  - `/entertainment/investors` → `<Navigate to="/entertainment#investors" replace />`
  - `/entertainment/casting` → `<Navigate to="/entertainment#casting" replace />`
  - `/entertainment/contact` → `<Navigate to="/entertainment#contact" replace />`
- `EntertainmentLayout` (Header + Footer wrapper) stays.
- `Home.jsx` now imports Projects/Services/Investors/Casting/Contact as section components, so those imports move from `App.js` into `Home.jsx`; remove the now-unused imports from `App.js`.

## Out of Scope

- No content rewrites — existing page contents are reused verbatim as sections.
- No backend / API / data changes.
- The `/it` site is untouched.
- No new dependencies.

## Verification

- Run `npm start` (CRACO), open `http://localhost:3000/entertainment`.
- Click each nav item (Home, Projects, Services, Investors, Casting & Crew, Contact) → page smooth-scrolls to the section; the active item highlights.
- In-page CTA buttons (e.g. "Explore Projects") scroll instead of navigating.
- Deep link `http://localhost:3000/entertainment#contact` lands on Contact after load.
- Legacy URL `http://localhost:3000/entertainment/projects` redirects to `/entertainment#projects` and scrolls.
- Header visual appearance is identical to before.
