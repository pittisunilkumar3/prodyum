import React from 'react';
import ScrollReveal from './ScrollReveal';

/**
 * Consistent premium section heading: animated eyebrow pill + title + subtitle.
 *
 * Props:
 *  - eyebrow: small label text
 *  - title: ReactNode (supports <span className="text-gradient-animated">)
 *  - subtitle
 *  - align: 'center' | 'left'
 *  - icon: optional lucide icon for the eyebrow
 *  - className
 */
const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  icon: Icon,
  className = '',
}) => {
  const alignClass = align === 'left' ? 'items-start text-left' : 'items-center text-center mx-auto';

  return (
    <div className={`flex flex-col ${alignClass} max-w-3xl ${className}`}>
      {eyebrow && (
        <ScrollReveal>
          <span className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gray-300 mb-6">
            {Icon && <Icon className="h-3.5 w-3.5 text-prodyum-green-400" />}
            {eyebrow}
          </span>
        </ScrollReveal>
      )}
      {title && (
        <ScrollReveal delay={0.05}>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.1] text-white">
            {title}
          </h2>
        </ScrollReveal>
      )}
      {subtitle && (
        <ScrollReveal delay={0.1}>
          <p className="mt-5 text-lg text-gray-400 leading-relaxed">{subtitle}</p>
        </ScrollReveal>
      )}
    </div>
  );
};

export default SectionHeading;
