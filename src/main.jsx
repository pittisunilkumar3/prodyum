import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Admin console is code-split: it never ships inside the public site bundle
const AdminApp = lazy(() => import('./admin/AdminApp.jsx'));
// CMS policy/content pages (DB-backed, edited in Admin → Policy Pages)
const PolicyPage = lazy(() => import('./components/PolicyPage.jsx'));
const ServicePage = lazy(() => import('./components/ServicePage.jsx'));

const isAdminRoute = window.location.pathname.startsWith('/admin');

// Policy pages: standard slugs at root + universal /p/<slug> for custom pages
const POLICY_SLUGS = ['privacy-policy', 'terms-conditions', 'refund-policy'];
let policySlug = null;
const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
if (POLICY_SLUGS.includes(rawPath)) policySlug = rawPath;
else if (rawPath.startsWith('p/')) policySlug = rawPath.slice(2);
const serviceSlug = rawPath.startsWith('services/') ? rawPath.slice('services/'.length) : null;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isAdminRoute ? (
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#06080D] flex items-center justify-center">
            <span className="font-mono text-xs text-slate-500 uppercase tracking-[0.25em]">
              Loading Admin Console…
            </span>
          </div>
        }
      >
        <AdminApp />
      </Suspense>
    ) : policySlug ? (
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#06080D] flex items-center justify-center">
            <span className="font-mono text-xs text-slate-500 uppercase tracking-[0.25em]">
              Loading…
            </span>
          </div>
        }
      >
        <PolicyPage slug={policySlug} />
      </Suspense>
    ) : serviceSlug ? (
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#06080D] flex items-center justify-center">
            <span className="font-mono text-xs text-slate-500 uppercase tracking-[0.25em]">
              Loading…
            </span>
          </div>
        }
      >
        <ServicePage slug={serviceSlug} />
      </Suspense>
    ) : (
      <App />
    )}
  </React.StrictMode>
);
