import React from 'react';
import ITHeader from '../ITHeader';
import ITFooter from '../ITFooter';
import ITBackground from './ITBackground';

/**
 * Shared layout for all ProDyum IT pages.
 * Provides the animated global background, premium header & footer.
 * Pages pass their content as children (no need to render header/footer themselves).
 */
const ITLayout = ({ children }) => (
  <div className="relative min-h-screen overflow-x-clip bg-ink font-sans text-white">
    <ITBackground />
    <ITHeader />
    <main className="relative z-10">{children}</main>
    <ITFooter />
  </div>
);

export default ITLayout;
