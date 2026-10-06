import { API_BASE } from './api';

// ---------- Low-level tag helpers ----------

function setMeta(attr, key, content) {
  if (content === undefined || content === null) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function removeMeta(attr, key) {
  const el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (el) el.remove();
}

function absoluteUrl(src) {
  if (!src) return '';
  if (/^https?:\/\//.test(src)) return src;
  return `${window.location.origin}${src.startsWith('/') ? '' : '/'}${src}`;
}

/**
 * Apply a bundle of meta data to the document:
 * title, description, keywords, robots, Open Graph & Twitter cards.
 */
export function applyMeta({ title, description, keywords, image, robots, ogType }) {
  if (title) document.title = title;
  if (description) setMeta('name', 'description', description);
  if (keywords !== undefined) setMeta('name', 'keywords', keywords);
  if (robots) setMeta('name', 'robots', robots);

  if (title) {
    setMeta('property', 'og:title', title);
    setMeta('name', 'twitter:title', title);
  }
  if (description) {
    setMeta('property', 'og:description', description);
    setMeta('name', 'twitter:description', description);
  }
  if (ogType) setMeta('property', 'og:type', ogType);
  setMeta('property', 'og:url', window.location.href);
  // image === '' explicitly CLEARS a previous share image (prevents stale OG images)
  if (image !== undefined && image !== null) {
    if (image) {
      setMeta('property', 'og:image', absoluteUrl(image));
      setMeta('name', 'twitter:image', absoluteUrl(image));
      setMeta('property', 'og:image:alt', title || 'Prodyum');
    } else {
      removeMeta('property', 'og:image');
      removeMeta('name', 'twitter:image');
      removeMeta('property', 'og:image:alt');
    }
  }
  setMeta('name', 'twitter:card', 'summary_large_image');
}

// ---------- Site-wide SEO (StackFood-style meta data setup) ----------

let seoCache = null;
let seoPromise = null;

// Must mirror the hardcoded tags in index.html so nothing "flickers" before the API responds
export const DEFAULT_SITE_META = {
  title: 'Prodyum | Architecting Digital Commerce & Cinematic Narratives',
  description:
    'Prodyum Pvt. Ltd. (Kukatpally, Hyderabad) - Dual-vertical enterprise powering high-performance IT & Creative Solutions and award-winning Cinematic Entertainments founded by Srikanth Singam.',
  keywords:
    'Prodyum, Srikanth Singam, IT Services Hyderabad, Web Development, Meta Ads, Film Production Hyderabad, Telugu Cinema, Kukatpally Production House',
  image: '',
};

async function fetchSeoRows() {
  if (seoCache) return seoCache;
  if (!seoPromise) {
    seoPromise = (async () => {
      try {
        const res = await fetch(`${API_BASE}/seo`);
        const data = await res.json();
        if (data.ok) {
          seoCache = data.data;
          return seoCache;
        }
      } catch {
        /* API down → defaults */
      }
      return [];
    })();
  }
  return seoPromise;
}

/** Load + apply the site default meta (page_key = 'site'). */
export async function initSiteSeo() {
  const rows = await fetchSeoRows();
  const site = rows.find((r) => r.page_key === 'site');
  const meta = site?.meta_title
    ? {
        title: site.meta_title,
        description: site.meta_description || DEFAULT_SITE_META.description,
        keywords: site.meta_keywords || DEFAULT_SITE_META.keywords,
        image: site.meta_image || DEFAULT_SITE_META.image,
        robots: site.robots,
        ogType: 'website',
      }
    : { ...DEFAULT_SITE_META, ogType: 'website' };
  applyMeta(meta);
  return meta;
}

/** Apply per-section meta when a section scrolls into view (StackFood per-page SEO). */
export async function applySectionSeo(sectionId) {
  const rows = await fetchSeoRows();
  const row = rows.find((r) => r.section_id === sectionId);
  if (row && (row.meta_title || row.meta_description)) {
    applyMeta({
      title: row.meta_title || undefined,
      description: row.meta_description || undefined,
      keywords: row.meta_keywords || undefined,
      image: row.meta_image || undefined,
      robots: row.robots,
      ogType: 'website',
    });
    return true;
  }
  return false;
}

/** Restore site defaults (e.g. after a film modal closes). */
export function restoreSiteSeo() {
  const rows = seoCache || [];
  const site = rows.find((r) => r.page_key === 'site');
  applyMeta({
    title: site?.meta_title || DEFAULT_SITE_META.title,
    description: site?.meta_description || DEFAULT_SITE_META.description,
    keywords: site?.meta_keywords || DEFAULT_SITE_META.keywords,
    image: site?.meta_image || DEFAULT_SITE_META.image,
    robots: site?.robots || 'index',
    ogType: 'website',
  });
}

/** Apply a film's own meta when its preview/trailer opens. */
export function applyFilmSeo(film) {
  if (!film) return;
  // API rows are snake_case; FilmSlate maps to camelCase — accept both
  const metaTitle = film.meta_title || film.metaTitle;
  const metaDescription = film.meta_description || film.metaDescription;
  const metaImage = film.meta_image || film.metaImage;
  applyMeta({
    title: metaTitle || `${film.title} — Prodyum ${film.type ? film.type : 'Production'}`,
    description:
      metaDescription ||
      film.synopsis ||
      `${film.title} — a Prodyum production${film.genre ? ` (${film.genre})` : ''}.`,
    image: metaImage || '',
    robots: 'index',
    ogType: 'video.movie',
  });
}
