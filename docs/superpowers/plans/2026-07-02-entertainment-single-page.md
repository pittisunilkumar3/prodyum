# Entertainment Single-Page Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert `/entertainment` from a multi-page site into a single scrolling page whose shared `Header` smooth-scrolls to sections on click — mirroring the existing `/it` single-page pattern.

**Architecture:** Reuse the `/it` mechanism verbatim: section components carry `id` + `scroll-mt-24`; the nav uses `<a href="/entertainment#section">` (native smooth scroll via `html { scroll-behavior: smooth }` in `index.css`); `ScrollToTop.jsx` handles deep-link/redirect arrivals; `Header.jsx` adds `IntersectionObserver` scroll-spy. `Home.jsx` becomes the single-page composer that imports the dedicated pages as sections. `App.js` turns the old sub-routes into `<Navigate>` redirects to anchors.

**Tech Stack:** React 19, Create React App + CRACO, React Router v7, Tailwind CSS, shadcn/ui (Radix), lucide-react. Build/test via `npm run build` (`craco build`); dev via `npm start` (`craco start`).

## Global Constraints

- **No content rewrites.** Reuse existing page contents verbatim; only change wrappers/links/ids.
- **No new dependencies.** Everything used (`scroll-mt-24`, `IntersectionObserver`, `scroll-behavior: smooth`, `Navigate`) already exists in the codebase.
- **Header visual design must stay identical** — only behavior (links + active-state source) changes.
- **Not a git repository** — there are no commit steps. Each task ends with a build checkpoint instead.
- **Test cycle reality:** the codebase has zero test files and no test infrastructure in use. Verification is `npm run build` (compile/lint check) + the manual browser checklist. Do not invent jest/RTL tests.
- **Section padding convention** (mirror `pages/it/*`): converted sections use `className="bg-black scroll-mt-24 py-20 lg:py-32"`.
- **Anchor scheme:** nav sections are `home`, `projects`, `services`, `investors`, `casting`, `contact` — each maps to an element `id` and a header link `/entertainment#<id>`.

---

## File Structure

- **Modify** `src/pages/Projects.jsx` — root `<div>` → `<section id="projects">` (becomes a section component).
- **Modify** `src/pages/Services.jsx` — root `<div>` → `<section id="services">`.
- **Modify** `src/pages/Investors.jsx` — root `<div>` → `<section id="investors">`.
- **Modify** `src/pages/Casting.jsx` — root `<div>` → `<section id="casting">`.
- **Modify** `src/pages/Contact.jsx` — root `<div>` → `<section id="contact">`.
- **Modify** `src/pages/Home.jsx` — becomes the single-page composer: hero `id="home"`, remove two teaser sections, render the 5 section components, convert internal `<Link>` CTAs to `<a href>` anchors.
- **Modify** `src/components/Header.jsx` — anchor nav + scroll-spy (visuals unchanged).
- **Modify** `src/components/Footer.jsx` — Contact link → anchor.
- **Modify** `src/App.js` — replace 5 component routes with `<Navigate>` redirects to anchors; move page imports into `Home.jsx`.

No files are created or deleted.

---

## Task 1: Convert the 5 dedicated pages into section components

**Files:**
- Modify: `src/pages/Projects.jsx`, `src/pages/Services.jsx`, `src/pages/Investors.jsx`, `src/pages/Casting.jsx`, `src/pages/Contact.jsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: each file's default export now renders a `<section id="<id>">` root with `scroll-mt-24`, so it can be dropped into the single page and targeted by `/entertainment#<id>` and observed by the header scroll-spy. Default export names (`Projects`, `Services`, `Investors`, `Casting`, `Contact`) are unchanged.

Each of the 5 files currently has this exact root element (verified):
```jsx
<div className="min-h-screen bg-black pt-32 pb-24">
```
and its matching final `</div>` immediately before `);`.

- [ ] **Step 1: Convert `src/pages/Projects.jsx` root to a section**

Replace the single occurrence of:
```jsx
<div className="min-h-screen bg-black pt-32 pb-24">
```
with:
```jsx
<section id="projects" className="bg-black scroll-mt-24 py-20 lg:py-32">
```
Then replace the matching final closing tag (the last `</div>` before `);` / `export default Projects;`) with:
```jsx
</section>
```
Leave all inner markup and content unchanged.

