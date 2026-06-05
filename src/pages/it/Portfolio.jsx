import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import {
  ArrowRight,
  ExternalLink,
  Filter,
  Image,
  Globe,
  Video,
  Palette,
} from 'lucide-react';
import TiltCard from '../../components/TiltCard';
import ScrollReveal from '../../components/ScrollReveal';

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
    : projects.filter((project) => project.category === activeFilter);

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
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal animation="zoomIn">
              <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
                <Image className="h-4 w-4 text-prodyum-green-400" />
                <span className="text-gray-300 text-sm">Our Work</span>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={100}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                Our{' '}
                <span className="bg-gradient-to-r from-prodyum-blue-400 to-prodyum-green-400 bg-clip-text text-transparent">
                  Portfolio
                </span>
              </h1>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={200}>
              <p className="text-xl text-gray-300 leading-relaxed">
                Explore our collection of successful projects across various industries and services.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-black/95 backdrop-blur-xl border-b border-white/10 sticky top-20 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Filter className="h-5 w-5 text-gray-500" />
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 text-white shadow-lg shadow-prodyum-green-500/25'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 lg:py-24 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const CategoryIcon = getCategoryIcon(project.category);
              return (
                <ScrollReveal key={project.id} animation="flipUp" delay={index * 80}>
                  <TiltCard
                    tiltOptions={{ maxTilt: 8, scale: 1.02 }}
                    className="group bg-gray-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-prodyum-blue-500/50 transition-all duration-500 h-full"
                  >
                    {/* Project Image Placeholder */}
                    <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-prodyum-blue-500/80 to-prodyum-green-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button variant="outline" className="bg-white text-gray-900 hover:bg-gray-100 border-0">
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
                        {project.tags.map((tag, i) => (
                          <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-gray-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-prodyum-blue-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm">{project.description}</p>
                    </div>
                  </TiltCard>
                </ScrollReveal>
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
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50+', label: 'Projects Completed' },
              { value: '100+', label: 'Happy Clients' },
              { value: '5+', label: 'Years Experience' },
              { value: '15+', label: 'Team Members' },
            ].map((stat, index) => (
              <ScrollReveal key={index} animation="zoomIn" delay={index * 100}>
                <TiltCard tiltOptions={{ maxTilt: 10, scale: 1.03 }} className="text-center p-6">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <p className="text-gray-400">{stat.label}</p>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-prodyum-blue-600 to-prodyum-green-600">
        <ScrollReveal animation="zoomIn">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Have a Project in Mind?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss how we can bring your vision to life with our creative and technical expertise.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-prodyum-blue-600 hover:bg-gray-100 font-bold px-8"
            >
              <Link to="/it/contact" className="flex items-center gap-2">
                Start Your Project <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default ITPortfolio;
