import { Router } from 'express';
import { pool } from '../db.js';
import { fireTemplateEmail } from '../lib/notify.js';

const router = Router();

const newId = (prefix) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

const isEmail = (v) => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// POST /api/inquiries  (ContactBooking form)
router.post('/inquiries', async (req, res, next) => {
  try {
    const {
      category = 'it',
      categoryName = '',
      budgetTier = '',
      name = '',
      email = '',
      phone = '',
      company = '',
      timeline = '',
      message = '',
    } = req.body || {};

    if (!name.trim() || !isEmail(email) || !phone.trim() || !message.trim()) {
      return res
        .status(400)
        .json({ ok: false, error: 'Name, valid email, phone and message are required.' });
    }

    const id = newId('INQ');
    await pool.query(
      `INSERT INTO inquiries
        (id, category, category_name, budget_tier, name, email, phone, company, timeline, message)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        category === 'film' ? 'film' : 'it',
        String(categoryName).slice(0, 120),
        String(budgetTier).slice(0, 150),
        String(name).slice(0, 150),
        String(email).slice(0, 200),
        String(phone).slice(0, 50),
        String(company).slice(0, 200),
        String(timeline).slice(0, 100),
        String(message),
      ]
    );

    // Automated emails (fire-and-forget — submission never waits on SMTP)
    fireTemplateEmail('inquiry_acknowledgement', email, {
      name: name.trim(),
      category_name: categoryName,
      company: company,
      message: message,
    });
    fireTemplateEmail('admin_new_inquiry', null, {
      name: name.trim(),
      email: email.trim(),
      phone: phone,
      company: company,
      budget_tier: budgetTier,
      message: message,
    });

    res.json({ ok: true, id });
  } catch (err) {
    next(err);
  }
});

// POST /api/projects  (ProjectModal form)
router.post('/projects', async (req, res, next) => {
  try {
    const {
      vertical = 'it',
      verticalName = '',
      name = '',
      email = '',
      phone = '',
      service = '',
      timeline = '',
      details = '',
    } = req.body || {};

    if (!name.trim() || !isEmail(email) || !phone.trim()) {
      return res
        .status(400)
        .json({ ok: false, error: 'Name, valid email and phone are required.' });
    }

    const id = newId('PROJ');
    await pool.query(
      `INSERT INTO project_requests
        (id, vertical, vertical_name, name, email, phone, service, timeline, details)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        vertical === 'film' ? 'film' : 'it',
        String(verticalName).slice(0, 120),
        String(name).slice(0, 150),
        String(email).slice(0, 200),
        String(phone).slice(0, 50),
        String(service).slice(0, 200),
        String(timeline).slice(0, 100),
        String(details),
      ]
    );

    // Automated emails
    fireTemplateEmail('project_request_received', email, {
      name: name.trim(),
      service: service,
      timeline: timeline,
      details: details,
    });
    fireTemplateEmail('admin_new_project', null, {
      name: name.trim(),
      email: email.trim(),
      phone: phone,
      service: service,
      timeline: timeline,
      details: details,
    });

    res.json({ ok: true, id });
  } catch (err) {
    next(err);
  }
});

// POST /api/applications  (Careers apply form)
router.post('/applications', async (req, res, next) => {
  try {
    const {
      jobId = '',
      jobTitle = '',
      vertical = '',
      name = '',
      email = '',
      phone = '',
      portfolio = '',
      note = '',
    } = req.body || {};

    if (!name.trim() || !isEmail(email) || !phone.trim() || !portfolio.trim()) {
      return res
        .status(400)
        .json({ ok: false, error: 'Name, valid email, phone and portfolio link are required.' });
    }

    const id = newId('JOB');
    await pool.query(
      `INSERT INTO career_applications
        (id, job_id, job_title, vertical, name, email, phone, portfolio, note)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        String(jobId).slice(0, 80),
        String(jobTitle).slice(0, 200),
        String(vertical).slice(0, 80),
        String(name).slice(0, 150),
        String(email).slice(0, 200),
        String(phone).slice(0, 50),
        String(portfolio).slice(0, 400),
        String(note),
      ]
    );

    // Automated emails
    fireTemplateEmail('career_application_received', email, {
      name: name.trim(),
      job_title: jobTitle,
      vertical: vertical,
      portfolio: portfolio,
    });
    fireTemplateEmail('admin_new_career', null, {
      name: name.trim(),
      email: email.trim(),
      phone: phone,
      job_title: jobTitle,
      portfolio: portfolio,
    });

    res.json({ ok: true, id });
  } catch (err) {
    next(err);
  }
});

// POST /api/casting  (CastingPortal 3-step form)
router.post('/casting', async (req, res, next) => {
  try {
    const {
      fullName = '',
      email = '',
      phone = '',
      city = '',
      roleCategory = '',
      portfolioUrl = '',
      experience = '',
      headshotName = '',
      headshotUploaded = false,
      bio = '',
    } = req.body || {};

    if (!fullName.trim() || !isEmail(email) || !phone.trim() || !portfolioUrl.trim()) {
      return res.status(400).json({
        ok: false,
        error: 'Full name, valid email, phone and showreel link are required.',
      });
    }

    const id = newId('CAST');
    await pool.query(
      `INSERT INTO casting_applications
        (id, full_name, email, phone, city, role_category, portfolio_url, experience,
         headshot_name, headshot_uploaded, bio)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        String(fullName).slice(0, 150),
        String(email).slice(0, 200),
        String(phone).slice(0, 50),
        String(city).slice(0, 120),
        String(roleCategory).slice(0, 150),
        String(portfolioUrl).slice(0, 400),
        String(experience).slice(0, 120),
        String(headshotName).slice(0, 255),
        headshotUploaded ? 1 : 0,
        String(bio),
      ]
    );

    // Automated emails
    fireTemplateEmail('casting_audition_received', email, {
      full_name: fullName.trim(),
      role_category: roleCategory,
      city: city,
      experience: experience,
    });
    fireTemplateEmail('admin_new_casting', null, {
      full_name: fullName.trim(),
      email: email.trim(),
      phone: phone,
      city: city,
      role_category: roleCategory,
      experience: experience,
    });

    res.json({ ok: true, id });
  } catch (err) {
    next(err);
  }
});

export default router;
