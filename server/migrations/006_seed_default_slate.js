/**
 * Seeds the slate with the content that was previously hardcoded in
 * src/data/content.js so the public site keeps its films after the CMS switch.
 */

export async function up(pool) {
  await pool.query(`
    INSERT IGNORE INTO film_categories (id, name, slug, priority, published) VALUES
      (1, 'Web Series',      'web-series',      1, 1),
      (2, 'Feature & Shorts','feature-shorts',  2, 1),
      (3, 'Musical Cinema',  'musical-cinema',  3, 1)
  `);

  await pool.query(`
    INSERT IGNORE INTO film_projects
      (id, category_id, title, type, genre, director, release_date, aspect_ratio,
       resolution, audio, status, timecode, synopsis, cast_info, poster_gradient, priority, published)
    SELECT 'deccan-chronicles', c.id, 'Chronicles of Deccan', 'Web Series (Season 1)',
           'Epic Historical Drama', 'Srikanth Singam', 'Q4 2026', '2.39:1 Anamorphic',
           '4K Ultra-HD HDR', 'Dolby Atmos 7.1', 'Post-Production', '01:42:19:14',
           'An untold saga set across the Golconda bastions and Deccan dynasties, tracing the struggle between imperial intrigue and regional sovereignty with monumental cinematic scale.',
           'Regional Ensemble • Telugu / Hindi / Tamil Multi-Audio',
           'from-amber-900/60 via-obsidian-surface to-black', 1, 1
    FROM film_categories c WHERE c.slug = 'web-series'
  `);

  await pool.query(`
    INSERT IGNORE INTO film_projects
      (id, category_id, title, type, genre, director, release_date, aspect_ratio,
       resolution, audio, status, timecode, synopsis, cast_info, poster_gradient, priority, published)
    SELECT 'echoes-silence', c.id, 'Echoes of Silence', 'Independent Short Film',
           'Psychological Noir Thriller', 'Srikanth Singam', 'Official Festival Run 2026',
           '2.39:1 Anamorphic', '4K DCI Masters', '5.1 Surround Sound', 'Festival Circuit',
           '00:24:18:02',
           'In the rain-drenched alleys of old Hyderabad, a forensic sound engineer discovers an auditory anomaly on a recovered magnetic tape that incriminates high-society figures.',
           'Critically Acclaimed Independent Cast',
           'from-blue-950/70 via-obsidian-surface to-black', 2, 1
    FROM film_categories c WHERE c.slug = 'feature-shorts'
  `);

  await pool.query(`
    INSERT IGNORE INTO film_projects
      (id, category_id, title, type, genre, director, release_date, aspect_ratio,
       resolution, audio, status, timecode, synopsis, cast_info, poster_gradient, priority, published)
    SELECT 'project-kukatpally', c.id, 'Project Kukatpally', 'Commercial Slate & Feature Drama',
           'Contemporary Urban Noir', 'Prodyum Studio Team', 'Mid 2027', '2.39:1 Anamorphic',
           'Arri Alexa 4.5K Open Gate', 'Dolby Atmos', 'Pre-Production / Casting Open',
           '00:08:45:10',
           'The collision of Hyderabad''s runaway tech boom and the gritty, relentless pulse of Kukatpally''s commercial corridors in a tense character-driven heist drama.',
           'Open Auditions Live',
           'from-orange-950/60 via-obsidian-surface to-black', 3, 1
    FROM film_categories c WHERE c.slug = 'feature-shorts'
  `);

  await pool.query(`
    INSERT IGNORE INTO film_projects
      (id, category_id, title, type, genre, director, release_date, aspect_ratio,
       resolution, audio, status, timecode, synopsis, cast_info, poster_gradient, priority, published)
    SELECT 'rhythm-telangana', c.id, 'Rhythm of Telangana', 'Cinematic Music Series',
           'Folk-Electronic Fusion', 'Creative Direction: Srikanth Singam',
           'Streaming Worldwide', '16:9 Cinema', '4K 60FPS Vivid', 'Spatial Audio 96kHz',
           'Now Streaming', '00:04:12:00',
           'Reimagining timeless Telangana folk poetry with heavy electronic synthesizers, live percussion, and cinematic drone tapestries shot across pristine rural landscapes.',
           'Featuring 14 Folk Virtuosos & Electronic Producers',
           'from-amber-950/60 via-purple-950/40 to-black', 4, 1
    FROM film_categories c WHERE c.slug = 'musical-cinema'
  `);
}

export async function down(pool) {
  await pool.query(
    "DELETE FROM film_projects WHERE id IN ('deccan-chronicles','echoes-silence','project-kukatpally','rhythm-telangana')"
  );
  await pool.query(
    "DELETE FROM film_categories WHERE slug IN ('web-series','feature-shorts','musical-cinema')"
  );
}
