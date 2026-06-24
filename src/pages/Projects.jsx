import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { projects } from '../mock';
import { Filter, Sparkles } from 'lucide-react';
import ScrollReveal from '../components/animation/ScrollReveal';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'youtube', label: 'YouTube Channels' },
    { id: 'movies', label: 'Movies' },
    { id: 'web-series', label: 'Web Series' },
    { id: 'short-films', label: 'Short Films' },
    { id: 'music-videos', label: 'Music Videos' },
    { id: 'upcoming', label: 'Upcoming' },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : activeFilter === 'upcoming'
      ? projects.filter((p) => p.status === 'Upcoming')
      : activeFilter === 'youtube'
      ? projects.filter((p) => p.youtubeUrl)
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="relative min-h-screen pt-32 pb-24">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* header */}
        <ScrollReveal className="mb-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 text-xs text-gray-300">
            <Sparkles className="h-4 w-4 text-prodyum-lime-500" /> Streaming Gallery
          </span>
          <h1 className="mt-6 font-display text-5xl font-bold text-gradient-animated sm:text-6xl">Our Projects</h1>
          <div className="mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500" />
          <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-400">
            Explore our released and upcoming projects — movies, web series, short films and music videos
          </p>
        </ScrollReveal>

        {/* filters */}
        <div className="mb-12">
          <div className="mb-6 flex items-center justify-center">
            <Filter className="mr-2 h-5 w-5 text-prodyum-green-500" />
            <span className="text-sm uppercase tracking-wider text-gray-400">Filter By</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {filters.map((filter) => {
              const active = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                    active ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="project-filter"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  {!active && <span className="absolute inset-0 rounded-full border border-white/15 bg-white/5" />}
                  <span className="relative z-10">{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* grid */}
        <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -10, rotateX: 4, rotateY: -4 }}
                style={{ transformPerspective: 1000 }}
                data-cursor-label="View Details"
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl glass-panel gradient-border transition-all duration-500 hover:border-prodyum-lime-500/50 hover:shadow-2xl hover:shadow-prodyum-lime-500/25">
                  {/* poster */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                    {/* hover light sweep */}
                    <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-prodyum-lime-500/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                    {/* badges */}
                    <div className="absolute left-4 top-4 flex flex-col gap-2">
                      <span className="rounded-full bg-prodyum-green-500 px-3 py-1 text-xs font-semibold text-black">{project.type}</span>
                    </div>
                    {project.status === 'Upcoming' && (
                      <div className="absolute right-4 top-4">
                        <span className="rounded-full bg-prodyum-lime-500 px-3 py-1 text-xs font-semibold text-black">Upcoming</span>
                      </div>
                    )}

                    {/* title block */}
                    <div className="absolute inset-x-4 bottom-4">
                      <h3 className="font-display text-2xl font-bold text-white">{project.title}</h3>
                      <p className="text-sm text-gray-300">{project.year}</p>
                    </div>
                  </div>

                  {/* details */}
                  <div className="p-6">
                    <p className="mb-4 text-sm leading-relaxed text-gray-400">{project.logline}</p>

                    {project.youtubeUrl && (
                      <a
                        href={project.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ backgroundColor: '#FF0000' }}
                        className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white shadow-lg shadow-black/30 transition-all duration-300 hover:brightness-90 hover:scale-105"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        Visit Channel
                      </a>
                    )}

                    <div className="space-y-2 text-xs text-gray-500">
                      <div><span className="text-prodyum-lime-500">Director:</span> {project.credits.director}</div>
                      <div><span className="text-prodyum-lime-500">Cast:</span> {project.credits.cast}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-xl text-gray-400">No projects found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
