import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/button';
import {
  ArrowRight,
  Megaphone,
  Palette,
  Globe,
  Video,
  CheckCircle2,
  TrendingUp,
  Share2,
  Search,
  Youtube,
  FileText,
  PenTool,
  Layout,
  Image,
  Figma,
  Monitor,
  Building,
  Zap,
  Camera,
  Film,
  Clapperboard,
  Sparkles,
} from 'lucide-react';
import ITLayout from '../../components/it/ITLayout';
import ScrollReveal from '../../components/animation/ScrollReveal';
import GlassCard from '../../components/animation/GlassCard';
import MagneticButton from '../../components/animation/MagneticButton';
import SectionHeading from '../../components/animation/SectionHeading';

const ITServices = () => {
  const [activeService, setActiveService] = useState('digital-marketing');

  const serviceCategories = [
    { id: 'digital-marketing', title: 'Digital Marketing', icon: Megaphone },
    { id: 'branding-design', title: 'Branding & Design', icon: Palette },
    { id: 'web-development', title: 'Web Development', icon: Globe },
    { id: 'video-production', title: 'Video Production', icon: Video },
  ];

  const services = {
    'digital-marketing': {
      title: 'Digital Marketing',
      description: 'Helping businesses increase online visibility and reach the right audience through strategic marketing.',
      services: [
        { icon: Share2, title: 'Social Media Management', description: 'Comprehensive social media management across all major platforms including Facebook, Instagram, LinkedIn, and Twitter.' },
        { icon: TrendingUp, title: 'Performance Marketing (Meta Ads & Google Ads)', description: 'Data-driven advertising campaigns on Meta (Facebook/Instagram) and Google platforms.' },
        { icon: Search, title: 'Search Engine Optimization (SEO)', description: "Improve your website's visibility on search engines with keyword research, on-page optimization, and link building." },
        { icon: Youtube, title: 'YouTube Marketing', description: 'Grow your YouTube presence with optimized video content, channel management, and advertising.' },
        { icon: FileText, title: 'Content Strategy', description: 'Develop a winning content strategy that aligns with your business goals and resonates with your audience.' },
      ],
    },
    'branding-design': {
      title: 'Branding & Design',
      description: 'Building strong brand identities and impactful visual communication that sets you apart from the competition.',
      services: [
        { icon: PenTool, title: 'Logo Design', description: 'Create a memorable and professional logo that represents your brand identity.' },
        { icon: Layout, title: 'Brand Identity Design', description: 'Comprehensive brand identity packages including color palettes, typography, and brand guidelines.' },
        { icon: Image, title: 'Social Media Creatives', description: 'Eye-catching social media graphics and templates designed to increase engagement.' },
        { icon: Camera, title: 'Marketing Graphics', description: 'Professional marketing materials including brochures, flyers, banners, and posters.' },
        { icon: Figma, title: 'UI/UX Design', description: 'User-centered design for websites and applications that enhance user experience.' },
      ],
    },
    'web-development': {
      title: 'Web Development',
      description: 'Developing modern, responsive websites that help businesses establish their online presence.',
      services: [
        { icon: Building, title: 'Business Websites', description: 'Professional websites for small and medium businesses with modern, responsive design.' },
        { icon: Monitor, title: 'Corporate Websites', description: 'Enterprise-level websites with advanced features and sophisticated functionality.' },
        { icon: Zap, title: 'Landing Pages', description: 'High-converting landing pages designed for marketing campaigns and lead generation.' },
        { icon: Globe, title: 'E-commerce Websites', description: 'Full-featured online stores with product catalogs, shopping carts, and payment integration.' },
      ],
    },
    'video-production': {
      title: 'Video & Multimedia',
      description: 'Producing professional visual content for branding and marketing that captivates your audience.',
      services: [
        { icon: Camera, title: 'Product Shoots', description: 'Professional product photography and videography that showcases your products in the best light.' },
        { icon: Film, title: 'Promotional Videos', description: 'Engaging promotional videos that tell your brand story and showcase your products or services.' },
        { icon: Clapperboard, title: 'Social Media Videos', description: 'Short-form video content optimized for Instagram Reels, TikTok, and YouTube Shorts.' },
        { icon: Video, title: 'Video Editing', description: 'Professional video editing services including color grading, motion graphics, and sound design.' },
      ],
    },
  };

  const currentService = services[activeService];

  return (
    <ITLayout>
      {/* HERO */}
      <section className="relative overflow-hidden pb-16 pt-36 lg:pt-44">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 text-xs text-gray-300 backdrop-blur-sm">
                <Megaphone className="h-4 w-4 text-prodyum-green-400" /> What We Offer
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h1 className="mt-6 font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                Our <span className="text-gradient-animated">Services</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-5 text-xl leading-relaxed text-gray-300">
                Comprehensive digital solutions tailored to your business needs.
                From digital marketing to web development, we&apos;ve got you covered.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* STICKY CATEGORY NAV */}
      <section className="sticky top-[84px] z-40 border-y border-white/10 bg-ink/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scrollbar-hide flex gap-2 overflow-x-auto py-4">
            {serviceCategories.map((category) => {
              const active = activeService === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveService(category.id)}
                  className={`relative flex flex-shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                    active ? 'text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="service-tab"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <category.icon className="relative z-10 h-5 w-5" />
                  <span className="relative z-10">{category.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICE CONTENT */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mx-auto mb-16 max-w-4xl text-center">
                <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                  {currentService.title}
                </h2>
                <p className="mt-4 text-xl text-gray-400">{currentService.description}</p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:max-w-6xl lg:mx-auto">
                {currentService.services.map((service, index) => (
                  <ScrollReveal key={service.title} delay={index * 0.07}>
                    <GlassCard tilt glow={index % 2 ? 'green' : 'blue'} reveal={false} className="h-full p-8">
                      <div className="flex items-start gap-6">
                        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                          <service.icon className="h-7 w-7 text-prodyum-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-display text-xl font-bold text-white">{service.title}</h3>
                          <p className="mt-2 leading-relaxed text-gray-400">{service.description}</p>
                        </div>
                      </div>
                    </GlassCard>
                  </ScrollReveal>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <ScrollReveal className="mt-16 text-center">
            <MagneticButton strength={14}>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 px-8 font-bold text-white hover:from-prodyum-blue-600 hover:to-prodyum-green-600"
              >
                <Link to="/it/contact" className="flex items-center gap-2">
                  Get a Quote <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="At a Glance"
            icon={Sparkles}
            title={<>Complete Service <span className="text-gradient-animated">Overview</span></>}
            subtitle="All our services at a glance"
          />
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(services).map(([key, service], i) => (
              <GlassCard key={key} tilt glow="lime" delay={i * 0.08} className="p-6" reveal>
                <h3 className="font-display text-lg font-bold text-white">{service.title}</h3>
                <ul className="mt-4 space-y-3">
                  {service.services.map((item) => (
                    <li key={item.title} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-prodyum-green-500" />
                      <span className="text-sm text-gray-400">{item.title}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-prodyum-blue-600 to-prodyum-green-600 p-12 text-center lg:p-16">
              <div className="absolute inset-0 bg-grid opacity-20" />
              <div className="relative z-10">
                <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                  Ready to Start Your Project?
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                  Let&apos;s discuss how our services can help you achieve your business goals.
                </p>
                <div className="mt-8 flex justify-center">
                  <MagneticButton strength={14}>
                    <Button
                      asChild
                      size="lg"
                      className="bg-white px-8 font-bold text-prodyum-blue-600 hover:bg-gray-100"
                    >
                      <Link to="/it/contact" className="flex items-center gap-2">
                        Contact Us <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </ITLayout>
  );
};

export default ITServices;
