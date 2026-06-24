import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { ArrowRight, ExternalLink, Filter, Image, Globe, Video, Palette, ArrowUpRight } from 'lucide-react';
import ITLayout from '../../components/it/ITLayout';
import ScrollReveal from '../../components/animation/ScrollReveal';
import TiltCard from '../../components/animation/TiltCard';
import MagneticButton from '../../components/animation/MagneticButton';
import AnimatedCounter from '../../components/animation/AnimatedCounter';

const getCategoryIcon = (category) => {
  switch (category) {
    case 'logo': return Palette;
    case 'website': return Globe;
    case 'video': return Video;
    case 'social': return Image;
    default: return Image;
  }
};

const ITPortfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'logo', label: 'Logo Design' },
    { id: 'social', label: 'Social Media' },
    { id: 'website', label: 'Websites' },
    { id: 'video', label: 'Video Projects' },
  ];

  const projects = [
    { id: 1, title: 'TechStart Logo Design', category: 'logo', description: 'Modern logo design for a tech startup focusing on AI solutions.', tags: ['Logo', 'Branding'] },
    { id: 2, title: 'Real Estate Website', category: 'website', description: 'Full-featured real estate listing website with advanced search.', tags: ['Website', 'Real Estate'] },
    { id: 3, title: 'Restaurant Social Media', category: 'social', description: 'Complete social media management and content creation.', tags: ['Social Media', 'Marketing'] },
    { id: 4, title: 'Product Launch Video', category: 'video', description: 'Promotional video for a new product launch.', tags: ['Video', 'Promotional'] },
    { id: 5, title: 'E-commerce Platform', category: 'website', description: 'Full e-commerce website with payment integration.', tags: ['E-commerce', 'Website'] },
    { id: 6, title: 'Fashion Brand Identity', category: 'logo', description: 'Complete brand identity design including logo.', tags: ['Branding', 'Logo'] },
    { id: 7, title: 'Corporate Video', category: 'video', description: 'Corporate overview video with interviews.', tags: ['Corporate', 'Video'] },
    { id: 8, title: 'Fitness Brand Social Media', category: 'social', description: 'Instagram and Facebook content creation.', tags: ['Social Media', 'Fitness'] },
    { id: 9, title: 'Education Portal', category: 'website', description: 'Online learning platform with course management.', tags: ['Education', 'Website'] },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const stats = [
    { value: '50+', label: 'Projects Completed' },
    { value: '100+', label: 'Happy Clients' },
    { value: '5+', label: 'Years Experience' },
    { value: '15+', label: 'Team Members' },
  ];

  return (
    <ITLayout>
      {/* HERO */}
      <section className="relative overflow-hidden pb-12 pt-36 lg:pt-44">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 text-xs text-gray-300 backdrop-blur-sm">
                <Image className="h-4 w-4 text-prodyum-green-400" /> Our Work
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h1 className="mt-6 font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                Our <span className="text-gradient-animated">Portfolio</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-5 text-xl leading-relaxed text-gray-300">
                Explore our collection of successful projects across various industries and services.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* STICKY FILTERS */}
      <section className="sticky top-[84px] z-40 border-y border-white/10 bg-ink/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3 py-4">
            <Filter className="h-5 w-5 text-gray-500" />
            {filters.map((filter) => {
              const active = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                    active ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="portfolio-filter"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECT GRID */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const CategoryIcon = getCategoryIcon(project.category);
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full"
                  >
                    <TiltCard className="group h-full">
                      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl glass-panel card-reflection gradient-border transition-all duration-500 hover:border-prodyum-blue-500/50 hover:shadow-[0_30px_80px_-30px_rgba(30,136,229,0.45)]">
                        {/* visual */}
                        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#0a1422] to-[#0c1a12]">
                          <div className="absolute inset-0 bg-grid opacity-30" />
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-prodyum-blue-500/85 to-prodyum-green-500/85 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                            <Button variant="outline" className="border-0 bg-white text-gray-900 hover:bg-gray-100">
                              View Project <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <CategoryIcon className="h-16 w-16 text-gray-700 transition-opacity duration-300 group-hover:opacity-0" />
                          </div>
                          <div className="pointer-events-none absolute -bottom-10 left-1/2 h-24 w-40 -translate-x-1/2 rounded-full bg-prodyum-blue-500/20 blur-2xl" />
                        </div>

                        {/* info */}
                        <div className="flex flex-1 flex-col p-6">
                          <div className="mb-3 flex flex-wrap items-center gap-2">
                            {project.tags.map((tag) => (
                              <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-gray-400">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h3 className="font-display text-xl font-bold text-white transition-colors duration-300 group-hover:text-prodyum-blue-400">
                            {project.title}
                          </h3>
                          <p className="mt-2 text-sm text-gray-400">{project.description}</p>
                          <div className="mt-4 flex items-center gap-1 text-sm font-medium text-prodyum-green-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                            View case study <ArrowUpRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="py-16 text-center">
              <Image className="mx-auto mb-4 h-16 w-16 text-gray-600" />
              <h3 className="text-xl font-semibold text-gray-400">No projects found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.08} className="text-center">
                <div className="font-display text-4xl font-bold text-gradient-animated md:text-5xl">
                  <AnimatedCounter value={stat.value} />
                </div>
                <p className="mt-2 text-gray-400">{stat.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-prodyum-blue-600 to-prodyum-green-600 p-12 text-center lg:p-16">
              <div className="absolute inset-0 bg-dots opacity-20" />
              <div className="relative z-10">
                <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                  Have a Project in Mind?
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                  Let&apos;s discuss how we can bring your vision to life with our creative and technical expertise.
                </p>
                <div className="mt-8 flex justify-center">
                  <MagneticButton strength={14}>
                    <Button
                      asChild
                      size="lg"
                      className="bg-white px-8 font-bold text-prodyum-blue-600 hover:bg-gray-100"
                    >
                      <Link to="/it/contact" className="flex items-center gap-2">
                        Start Your Project <ArrowRight className="h-5 w-5" />
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

export default ITPortfolio;
