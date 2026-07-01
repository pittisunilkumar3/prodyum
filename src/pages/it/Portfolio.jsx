import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import {
  ExternalLink,
  Filter,
  Image,
  Globe,
  Video,
  Palette
} from 'lucide-react';

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'logo', label: 'Logo Design' },
    { id: 'social', label: 'Social Media' },
    { id: 'website', label: 'Websites' },
    { id: 'video', label: 'Video Projects' }
  ];

  const projects = [
    {
      id: 1,
      title: 'TechStart Logo Design',
      category: 'logo',
      description: 'Modern logo design for a tech startup focusing on AI solutions.',
      tags: ['Logo', 'Branding']
    },
    {
      id: 2,
      title: 'Real Estate Website',
      category: 'website',
      description: 'Full-featured real estate listing website with advanced search.',
      tags: ['Website', 'Real Estate']
    },
    {
      id: 3,
      title: 'Restaurant Social Media',
      category: 'social',
      description: 'Complete social media management and content creation.',
      tags: ['Social Media', 'Marketing']
    },
    {
      id: 4,
      title: 'Product Launch Video',
      category: 'video',
      description: 'Promotional video for a new product launch.',
      tags: ['Video', 'Promotional']
    },
    {
      id: 5,
      title: 'E-commerce Platform',
      category: 'website',
      description: 'Full e-commerce website with payment integration.',
      tags: ['E-commerce', 'Website']
    },
    {
      id: 6,
      title: 'Fashion Brand Identity',
      category: 'logo',
      description: 'Complete brand identity design including logo.',
      tags: ['Branding', 'Logo']
    },
    {
      id: 7,
      title: 'Corporate Video',
      category: 'video',
      description: 'Corporate overview video with interviews.',
      tags: ['Corporate', 'Video']
    },
    {
      id: 8,
      title: 'Fitness Brand Social Media',
      category: 'social',
      description: 'Instagram and Facebook content creation.',
      tags: ['Social Media', 'Fitness']
    },
    {
      id: 9,
      title: 'Education Portal',
      category: 'website',
      description: 'Online learning platform with course management.',
      tags: ['Education', 'Website']
    }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'logo': return Palette;
      case 'website': return Globe;
      case 'video': return Video;
      case 'social': return Image;
      default: return Image;
    }
  };

  return (
    <section id="portfolio" className="bg-black scroll-mt-24">
      {/* Section Heading */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
          <Image className="h-4 w-4 text-prodyum-green-400" />
          <span className="text-gray-300 text-sm">Our Work</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Our <span className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 bg-clip-text text-transparent">Portfolio</span>
        </h2>
        <p className="text-gray-400 text-lg">
          Explore our collection of successful projects across various industries and services.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-20 z-40 bg-black/95 backdrop-blur-xl border-y border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Filter className="h-5 w-5 text-gray-500" />
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const CategoryIcon = getCategoryIcon(project.category);
              return (
                <div
                  key={project.id}
                  className="group bg-gray-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-prodyum-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-prodyum-blue-500/10"
                >
                  {/* Project Image Placeholder */}
                  <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-prodyum-blue-500/80 to-prodyum-green-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button
                        variant="outline"
                        className="bg-white text-gray-900 hover:bg-gray-100 border-0"
                      >
                        View Project <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CategoryIcon className="h-16 w-16 text-gray-600 group-hover:opacity-0 transition-opacity duration-300" />
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-prodyum-blue-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {project.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <Image className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No projects found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50+', label: 'Projects Completed' },
              { value: '100+', label: 'Happy Clients' },
              { value: '5+', label: 'Years Experience' },
              { value: '15+', label: 'Team Members' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
