import { useState, useEffect, useRef, useCallback } from 'react';
import { Mail, BookOpen, X, Loader2, CheckCircle2, AlertCircle, Upload, Paperclip } from 'lucide-react';
import { ADMIN_API } from '../lib/api';

// ---------- CKEditor 4 (same approach as CINICA — loaded from CDN, textarea fallback) ----------
function CKEditor4({ value, onChange }) {
  const textareaRef = useRef(null);
  const editorRef = useRef(null);
  const isReady = useRef(false);
  const [failed, setFailed] = useState(false);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!window.CKEDITOR) {
      const script = document.createElement('script');
      script.src = 'https://cdn.ckeditor.com/4.20.0/standard-all/ckeditor.js';
      script.onload = () => initEditor();
      script.onerror = () => setFailed(true);
      // CDN unreachable → fall back to a plain textarea
      setTimeout(() => {
        if (!window.CKEDITOR && !editorRef.current) setFailed(true);
      }, 8000);
      document.head.appendChild(script);
    } else {
      initEditor();
    }
    return () => {
      if (editorRef.current) {
        try { window.CKEDITOR.instances[editorRef.current.name]?.destroy(); } catch (e) { /* noop */ }
        editorRef.current = null;
        isReady.current = false;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [failed]);

  const initEditor = () => {
    if (textareaRef.current && window.CKEDITOR && !editorRef.current) {
      const editor = window.CKEDITOR.replace(textareaRef.current, {
        toolbar: [
          { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', '-', 'RemoveFormat'] },
          { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote'] },
          { name: 'links', items: ['Link', 'Unlink'] },
          { name: 'insert', items: ['Table', 'Image'] },
          { name: 'styles', items: ['Styles', 'Format'] },
          { name: 'tools', items: ['Maximize', '-', 'Source', '-', 'Undo', 'Redo'] },
        ],
        removeButtons: '',
        height: 220,
        removeDialogTabs: 'image:advanced;link:advanced',
        startupFocus: false,
        uiColor: '#f8f9fa',
        allowedContent: true,
        extraAllowedContent: '*(*);*{*}',
        pasteFilter: null,
        autoParagraph: false,
        enterMode: window.CKEDITOR.ENTER_BR,
        shiftEnterMode: window.CKEDITOR.ENTER_P,
        customConfig: '',
        protectSource: true,
      });
      editorRef.current = editor;
      if (value) editor.setData(value);
      editor.on('change', () => {
        onChangeRef.current && onChangeRef.current(editor.getData());
      });
      isReady.current = true;
    }
  };

  useEffect(() => {
    if (isReady.current && editorRef.current && value !== undefined) {
      const current = editorRef.current.getData();
      if (current !== value) {
        editorRef.current.setData(value || '', { noSnapshot: true });
      }
    }
  }, [value]);

  if (failed) {
    return (
      <textarea
        value={value || ''}
        onChange={(e) => onChangeRef.current && onChangeRef.current(e.target.value)}
        rows={10}
        className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/15 focus:border-cyan-accent focus:outline-none text-white text-xs font-mono leading-relaxed"
        placeholder="Rich text editor unavailable (CDN blocked) — write HTML here"
      />
    );
  }

  return <textarea ref={textareaRef} style={{ display: 'none' }} defaultValue={value || ''}></textarea>;
}

// ---------- Template registry (tabs + placeholder metadata) ----------
const TEMPLATE_TABS = [
  // Customer mail templates
  { id: 'inquiry_acknowledgement', label: 'Inquiry Acknowledgement', icon: '📩', group: 'customer', placeholders: ['name', 'category_name', 'company', 'message'] },
  { id: 'project_request_received', label: 'Project Request Received', icon: '🚀', group: 'customer', placeholders: ['name', 'service', 'timeline', 'details'] },
  { id: 'career_application_received', label: 'Career Application', icon: '💼', group: 'customer', placeholders: ['name', 'job_title', 'vertical', 'portfolio'] },
  { id: 'casting_audition_received', label: 'Casting Audition', icon: '🎬', group: 'customer', placeholders: ['full_name', 'role_category', 'city', 'experience'] },
  // Admin mail templates
  { id: 'admin_new_inquiry', label: 'Admin: New Inquiry', icon: '🔔', group: 'admin', placeholders: ['name', 'email', 'phone', 'company', 'budget_tier', 'message'] },
  { id: 'admin_new_project', label: 'Admin: New Project', icon: '🔔', group: 'admin', placeholders: ['name', 'email', 'phone', 'service', 'timeline', 'details'] },
  { id: 'admin_new_career', label: 'Admin: New Career', icon: '🔔', group: 'admin', placeholders: ['name', 'email', 'phone', 'job_title', 'portfolio'] },
  { id: 'admin_new_casting', label: 'Admin: New Casting', icon: '🔔', group: 'admin', placeholders: ['full_name', 'email', 'phone', 'city', 'role_category', 'experience'] },
];

const TEMPLATE_FORMATS = [
  { id: 1, name: 'Format 1', desc: 'Banner + Logo + Title + Body + Button' },
  { id: 2, name: 'Format 2', desc: 'Banner + Logo + Title + Body' },
  { id: 3, name: 'Format 3', desc: 'Banner + Title + Body + Button' },
  { id: 4, name: 'Format 4', desc: 'Banner + Icon + Title + Body' },
  { id: 5, name: 'Format 5', desc: 'Banner + Icon + Title | Body + Button' },
  { id: 6, name: 'Format 6', desc: 'Banner + Icon + Title + Body' },
  { id: 7, name: 'Format 7', desc: 'Logo + Title + Body + Button' },
  { id: 8, name: 'Format 8', desc: 'Title + Body + Button' },
  { id: 9, name: 'Format 9', desc: 'Icon + Title | Body + Button' },
  { id: 10, name: 'Format 10', desc: 'Icon + Title + Body' },
  { id: 11, name: 'Format 11', desc: 'Title + Body' },
];

const DEFAULTS = {
  subject: '', body: '', banner_url: '', logo_url: '', icon_url: '',
  button_name: '', button_url: '', attachment_url: '',
  footer_text: 'Please contact us for any queries, we are always happy to help.',
  copyright_text: '© ' + new Date().getFullYear() + ' Prodyum Pvt. Ltd. All rights reserved.',
  email_template: 1,
  privacy_link: '', terms_link: '', contact_link: '',
  facebook_link: '', instagram_link: '', twitter_link: '', linkedin_link: '', pinterest_link: '',
  is_active: true,
};

// Social/page-link metadata for the StackFood-style checkbox groups
const SOCIAL_KEYS = ['facebook_link', 'instagram_link', 'twitter_link', 'linkedin_link', 'pinterest_link'];
const SOCIAL_LABELS = {
  facebook_link: 'Facebook', instagram_link: 'Instagram', twitter_link: 'Twitter',
  linkedin_link: 'LinkedIn', pinterest_link: 'Pinterest',
};
const SOCIAL_DEFAULTS = {
  facebook_link: 'https://facebook.com/prodyum',
  instagram_link: 'https://instagram.com/prodyum.in',
  twitter_link: 'https://x.com/prodyum_in',
  linkedin_link: 'https://linkedin.com/company/prodyum',
  pinterest_link: 'https://pinterest.com/prodyum',
};
const PAGE_LINK_LABELS = { privacy_link: 'Privacy Policy', terms_link: 'Terms & Conditions', contact_link: 'Contact Us' };

// ---------- Prodyum brand tokens (mirror of server BRAND — keep in sync) ----------
const B = {
  pageBg: '#06080D', cardBg: '#0C101A', elevatedBg: '#121826', border: '#1E2636',
  heading: '#F8FAFC', text: '#94A3B8', textSoft: '#CBD5E1', muted: '#64748B',
  cyan: '#00F0FF', amber: '#FFB800',
  fontBody: "'Plus Jakarta Sans','Segoe UI',Helvetica,Arial,sans-serif",
  fontDisplay: "'Syne','Plus Jakarta Sans','Segoe UI',Arial,sans-serif",
};

// ---------- Client-side preview — mirrors server/lib/emailRenderer.js exactly ----------
function generatePreviewHTML(tpl) {
  const fmt = parseInt(tpl.email_template) || 1;
  const title = tpl.subject || 'Main Title';
  const bodyContent = tpl.body || `<span style="color:${B.muted}">Email body will appear here…</span>`;

  const bannerImg = tpl.banner_url ? `<img src="${tpl.banner_url}" style="width:100%;height:auto;max-height:200px;object-fit:cover;display:block" alt="Banner" />` : '';
  const accentBar = `<span style="display:block;height:3px;background:linear-gradient(90deg,${B.cyan},${B.amber})"></span>`;
  const logoImg = tpl.logo_url ? `<img src="${tpl.logo_url}" style="width:140px;height:60px;object-fit:contain;display:block;margin:0 auto 10px" alt="Logo" />` : '';
  const iconImg = tpl.icon_url ? `<img src="${tpl.icon_url}" style="width:130px;height:45px;object-fit:contain;display:block;margin:0 auto 10px" alt="Icon" />` : '';
  const btnHtml = tpl.button_name ? `<span style="display:block;text-align:center;margin-top:22px"><a href="${tpl.button_url || '#'}" style="background:${B.cyan};color:${B.pageBg};padding:12px 32px;display:inline-block;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.5px;border-radius:8px;font-family:${B.fontBody}">${tpl.button_name}</a></span>` : '';

  const dot = `<span style="width:4px;height:4px;border-radius:50%;background:${B.muted};display:inline-block;margin:0 8px;vertical-align:middle"></span>`;
  let fl = [];
  if (tpl.privacy_link) fl.push(`<a href="${tpl.privacy_link}" style="text-decoration:none;color:${B.cyan};font-size:12px;font-family:${B.fontBody}">Privacy Policy</a>`);
  if (tpl.terms_link) fl.push(`<a href="${tpl.terms_link}" style="text-decoration:none;color:${B.cyan};font-size:12px;font-family:${B.fontBody}">Terms &amp; Conditions</a>`);
  if (tpl.contact_link) fl.push(`<a href="${tpl.contact_link}" style="text-decoration:none;color:${B.cyan};font-size:12px;font-family:${B.fontBody}">Contact Us</a>`);
  const footerLinks = fl.join(dot);

  let social = [];
  if (tpl.facebook_link) social.push(`<a href="${tpl.facebook_link}" style="margin:0 6px;text-decoration:none"><img src="https://img.icons8.com/color/24/facebook.png" style="width:22px;height:22px" alt="Facebook" /></a>`);
  if (tpl.instagram_link) social.push(`<a href="${tpl.instagram_link}" style="margin:0 6px;text-decoration:none"><img src="https://img.icons8.com/color/24/instagram.png" style="width:22px;height:22px" alt="Instagram" /></a>`);
  if (tpl.twitter_link) social.push(`<a href="${tpl.twitter_link}" style="margin:0 6px;text-decoration:none"><img src="https://img.icons8.com/color/24/twitter.png" style="width:22px;height:22px" alt="Twitter" /></a>`);
  if (tpl.linkedin_link) social.push(`<a href="${tpl.linkedin_link}" style="margin:0 6px;text-decoration:none"><img src="https://img.icons8.com/color/24/linkedin.png" style="width:22px;height:22px" alt="LinkedIn" /></a>`);
  if (tpl.pinterest_link) social.push(`<a href="${tpl.pinterest_link}" style="margin:0 6px;text-decoration:none"><img src="https://img.icons8.com/color/24/pinterest.png" style="width:22px;height:22px" alt="Pinterest" /></a>`);
  const socialHtml = social.join('');

  const footerBlock = `
    <span style="border-top:1px solid ${B.border};display:block;margin-top:24px"></span>
    <span style="display:block;margin:16px 0;color:${B.text};font-size:12px;line-height:19px;font-family:${B.fontBody}">${tpl.footer_text || ''}</span>
    <span style="display:block;color:${B.textSoft};font-size:12px;font-family:${B.fontBody}">Thanks &amp; Regards,</span>
    <span style="display:block;color:${B.heading};font-size:13px;font-weight:700;margin-bottom:20px;font-family:${B.fontDisplay}">Prodyum Pvt. Ltd.</span>
    <span style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:6px;margin:10px 0">${footerLinks}</span>
    <span style="display:block;text-align:center;margin:15px 0 8px">${socialHtml}</span>
    <span style="text-align:center;display:block;color:${B.muted};font-size:11px;margin-top:8px;font-family:${B.fontBody}">${tpl.copyright_text || ''}</span>`;

  const titleH2 = `<h2 style="font-size:20px;font-weight:700;color:${B.heading};margin:8px 0;line-height:1.35;font-family:${B.fontDisplay}">${title}</h2>`;
  const titleH3 = `<h3 style="font-size:20px;font-weight:700;color:${B.heading};margin-top:8px;line-height:1.35;font-family:${B.fontDisplay}">${title}</h3>`;
  const titleH2b = `<h2 style="font-size:20px;font-weight:700;color:${B.heading};margin-bottom:15px;line-height:1.35;font-family:${B.fontDisplay}">${title}</h2>`;
  const bd = `<span style="display:block;margin:20px 0 11px;color:${B.text};font-size:14px;line-height:24px;font-family:${B.fontBody}">${bodyContent}</span>`;
  const bannerRow = bannerImg ? `<tr><td style="padding:0;font-size:0;line-height:0">${bannerImg}</td></tr>` : '';

  let bodyHtml = '';
  switch (fmt) {
    case 1: bodyHtml = `${bannerRow}${accentBar}<tr><td style="padding:30px 30px 0">${logoImg}${titleH2}${bd}${btnHtml}${footerBlock}</td></tr>`; break;
    case 2: bodyHtml = `${bannerRow}${accentBar}<tr><td style="padding:30px 30px 0">${logoImg}${titleH2}${bd}${footerBlock}</td></tr>`; break;
    case 3: bodyHtml = `${bannerRow}${accentBar}<tr><td style="padding:30px 30px 0">${titleH2b}${bd}${btnHtml}${footerBlock}</td></tr>`; break;
    case 4: bodyHtml = `${bannerRow}${accentBar}<tr><td style="padding:30px 30px 0;text-align:center">${iconImg}${titleH3}</td></tr><tr><td style="padding:0 30px 30px;text-align:left">${bd}${footerBlock}</td></tr>`; break;
    case 5: bodyHtml = `${bannerRow}${accentBar}<tr><td style="padding:30px 30px 0;text-align:center">${iconImg}${titleH3}</td></tr><tr><td style="padding:0 30px 30px;text-align:left">${bd}${btnHtml}${footerBlock}</td></tr>`; break;
    case 6: bodyHtml = `${bannerRow}${accentBar}<tr><td style="padding:30px 30px 0;text-align:center">${iconImg}${titleH3}${bd}${footerBlock}</td></tr>`; break;
    case 7: bodyHtml = `${accentBar}<tr><td style="padding:30px 30px 0">${logoImg}${titleH2}${bd}${btnHtml}${footerBlock}</td></tr>`; break;
    case 8: bodyHtml = `${accentBar}<tr><td style="padding:30px 30px 0">${titleH2b}${bd}${btnHtml}${footerBlock}</td></tr>`; break;
    case 9: bodyHtml = `${accentBar}<tr><td style="padding:30px 30px 0;text-align:center">${iconImg}${titleH3}</td></tr><tr><td style="padding:0 30px 30px;text-align:left">${bd}${btnHtml}${footerBlock}</td></tr>`; break;
    case 10: bodyHtml = `${accentBar}<tr><td style="padding:30px 30px 0;text-align:center">${iconImg}${titleH3}${bd}${footerBlock}</td></tr>`; break;
    case 11: bodyHtml = `${accentBar}<tr><td style="padding:30px 30px 0">${titleH2b}${bd}${footerBlock}</td></tr>`; break;
    default: bodyHtml = `${bannerRow}${accentBar}<tr><td style="padding:30px 30px 0">${logoImg}${titleH2}${bd}${btnHtml}${footerBlock}</td></tr>`; break;
  }

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>@import url("https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&amp;family=Plus+Jakarta+Sans:wght@400;500;700&amp;display=swap");body{font-family:${B.fontBody};width:100%!important;height:100%!important;padding:0!important;margin:0!important;background:${B.pageBg};color:${B.text};font-size:14px;line-height:1.6}table{border-collapse:collapse!important}img{-ms-interpolation-mode:bicubic}a{color:${B.cyan}}</style></head><body style="background-color:${B.pageBg};padding:24px 12px"><table role="presentation" style="width:100%;max-width:560px;margin:0 auto;text-align:center;background:${B.cardBg};border:1px solid ${B.border};border-radius:14px;overflow:hidden">${bodyHtml}</table></body></html>`;
}

// ---------- Main component ----------
export default function EmailTemplates() {
  const [activeTab, setActiveTab] = useState('inquiry_acknowledgement');
  const [tplGroup, setTplGroup] = useState('customer');
  const [templates, setTemplates] = useState({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);
  const [copiedVar, setCopiedVar] = useState('');
  const [sendingTest, setSendingTest] = useState(false);
  const [testResult, setTestResult] = useState(null); // { type, text }
  const [uploadingField, setUploadingField] = useState('');

  useEffect(() => { fetchTemplates(); }, []);

  const fetchTemplates = async () => {
    setLoading(true);
    setLoadError('');
    try {
      const res = await fetch(`${ADMIN_API}/email-templates`, { credentials: 'include' });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to load templates.');
      const m = {};
      data.data.forEach((t) => {
        m[t.template_name] = {
          subject: t.subject || '', body: t.body || '',
          banner_url: t.banner_url || '', logo_url: t.logo_url || '', icon_url: t.icon_url || '',
          button_name: t.button_name || '', button_url: t.button_url || '',
          attachment_url: t.attachment_url || '',
          footer_text: t.footer_text || DEFAULTS.footer_text,
          copyright_text: t.copyright_text || DEFAULTS.copyright_text,
          email_template: parseInt(t.email_template) || 1,
          privacy_link: t.privacy_link || '', terms_link: t.terms_link || '', contact_link: t.contact_link || '',
          facebook_link: t.facebook_link || '', instagram_link: t.instagram_link || '',
          twitter_link: t.twitter_link || '', linkedin_link: t.linkedin_link || '', pinterest_link: t.pinterest_link || '',
          is_active: t.is_active == 1,
        };
      });
      setTemplates(m);
    } catch (err) {
      setLoadError(err.message || 'Could not reach the API server.');
    } finally {
      setLoading(false);
    }
  };

  const tpl = templates[activeTab] || DEFAULTS;
  const meta = TEMPLATE_TABS.find((t) => t.id === activeTab);

  const u = useCallback((field, v) => {
    setTemplates((prev) => ({
      ...prev,
      [activeTab]: { ...(prev[activeTab] || DEFAULTS), [field]: v },
    }));
  }, [activeTab]);

  const handleUpload = async (field, file) => {
    if (!file) return;
    setUploadingField(field);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await fetch(`${ADMIN_API}/email-templates/upload-image`, {
        method: 'POST',
        body: fd,
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        u(field, data.url);
        setTestResult({ type: 'success', text: 'File uploaded — remember to save the template.' });
      } else {
        setTestResult({ type: 'error', text: data.error || 'Upload failed.' });
      }
    } catch {
      setTestResult({ type: 'error', text: 'Upload failed — could not reach the API server.' });
    } finally {
      setUploadingField('');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!tpl.subject || !tpl.body) {
      setTestResult({ type: 'error', text: 'Subject and body are required.' });
      return;
    }
    setSaving(true);
    setTestResult(null);
    try {
      const res = await fetch(`${ADMIN_API}/email-templates/${activeTab}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          subject: tpl.subject, body: tpl.body,
          logo_url: tpl.logo_url || '', icon_url: tpl.icon_url || '', banner_url: tpl.banner_url || '',
          button_name: tpl.button_name || '', button_url: tpl.button_url || '',
          attachment_url: tpl.attachment_url || '',
          footer_text: tpl.footer_text || '', copyright_text: tpl.copyright_text || '',
          email_template: tpl.email_template || 1,
          privacy_link: tpl.privacy_link || '', terms_link: tpl.terms_link || '', contact_link: tpl.contact_link || '',
          facebook_link: tpl.facebook_link || '', instagram_link: tpl.instagram_link || '',
          twitter_link: tpl.twitter_link || '', linkedin_link: tpl.linkedin_link || '', pinterest_link: tpl.pinterest_link || '',
          is_active: tpl.is_active ? 1 : 0,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Save failed.');
      setTestResult({ type: 'success', text: 'Email template saved!' });
      fetchTemplates();
    } catch (err) {
      setTestResult({ type: 'error', text: err.message || 'Could not reach the API server.' });
    } finally {
      setSaving(false);
    }
  };

  const handleSendTest = async () => {
    const to = window.prompt('Enter email to send test:');
    if (!to) return;
    setSendingTest(true);
    setTestResult(null);
    try {
      const res = await fetch(`${ADMIN_API}/email-templates/${activeTab}/test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ to: to.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to send.');
      setTestResult({ type: 'success', text: `Test email sent to ${to.trim()}!` });
    } catch (err) {
      setTestResult({ type: 'error', text: err.message || 'Failed to send test email.' });
    } finally {
      setSendingTest(false);
    }
  };

  const copyPlaceholder = (p) => {
    navigator.clipboard?.writeText(`{{${p}}}`);
    setCopiedVar(p);
    setTimeout(() => setCopiedVar(''), 1500);
  };

  const inputCls =
    'w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/15 focus:border-cyan-accent focus:outline-none text-white text-sm placeholder:text-slate-600';
  const lbl = 'block text-[13px] font-semibold text-slate-300 mb-1.5';
  const sectionTitle = 'flex items-center gap-2 mb-2.5 mt-6 first:mt-0';
  const sectionBox = 'bg-white/[0.03] rounded-xl p-4 border border-white/[0.06]';

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-24 font-mono text-xs text-slate-500">
        <Loader2 className="w-4 h-4 animate-spin" />
        Loading email templates…
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
    <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-accent to-orange-accent flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,184,0,0.3)]">
            <Mail className="w-5 h-5 text-black" />
          </div>
          <div>
            <h3 className="font-syne font-bold text-base text-white leading-tight">Email Templates</h3>
            <p className="font-jakarta text-xs text-slate-500">Design &amp; customize email templates</p>
          </div>
        </div>
        <button
          onClick={() => setShowInstructions(true)}
          className="px-3.5 py-1.5 rounded-lg bg-cyan-accent/10 border border-cyan-accent/30 text-cyan-accent text-xs font-jakarta font-semibold hover:bg-cyan-accent/20 transition-colors"
        >
          📖 Instructions
        </button>
      </div>

      {/* Group selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 py-3 border-b border-white/[0.08]">
        <span className="text-[13px] font-semibold text-slate-300">Select Template Category:</span>
        <select
          value={tplGroup}
          onChange={(e) => {
            setTplGroup(e.target.value);
            const first = TEMPLATE_TABS.find((t) => t.group === e.target.value);
            if (first) setActiveTab(first.id);
          }}
          className="px-3.5 py-2 rounded-lg bg-white/[0.04] border border-white/15 text-[13px] font-semibold text-white cursor-pointer focus:outline-none focus:border-cyan-accent appearance-none"
        >
          <option value="customer" className="bg-[#0C101A]">Customer Mail Templates</option>
          <option value="admin" className="bg-[#0C101A]">Admin Mail Templates</option>
        </select>
      </div>

      {/* Sub tabs */}
      <div className="flex gap-2 px-5 sm:px-6 py-3 border-b border-white/[0.08] bg-white/[0.02] overflow-x-auto no-scrollbar">
        {TEMPLATE_TABS.filter((t) => t.group === tplGroup).map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-jakarta font-semibold whitespace-nowrap transition-all ${
              activeTab === t.id
                ? 'bg-cyan-accent text-black shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/10'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Status toggle bar */}
      <div
        className={`flex items-center justify-between px-5 sm:px-6 py-2.5 border-b ${
          tpl.is_active
            ? 'bg-emerald-500/10 border-emerald-500/20'
            : 'bg-red-500/10 border-red-500/20'
        }`}
      >
        <span className={`text-[13px] font-semibold font-jakarta ${tpl.is_active ? 'text-emerald-300' : 'text-red-300'}`}>
          {tpl.is_active ? '✅ This template will be sent for this event' : '⏸️ Email disabled for this event'}
        </span>
        <button
          type="button"
          onClick={() => u('is_active', !tpl.is_active)}
          aria-label="Toggle template"
          className={`w-10 h-[22px] rounded-full relative transition-colors shrink-0 ${
            tpl.is_active ? 'bg-emerald-500' : 'bg-white/20'
          }`}
        >
          <span
            className={`absolute top-[3px] w-4 h-4 rounded-full bg-white transition-all ${
              tpl.is_active ? 'left-[23px]' : 'left-[3px]'
            }`}
          />
        </button>
      </div>

      {loadError && (
        <div className="m-5 flex items-center gap-2 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-sm font-jakarta text-red-300">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {loadError}
        </div>
      )}

      {/* Two column: preview | editor */}
      <div className="flex flex-col lg:flex-row">
        {/* LEFT — Live preview (obsidian backdrop, like the real inbox render) */}
        <div className="lg:w-[400px] lg:min-w-[360px] shrink-0 bg-[#06080D] flex flex-col border-b lg:border-b-0 lg:border-r border-white/10">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border-b border-white/[0.08]">
            <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
            <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
            <span className="w-2 h-2 rounded-full bg-[#28ca42]" />
            <span className="text-[11px] font-semibold text-slate-400 ml-2 flex-1">Live Preview</span>
            <span className="text-[10px] font-semibold text-cyan-accent bg-cyan-accent/10 px-2 py-0.5 rounded border border-cyan-accent/30">
              Format {tpl.email_template || 1}
            </span>
          </div>
          <iframe
            srcDoc={generatePreviewHTML(tpl)}
            sandbox=""
            title="Email Preview"
            className="w-full h-[560px] lg:h-[640px] border-0 block"
          />
        </div>

        {/* RIGHT — Editor */}
        <div className="flex-1 min-w-0 p-5 sm:p-6 overflow-y-auto max-h-[760px]">
          <form onSubmit={handleSave}>
            {/* Placeholders */}
            <div className="p-3.5 rounded-xl bg-amber-500/[0.07] border border-amber-500/30 mb-5">
              <p className="text-xs font-bold text-amber-300 mb-1.5">📋 Available Placeholders</p>
              <div className="flex flex-wrap gap-1.5">
                {meta?.placeholders.map((p) => (
                  <code
                    key={p}
                    onClick={() => copyPlaceholder(p)}
                    title="Click to copy"
                    className="px-2 py-0.5 rounded bg-white/[0.06] border border-amber-500/30 text-amber-200 text-[11px] font-mono font-semibold cursor-pointer hover:bg-amber-500/20 transition-colors"
                  >
                    {copiedVar === p ? '✓ copied' : `{{${p}}}`}
                  </code>
                ))}
              </div>
            </div>

            {/* Format */}
            <div className={sectionTitle}>
              <span className="text-sm">🎨</span>
              <h5 className="text-sm font-bold text-white">Email Format</h5>
            </div>
            <select
              value={tpl.email_template || 1}
              onChange={(e) => u('email_template', parseInt(e.target.value))}
              className={`${inputCls} cursor-pointer appearance-none mb-1`}
            >
              {TEMPLATE_FORMATS.map((f) => (
                <option key={f.id} value={f.id} className="bg-[#0C101A]">
                  {f.name} — {f.desc}
                </option>
              ))}
            </select>

            {/* Images */}
            <div className={sectionTitle}>
              <span className="text-sm">🖼️</span>
              <h5 className="text-sm font-bold text-white">Images</h5>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {[{ f: 'logo_url', l: 'Logo' }, { f: 'icon_url', l: 'Icon' }, { f: 'banner_url', l: 'Banner (Top)' }].map((img) => (
                <div key={img.f}>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">{img.l}</label>
                  {tpl[img.f] ? (
                    <div className="relative h-20 rounded-lg overflow-hidden border border-white/15 bg-white/[0.04]">
                      <img src={tpl[img.f]} alt="" className="w-full h-full" style={{ objectFit: img.f === 'banner_url' ? 'cover' : 'contain' }} />
                      <button
                        type="button"
                        onClick={() => u(img.f, '')}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500/90 text-white text-[10px] font-bold flex items-center justify-center hover:bg-red-500"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed border-white/20 rounded-lg cursor-pointer bg-white/[0.02] hover:border-cyan-accent/50 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleUpload(img.f, e.target.files?.[0])}
                      />
                      {uploadingField === img.f ? (
                        <Loader2 className="w-4 h-4 text-cyan-accent animate-spin" />
                      ) : (
                        <>
                          <span className="text-lg text-slate-500 leading-none">+</span>
                          <span className="text-[10px] text-slate-500 mt-1">Upload</span>
                        </>
                      )}
                    </label>
                  )}
                </div>
              ))}
            </div>

            {/* Header content */}
            <div className={sectionTitle}>
              <span className="text-sm">👆</span>
              <h5 className="text-sm font-bold text-white">Header Content</h5>
            </div>
            <div className={sectionBox}>
              <div className="mb-3.5">
                <label className={lbl}>Main Title <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  placeholder="Main Title or Subject of the Mail"
                  value={tpl.subject || ''}
                  onChange={(e) => u('subject', e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={lbl}>Mail Body Message <span className="text-red-400">*</span></label>
                <CKEditor4 value={tpl.body || ''} onChange={(data) => u('body', data)} />
              </div>
            </div>

            {/* Button & link */}
            <div className={sectionTitle}>
              <span className="text-sm">🔗</span>
              <h5 className="text-sm font-bold text-white">Button &amp; Link</h5>
            </div>
            <div className={`${sectionBox} grid grid-cols-1 sm:grid-cols-2 gap-3`}>
              <div>
                <label className={lbl}>Button Name</label>
                <input type="text" placeholder="View Details" value={tpl.button_name || ''} onChange={(e) => u('button_name', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={lbl}>Button URL</label>
                <input type="text" placeholder="https://..." value={tpl.button_url || ''} onChange={(e) => u('button_url', e.target.value)} className={inputCls} />
              </div>
            </div>

            {/* Attachment */}
            <div className={sectionTitle}>
              <span className="text-sm">📎</span>
              <h5 className="text-sm font-bold text-white">Email Attachment</h5>
            </div>
            <div className={sectionBox}>
              {tpl.attachment_url ? (
                <div className="flex items-center gap-3 p-3 bg-white/[0.04] rounded-lg border border-white/10">
                  <Paperclip className="w-4 h-4 text-slate-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="block text-[13px] text-white font-semibold truncate">
                      {decodeURIComponent((tpl.attachment_url.split('/').pop() || ''))}
                    </span>
                    <span className="block text-[11px] text-slate-500">Attached file — will be sent with every email</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => u('attachment_url', '')}
                    className="px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold hover:bg-red-500/20"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center gap-2 h-12 border-2 border-dashed border-white/20 rounded-lg cursor-pointer bg-white/[0.02] hover:border-cyan-accent/50 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.zip"
                    className="hidden"
                    onChange={(e) => handleUpload('attachment_url', e.target.files?.[0])}
                  />
                  {uploadingField === 'attachment_url' ? (
                    <Loader2 className="w-4 h-4 text-cyan-accent animate-spin" />
                  ) : (
                    <>
                      <Upload className="w-4 h-4 text-slate-500" />
                      <span className="text-[13px] text-slate-400 font-semibold">Click to upload attachment (PDF, DOC, XLS, IMG, ZIP)</span>
                    </>
                  )}
                </label>
              )}
            </div>

            {/* Footer content — StackFood layout: Section Text → Page Links → Social Media → Copyright */}
            <div className={sectionTitle}>
              <span className="text-sm">👇</span>
              <h5 className="text-sm font-bold text-white">Footer Content</h5>
            </div>
            <div className={`${sectionBox} space-y-4`}>
              <div>
                <label className={lbl}>Section Text</label>
                <input type="text" placeholder="Please contact us for any queries..." value={tpl.footer_text || ''} onChange={(e) => u('footer_text', e.target.value)} className={inputCls} />
              </div>

              {/* Page Links — checkbox group (StackFood style) */}
              <div>
                <label className={lbl}>Page Links</label>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 p-0 m-0">
                  {[
                    { k: 'privacy_link', l: 'Privacy Policy', p: 'https://prodyum.in/privacy-policy' },
                    { k: 'terms_link', l: 'Terms & Conditions', p: 'https://prodyum.in/terms' },
                    { k: 'contact_link', l: 'Contact Us', p: 'https://prodyum.in/contact' },
                  ].map((i) => (
                    <li key={i.k} className="list-none">
                      <label className="flex items-center gap-2 cursor-pointer text-[13px] font-semibold text-slate-300 hover:text-white transition-colors">
                        <input
                          type="checkbox"
                          checked={!!tpl[i.k]}
                          onChange={(e) => u(i.k, e.target.checked ? i.p : '')}
                          className="w-4 h-4 accent-cyan-accent cursor-pointer"
                        />
                        {i.l}
                      </label>
                    </li>
                  ))}
                </ul>
                {['privacy_link', 'terms_link', 'contact_link'].some((k) => tpl[k]) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2.5">
                    {['privacy_link', 'terms_link', 'contact_link'].filter((k) => tpl[k]).map((k) => (
                      <div key={k}>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">{PAGE_LINK_LABELS[k]} URL</label>
                        <input type="text" placeholder={PAGE_LINK_LABELS[k] === 'Contact Us' ? 'https://prodyum.in/contact' : 'https://prodyum.in/...'} value={tpl[k] || ''} onChange={(e) => u(k, e.target.value)} className={`${inputCls} !text-xs !py-2`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Social Media Links — checkbox group (StackFood style, incl. Pinterest) */}
              <div>
                <label className={lbl}>Social Media Links</label>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 p-0 m-0">
                  {[
                    { k: 'facebook_link', l: 'Facebook' },
                    { k: 'instagram_link', l: 'Instagram' },
                    { k: 'twitter_link', l: 'Twitter' },
                    { k: 'linkedin_link', l: 'LinkedIn' },
                    { k: 'pinterest_link', l: 'Pinterest' },
                  ].map((i) => (
                    <li key={i.k} className="list-none">
                      <label className="flex items-center gap-2 cursor-pointer text-[13px] font-semibold text-slate-300 hover:text-white transition-colors">
                        <input
                          type="checkbox"
                          checked={!!tpl[i.k]}
                          onChange={(e) => u(i.k, e.target.checked ? SOCIAL_DEFAULTS[i.k] : '')}
                          className="w-4 h-4 accent-cyan-accent cursor-pointer"
                        />
                        {i.l}
                      </label>
                    </li>
                  ))}
                </ul>
                {SOCIAL_KEYS.some((k) => tpl[k]) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2.5">
                    {SOCIAL_KEYS.filter((k) => tpl[k]).map((k) => (
                      <div key={k}>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">{SOCIAL_LABELS[k]} URL</label>
                        <input type="text" placeholder={SOCIAL_DEFAULTS[k]} value={tpl[k] || ''} onChange={(e) => u(k, e.target.value)} className={`${inputCls} !text-xs !py-2`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className={lbl}>Copyright Content</label>
                <input type="text" placeholder="© 2026..." value={tpl.copyright_text || ''} onChange={(e) => u('copyright_text', e.target.value)} className={inputCls} />
              </div>
            </div>

            {/* Result banner */}
            {testResult && (
              <div
                className={`flex items-start gap-2 p-3 rounded-xl border text-xs font-jakarta mt-5 ${
                  testResult.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-red-500/10 border-red-500/30 text-red-300'
                }`}
              >
                {testResult.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                )}
                <span className="break-words">{testResult.text}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-2.5 justify-end pt-4 mt-5 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={fetchTemplates}
                className="px-4 py-2.5 rounded-lg bg-white/[0.05] border border-white/10 text-slate-400 hover:text-white text-[13px] font-jakarta font-semibold transition-colors"
              >
                🔄 Reset
              </button>
              <button
                type="button"
                onClick={handleSendTest}
                disabled={sendingTest}
                className="px-4 py-2.5 rounded-lg bg-cyan-accent/10 border border-cyan-accent/30 text-cyan-accent disabled:opacity-50 text-[13px] font-jakarta font-semibold hover:bg-cyan-accent/20 transition-colors flex items-center gap-2"
              >
                {sendingTest && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                📤 Send Test
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-lg bg-cyan-accent hover:bg-cyan-400 disabled:opacity-50 text-black text-sm font-jakarta font-bold shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all flex items-center gap-2"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                💾 Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

      {/* Instructions modal */}
      {showInstructions && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowInstructions(false)}
        >
          <div
            className="glass-modal rounded-2xl border border-white/20 p-6 sm:p-7 max-w-lg w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-syne font-bold text-lg text-white">📖 Instructions</h3>
              <button onClick={() => setShowInstructions(false)} className="p-1.5 rounded-lg bg-white/10 text-slate-300 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            {[
              { i: '🎨', t: 'Select Email Format', d: 'Choose from 11 different email template formats — the preview updates instantly.' },
              { i: '🖼️', t: 'Upload Banner Image', d: 'The banner shows at the top of the email, full width.' },
              { i: '🖼️', t: 'Upload Logo & Icon', d: 'Upload the Prodyum logo and a small icon depending on the format.' },
              { i: '📝', t: 'Write a Title', d: 'The Main Title doubles as the email subject line.' },
              { i: '✍️', t: 'Write Email Body', d: 'Use the rich text editor. Insert placeholders like {{name}} — they are replaced with real data when the email is sent.' },
              { i: '📎', t: 'Attach File', d: 'Upload a PDF, DOC or image to attach to every email sent with this template.' },
              { i: '🔗', t: 'Add Button & Link', d: 'Specify the button text and URL shown in supported formats.' },
              { i: '👇', t: 'Footer Content', d: 'Write the footer text, copyright, and choose page + social media links.' },
              { i: '✅', t: 'Save & Publish', d: 'Save the template, then use 📤 Send Test to preview it in your own inbox with sample data.' },
            ].map((s, i) => (
              <div key={i} className="flex gap-3 p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl mb-2">
                <span className="text-xl shrink-0">{s.i}</span>
                <div>
                  <h4 className="text-[13px] font-bold text-white mb-0.5">{s.t}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
            <button
              onClick={() => setShowInstructions(false)}
              className="w-full py-2.5 mt-4 rounded-lg bg-cyan-accent hover:bg-cyan-400 text-black font-jakarta font-bold text-sm transition-colors"
            >
              Got It!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
