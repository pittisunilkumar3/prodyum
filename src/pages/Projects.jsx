import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { projects } from '../mock';
import { Filter } from 'lucide-react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'youtube', label: 'YouTube Channels' },
    { id: 'movies', label: 'Movies' },
    { id: 'web-series', label: 'Web Series' },
    { id: 'short-films', label: 'Short Films' },
    { id: 'music-videos', label: 'Music Videos' },
    { id: 'upcoming', label: 'Upcoming' }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : activeFilter === 'upcoming'
    ? projects.filter(p => p.status === 'Upcoming')
    : activeFilter === 'youtube'
    ? projects.filter(p => p.youtubeUrl)
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="bg-black scroll-mt-24 py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">Our Projects</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500 mx-auto mb-6" />
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore our released and upcoming projects — movies, web series, short films and music videos
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <Filter className="h-5 w-5 text-prodyum-green-500 mr-2" />
            <span className="text-gray-400 text-sm uppercase tracking-wider">Filter By</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                variant="outline"
                className={`transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 text-white border-transparent hover:from-prodyum-blue-600 hover:to-prodyum-green-600'
                    : 'bg-transparent text-gray-400 border-white/20 hover:border-prodyum-green-500/50 hover:text-white'
                }`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="bg-neutral-900 border-white/10 overflow-hidden group hover:border-prodyum-lime-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-prodyum-lime-500/20"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="bg-prodyum-green-500 text-black text-xs font-semibold px-3 py-1 rounded-full">
                    {project.type}
                  </span>
                </div>
                {project.status === 'Upcoming' && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-prodyum-lime-500 text-black text-xs font-semibold px-3 py-1 rounded-full">
                      Upcoming
                    </span>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
                  <p className="text-sm text-gray-300">{project.year}</p>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.logline}</p>
                
                {/* YouTube Link */}
                {project.youtubeUrl && (
                  <a
                    href={project.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 mb-4"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Visit Channel
                  </a>
                )}
                
                {/* Credits Preview */}
                <div className="space-y-2 text-xs text-gray-500">
                  <div><span className="text-prodyum-lime-500">Director:</span> {project.credits.director}</div>
                  <div><span className="text-prodyum-lime-500">Cast:</span> {project.credits.cast}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No projects found for this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;