- [ ] **Step 2: Convert `src/pages/Services.jsx` root to a section**

Same edit, id `services`:
```jsx
<section id="services" className="bg-black scroll-mt-24 py-20 lg:py-32">
```
and final `</div>` → `</section>`.

- [ ] **Step 3: Convert `src/pages/Investors.jsx` root to a section**

Same edit, id `investors`:
```jsx
<section id="investors" className="bg-black scroll-mt-24 py-20 lg:py-32">
```
and final `</div>` → `</section>`.

- [ ] **Step 4: Convert `src/pages/Casting.jsx` root to a section**

Same edit, id `casting`:
```jsx
<section id="casting" className="bg-black scroll-mt-24 py-20 lg:py-32">
```
and final `</div>` → `</section>`.

- [ ] **Step 5: Convert `src/pages/Contact.jsx` root to a section**

Same edit, id `contact`:
```jsx
<section id="contact" className="bg-black scroll-mt-24 py-20 lg:py-32">
```
and final `</div>` → `</section>`.

- [ ] **Step 6: Verify build compiles**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 7: Verify ids are present**

Run: `grep -nE 'id="(projects|services|investors|casting|contact)"' src/pages/Projects.jsx src/pages/Services.jsx src/pages/Investors.jsx src/pages/Casting.jsx src/pages/Contact.jsx`
Expected: exactly one match per file, each on its `<section>` line.

---

## Task 2: Turn `Home.jsx` into the single-page composer

**Files:**
- Modify: `src/pages/Home.jsx`

**Interfaces:**
- Consumes: the 5 section components from Task 1 (`Projects`, `Services`, `Investors`, `Casting`, `Contact` as default exports).
- Produces: `Home` renders the entire single page at `/entertainment`, containing elements with ids `home`, `projects`, `services`, `investors`, `casting`, `contact` (plus existing non-nav content sections: synopsis, presentation, timeline, testimonials, team, CTA). This is what `App.js` mounts at `/entertainment` and what `Header.jsx` scroll-spy observes.

**Final section order on the page** (preserves existing Home content in place; only the two teaser sections are replaced, and Investors/Casting/Contact are appended at the end):

`home` (hero) → `section-synopsis` → **Projects** → **Services** → `section-presentation` → Timeline → Testimonials → Team → CTA → **Investors** → **Casting** → **Contact**.

- [ ] **Step 1: Add section-component imports**

In `src/pages/Home.jsx`, after the existing component imports (lines 7–9: `TestimonialSection`, `TeamSection`, `TimelineSection`), add:
```jsx
import ProjectsSection from './Projects';
import ServicesSection from './Services';
import InvestorsSection from './Investors';
import CastingSection from './Casting';
import ContactSection from './Contact';
```

- [ ] **Step 2: Give the hero an `id="home"`**

Replace (line 52):
```jsx
<section className="relative h-screen flex items-center justify-center overflow-hidden">
```
with:
```jsx
<section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
```

- [ ] **Step 3: Replace the teaser Projects section with the full Projects component**

Delete the entire teaser block — the comment and `<section>` spanning from:
```jsx
      {/* Latest Projects Carousel */}
      <section id="section-projects" className="py-32 bg-black">
```
through its closing:
```jsx
      </section>
```
(lines ~256–334) and replace the whole block with:
```jsx
      {/* Projects (full section) */}
      <ProjectsSection />
```

- [ ] **Step 4: Replace the teaser Services section with the full Services component**

Delete the teaser block from:
```jsx
      {/* Services with Icons */}
      <section id="section-services" className="py-32 bg-neutral-950">
```
through its closing `</section>` (lines ~336–392) and replace with:
```jsx
      {/* Services (full section) */}
      <ServicesSection />
```

- [ ] **Step 5: Convert remaining in-page CTA `<Link>`s to anchor `<a>`s**

These are the `<Link to="/entertainment/...">` occurrences that remain after the teaser deletions. Replace each `<Link to="/entertainment/X">` with `<a href="/entertainment#X">` (keep all child content, classNames, and surrounding `<Button asChild>` exactly as-is):

- Hero "View Projects": `<Link to="/entertainment/projects">` → `<a href="/entertainment#projects">`
- Hero "Investor Info": `<Link to="/entertainment/investors">` → `<a href="/entertainment#investors">`
- Synopsis "Explore Services": `<Link to="/entertainment/services">` → `<a href="/entertainment#services">`
- Presentation CTA "Investor Information": `<Link to="/entertainment/investors">` → `<a href="/entertainment#investors">`
- Presentation CTA "Contact Us": `<Link to="/entertainment/contact">` → `<a href="/entertainment#contact">`
- Bottom CTA "Investor Information": `<Link to="/entertainment/investors">` → `<a href="/entertainment#investors">`
- Bottom CTA "Apply: Cast & Crew": `<Link to="/entertainment/casting">` → `<a href="/entertainment#casting">`

- [ ] **Step 6: Append Investors, Casting, Contact sections at the end of the page**

Immediately before the page's closing `</div>` (the one that closes `<div className="min-h-screen">`, right before the bottom CTA section's `</section>` … actually right after the bottom CTA `</section>` and before `</div>`), insert:
```jsx
      {/* Investors (full section) */}
      <InvestorsSection />

      {/* Casting & Crew (full section) */}
      <CastingSection />

      {/* Contact (full section) */}
      <ContactSection />
```
Concretely, the tail of the JSX becomes:
```jsx
      {/* CTA Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* ...existing CTA content unchanged... */}
      </section>

      {/* Investors (full section) */}
      <InvestorsSection />

      {/* Casting & Crew (full section) */}
      <CastingSection />

      {/* Contact (full section) */}
      <ContactSection />
    </div>
  );
```

- [ ] **Step 7: Remove now-unused imports/variables**

After removing the two teaser sections, several symbols are no longer used. Clean them up so the build has no dead code:

- Remove `services` from the mock import. Change line 6:
  ```jsx
  import { projects, services } from '../mock';
  ```
  to:
  ```jsx
  import { projects } from '../mock';
  ```
- Remove the `featuredServices` line (was `const featuredServices = services.slice(0, 4);`).
- Remove the `latestProjects` line (was `const latestProjects = projects.slice(0, 3);`). Keep `heroProjects`.
- The `Link` import is now unused. Remove line 2:
  ```jsx
  import { Link } from 'react-router-dom';
  ```

Note: the `IntersectionObserver` scroll-animation effect (lines ~27–44) keys off `[id^="section-"]`; `section-synopsis` and `section-presentation` still match, so leave that effect untouched.

- [ ] **Step 8: Verify build compiles**

Run: `npm run build`
Expected: succeeds, no errors. (If an "unused variable" warning remains for a symbol you missed, remove it too — CRA build does not fail on warnings, but keep it clean.)

- [ ] **Step 9: Verify composition anchors exist**

Run: `grep -nE 'id="(home|section-synopsis|section-presentation)"|<(Projects|Services|Investors|Casting|Contact)Section' src/pages/Home.jsx`
Expected: matches for `id="home"`, the two retained `section-*` ids, and the five `<XSection />` usages.

---

## Task 3: Convert `Header.jsx` to anchor nav + scroll-spy

**Files:**
- Modify: `src/components/Header.jsx`

**Interfaces:**
- Consumes: section ids `home, projects, services, investors, casting, contact` produced by Task 2 (elements must exist in the DOM for the observer).
- Produces: the shared header whose nav items link to `/entertainment#<section>` and highlight the in-view section. Visual appearance is identical to before.

Replace the entire contents of `src/components/Header.jsx` with:

```jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  // Each nav item maps to a section id on the single /entertainment page.
  const navLinks = [
    { section: 'home', label: 'Home' },
    { section: 'projects', label: 'Projects' },
    { section: 'services', label: 'Services' },
    { section: 'investors', label: 'Investors' },
    { section: 'casting', label: 'Casting & Crew' },
    { section: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-spy: highlight the nav item for whichever section is in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    navLinks.forEach(({ section }) => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const isEntertainmentPage = location.pathname.startsWith('/entertainment');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/50' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to={isEntertainmentPage ? "/entertainment" : "/"} className="flex items-center space-x-3 group relative z-10">
            <div className="relative">
              <img
                src="/logo.png"
                alt="ProDyum Logo"
                className={`h-12 w-12 object-contain transition-all duration-300 group-hover:scale-110 ${
                  isScrolled ? 'opacity-50' : 'opacity-100'
                }`}
              />
              <div className="absolute inset-0 bg-prodyum-green-500/20 blur-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-white">ProDyum</span>
              <span className="bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500 bg-clip-text text-transparent ml-1">{isEntertainmentPage ? 'Entertainments' : 'IT'}</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.section}
                href={`/entertainment#${link.section}`}
                onClick={handleNavClick}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group ${
                  activeSection === link.section
                    ? 'text-prodyum-green-500'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500 transition-all duration-300 ${
                  activeSection === link.section ? 'w-3/4' : 'w-0 group-hover:w-3/4'
                }`} />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              asChild
              className={`bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 text-white hover:from-prodyum-blue-600 hover:to-prodyum-green-600 font-bold px-6 transition-all duration-300 hover:shadow-lg hover:shadow-prodyum-green-500/50 hover:scale-105 ${
                isScrolled ? 'hover:shadow-prodyum-green-500/30' : 'hover:shadow-prodyum-green-500/50'
              }`}
            >
              <a href="/entertainment#contact">Get Started</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 relative z-10"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/5 animate-in slide-in-from-top-5 duration-300">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.section}
                  href={`/entertainment#${link.section}`}
                  onClick={handleNavClick}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSection === link.section
                      ? 'text-prodyum-green-500 bg-prodyum-green-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <Button
                asChild
                className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 text-white hover:from-prodyum-blue-600 hover:to-prodyum-green-600 font-bold mt-4"
              >
                <a href="/entertainment#contact" onClick={handleNavClick}>
                  Get Started
                </a>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
```

What changed vs. the original (for the reviewer): `Home` icon import removed (unused after switch); `navLinks` use `section` instead of `path`; added `activeSection` state + the `IntersectionObserver` effect (same config as `ITHeader.jsx`); desktop nav, mobile nav, and both CTAs switched from `<Link to="/entertainment/...">` to `<a href="/entertainment#...">`; active styling keyed on `activeSection === link.section`. All classNames, gradients, and layout are byte-identical to the original.

- [ ] **Step 1: Replace `src/components/Header.jsx`** with the code above.

- [ ] **Step 2: Verify build compiles**

Run: `npm run build`
Expected: succeeds, no errors.

---

## Task 4: Point the Footer Contact link at the contact section

**Files:**
- Modify: `src/components/Footer.jsx`

**Interfaces:**
- Consumes: the `contact` section id from Task 2.
- Produces: footer "Contact" link smooth-scrolls to the contact section instead of routing.

- [ ] **Step 1: Convert the footer Contact link to an anchor**

In `src/components/Footer.jsx`, replace (line 50):
```jsx
<Link to="/entertainment/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
  Contact
</Link>
```
with:
```jsx
<a href="/entertainment#contact" className="text-gray-400 hover:text-white transition-colors text-sm">
  Contact
</a>
```

Leave all other footer links (logo, ProDyum IT, ProDyum Entertainments, the existing `<a href="#about">`, mailto, socials) unchanged. `Link` is still used elsewhere in this file, so keep its import.

- [ ] **Step 2: Verify build compiles**

Run: `npm run build`
Expected: succeeds, no errors.

---

## Task 5: Convert `App.js` sub-routes to anchor redirects

**Files:**
- Modify: `src/App.js`

**Interfaces:**
- Consumes: `Home` (now the single-page composer) and `Navigate` (already imported).
- Produces: `/entertainment` renders the full single page; the 5 old sub-routes 301-style redirect to `/entertainment#<section>` so any old bookmarks/links still work and scroll to the right place.

- [ ] **Step 1: Remove the now-unused page imports from `App.js`**

`Projects`, `Services`, `Investors`, `Casting`, `Contact` are now imported and rendered inside `Home.jsx` (Task 2), so `App.js` no longer needs them. Delete these import lines (lines 13–17):
```jsx
import Projects from './pages/Projects';
import Services from './pages/Services';
import Investors from './pages/Investors';
import Casting from './pages/Casting';
import Contact from './pages/Contact';
```
Keep the `Home` import (line 12) and `Landing`/`ComingSoon` if still referenced.

- [ ] **Step 2: Replace the 5 component routes with anchor redirects**

Replace the entertainment routes block (lines 53–59):
```jsx
          {/* Prodyum Entertainments - Main Website */}
          <Route path="/entertainment" element={<EntertainmentLayout><Home /></EntertainmentLayout>} />
          <Route path="/entertainment/projects" element={<EntertainmentLayout><Projects /></EntertainmentLayout>} />
          <Route path="/entertainment/services" element={<EntertainmentLayout><Services /></EntertainmentLayout>} />
          <Route path="/entertainment/investors" element={<EntertainmentLayout><Investors /></EntertainmentLayout>} />
          <Route path="/entertainment/casting" element={<EntertainmentLayout><Casting /></EntertainmentLayout>} />
          <Route path="/entertainment/contact" element={<EntertainmentLayout><Contact /></EntertainmentLayout>} />
```
with:
```jsx
          {/* Prodyum Entertainments - Single Page Site */}
          <Route path="/entertainment" element={<EntertainmentLayout><Home /></EntertainmentLayout>} />

          {/* Legacy entertainment routes redirect to sections on the single page */}
          <Route path="/entertainment/projects" element={<Navigate to="/entertainment#projects" replace />} />
          <Route path="/entertainment/services" element={<Navigate to="/entertainment#services" replace />} />
          <Route path="/entertainment/investors" element={<Navigate to="/entertainment#investors" replace />} />
          <Route path="/entertainment/casting" element={<Navigate to="/entertainment#casting" replace />} />
          <Route path="/entertainment/contact" element={<Navigate to="/entertainment#contact" replace />} />
```

`EntertainmentLayout` (Header + Footer wrapper) is unchanged and still wraps `Home`. `Navigate` is already imported at the top of `App.js`.

- [ ] **Step 3: Verify build compiles**

Run: `npm run build`
Expected: succeeds, no errors, and no "unused import" warnings for the removed page imports.

---

## Task 6: End-to-end manual verification in the browser

**Files:** none (verification only).

- [ ] **Step 1: Start the dev server**

Run: `npm start`
Expected: compiles and opens/serves at `http://localhost:3000`.

- [ ] **Step 2: Verify the single page + nav scroll**

Open `http://localhost:3000/entertainment`. For each nav item — Home, Projects, Services, Investors, Casting & Crew, Contact — click it and confirm:
- The page **smooth-scrolls** to that section (no full page reload, no route change — URL stays `/entertainment` or shows the `#section` hash).
- The clicked item becomes the highlighted/active nav item (green text + underline) as you scroll.

- [ ] **Step 3: Verify in-page CTAs scroll**

On `/entertainment`, click the hero "View Projects" and "Investor Info" buttons, the synopsis "Explore Services" button, and the bottom CTA "Apply: Cast & Crew" button. Each should smooth-scroll to its section (Projects / Investors / Services / Casting respectively).

- [ ] **Step 4: Verify deep link**

Open `http://localhost:3000/entertainment#contact` in a fresh tab. Expected: page loads, then smooth-scrolls to the Contact section (handled by `ScrollToTop.jsx`).

- [ ] **Step 5: Verify legacy redirect**

Open `http://localhost:3000/entertainment/projects` in a fresh tab. Expected: URL becomes `/entertainment#projects` and the page scrolls to the Projects section.

- [ ] **Step 6: Verify header visuals + footer**

Confirm the header looks identical to before (transparent over hero, solid black on scroll) and the footer "Contact" link scrolls to the contact section.

- [ ] **Step 7: Verify `/it` is untouched**

Open `http://localhost:3000/it` and click a couple of nav items. Expected: behaves exactly as before (no regressions).

---

## Self-Review Notes (completed during planning)

- **Spec coverage:** Every spec section maps to a task — section conversion (Task 1), Home composer + order + CTA conversion (Task 2), Header anchor + scroll-spy (Task 3), Footer (Task 4), App.js redirects (Task 5), verification incl. deep link + legacy redirect (Task 6). ✓
- **No placeholders:** all code blocks are complete and copy-pasteable; section ids and class names are consistent across tasks (`home/projects/services/investors/casting/contact`, `scroll-mt-24`, `py-20 lg:py-32`). ✓
- **Type/name consistency:** default export names `Projects/Services/Investors/Casting/Contact` are preserved in Task 1 and imported as `ProjectsSection/...ContactSection` in Task 2; header `navLinks` sections in Task 3 match the ids produced in Task 2. ✓
- **Order reconciliation:** the spec's nav order (home→…→contact) is honored; existing non-nav Home sections (synopsis, presentation, timeline, testimonials, team, CTA) are kept in their current positions, with Investors/Casting/Contact appended last so Contact is final. Stated explicitly in Task 2. ✓
