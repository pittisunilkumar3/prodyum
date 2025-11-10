import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Film, Palette, Volume2, Sparkles, Play, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { projects, services } from '../mock';
import TestimonialSection from '../components/TestimonialSection';
import TeamSection from '../components/TeamSection';
import TimelineSection from '../components/TimelineSection';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const latestProjects = projects.slice(0, 3);
  const featuredServices = services.slice(0, 4);
  const heroProjects = projects.slice(0, 3);

  // Auto-advance hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroProjects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroProjects.length]);

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id^="section-"]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroProjects.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroProjects.length) % heroProjects.length);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Slider */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Slider */}
        {heroProjects.map((project, index) => (
          <div
            key={project.id}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
          >
            <div className="absolute inset-0 bg-black/60 z-10" />
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.7)' }}
            />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Animated Badge */}
            <div 
              className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 backdrop-blur-sm animate-fade-in"
              style={{ animationDelay: '0.2s', opacity: 0, animation: 'fadeInUp 1s ease-out 0.2s forwards' }}
            >
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span className="text-amber-500 text-sm font-medium">Premium Content Production</span>
            </div>

            {/* Main Heading with Reveal Effect */}
            <div className="overflow-hidden">
              <h1 
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight"
                style={{ opacity: 0, animation: 'revealText 1.5s ease-out 0.5s forwards' }}
              >
                <span className="block text-white mb-2 spotlight-text">SPOTLIGHT</span>
                <span className="block text-6xl sm:text-7xl lg:text-8xl xl:text-9xl">
                  <span className="spotlight-gradient">
                    {heroProjects[currentSlide].title.toUpperCase()}
                  </span>
                </span>
              </h1>
            </div>

            {/* Film Details */}
            <div 
              className="flex items-center justify-center gap-6 text-gray-300 text-sm"
              style={{ opacity: 0, animation: 'fadeInUp 1s ease-out 1s forwards' }}
            >
              <span className="px-3 py-1 border border-white/20 rounded">{heroProjects[currentSlide].type}</span>
              <span>{heroProjects[currentSlide].year}</span>
              <span className="flex items-center gap-1">
                <span className="text-amber-500">★</span>
                <span>PG-13</span>
              </span>
            </div>

            {/* Subheading */}
            <p 
              className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
              style={{ opacity: 0, animation: 'fadeInUp 1s ease-out 1.2s forwards' }}
            >
              {heroProjects[currentSlide].logline}
            </p>

            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
              style={{ opacity: 0, animation: 'fadeInUp 1s ease-out 1.4s forwards' }}
            >
              <Button
                asChild
                size="lg"
                className="bg-amber-500 text-black hover:bg-amber-400 font-semibold px-8 py-6 text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-105 group"
              >
                <Link to="/projects">
                  View Projects
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg backdrop-blur-sm transition-all duration-300 hover:border-amber-500/50 group"
              >
                <Link to="/investors">
                  <Play className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  Investor Info
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/10 hover:border-amber-500/50 transition-all duration-300"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {heroProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-12 bg-amber-500' : 'w-6 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/10 hover:border-amber-500/50 transition-all duration-300"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-30">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-amber-500 rounded-full" />
          </div>
        </div>
      </section>

      {/* Synopsis Section with Parallax */}
      <section id="section-synopsis" className="py-32 bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${
              isVisible['section-synopsis'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}>
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="text-amber-500 text-sm font-semibold uppercase tracking-wider">About Us</span>
                  <div className="w-12 h-1 bg-amber-500 mt-2" />
                </div>
                <h2 className="text-5xl font-bold text-white leading-tight">
                  Cinema-First <br />
                  <span className="text-amber-500">Storytelling</span>
                </h2>
                <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
                  <p>
                    ProDyum Entertainments is a <span className="text-white font-semibold">cinema-first studio</span> producing movies, original web series, short films and high-impact music videos.
                  </p>
                  <p>
                    Our in-house post production pipeline—Editing, DI/Color, Title Design, VFX, Sound Design & 5.1 Mix—ensures speed, quality, and cost control.
                  </p>
                  <p>
                    We partner with investors to create premium content with <span className="text-amber-500 font-semibold">transparent budgeting</span> and milestone-based tracking.
                  </p>
                </div>
                <div className="pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-amber-500 text-black hover:bg-amber-400 font-semibold px-8 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/50"
                  >
                    <Link to="/services">
                      Explore Services
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800"
                    alt="Production"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-6 -right-6 grid grid-cols-2 gap-4">
                  <Card className="bg-black/90 border-amber-500/30 backdrop-blur-md">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-amber-500">15+</div>
                      <div className="text-xs text-gray-400">Projects</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-black/90 border-amber-500/30 backdrop-blur-md">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-amber-500">100%</div>
                      <div className="text-xs text-gray-400">Quality</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Projects Carousel */}
      <section id="section-projects" className="py-32 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible['section-projects'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}>
            <span className="text-amber-500 text-sm font-semibold uppercase tracking-wider">Portfolio</span>
            <h2 className="text-5xl font-bold text-white mt-4 mb-6">Latest Trailers</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-6" />
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore our recent work across movies, web series, and short films
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestProjects.map((project, index) => (
              <Card
                key={project.id}
                className={`bg-neutral-900 border-white/10 overflow-hidden group hover:border-amber-500/50 transition-all duration-700 hover:shadow-2xl hover:shadow-amber-500/20 ${
                  isVisible['section-projects'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-amber-500/90 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-8 w-8 text-black ml-1" fill="currentColor" />
                    </div>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="bg-amber-500 text-black text-xs font-semibold px-3 py-1 rounded-full">
                      {project.type}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
                    <p className="text-sm text-gray-300">{project.year}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.logline}</p>
                  <Button
                    asChild
                    variant="ghost"
                    className="text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 p-0 h-auto font-semibold group/btn"
                  >
                    <Link to={`/projects`}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-amber-500 text-black hover:bg-amber-400 font-semibold px-8 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/50"
            >
              <Link to="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services with Icons */}
      <section id="section-services" className="py-32 bg-neutral-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible['section-services'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}>
            <span className="text-amber-500 text-sm font-semibold uppercase tracking-wider">What We Do</span>
            <h2 className="text-5xl font-bold text-white mt-4 mb-6">Our Production</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-6" />
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              End-to-end film production and robust post-production workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredServices.map((service, index) => (
              <Card
                key={service.id}
                className={`bg-black border-white/10 hover:border-amber-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/10 group ${
                  isVisible['section-services'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 mb-6 group-hover:bg-amber-500/30 transition-all duration-300 group-hover:scale-110">
                    {index === 0 && <Film className="h-8 w-8 text-amber-500" />}
                    {index === 1 && <Film className="h-8 w-8 text-amber-500" />}
                    {index === 2 && <Film className="h-8 w-8 text-amber-500" />}
                    {index === 3 && <Palette className="h-8 w-8 text-amber-500" />}
                  </div>
                  <div className="text-sm text-amber-500 font-semibold mb-2 uppercase tracking-wider">
                    {service.category}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5 px-8 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/50"
            >
              <Link to="/services">
                Explore All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <TimelineSection />

      {/* Testimonials Section */}
      <TestimonialSection />

      {/* Team Section */}
      <TeamSection />

      {/* CTA Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Ready to bring your vision to life?
            </h2>
            <p className="text-xl text-gray-300">
              Whether you're an investor looking for premium content opportunities or talent seeking to join our team, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-amber-500 text-black hover:bg-amber-400 font-semibold px-8 py-6 text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/50"
              >
                <Link to="/investors">Investor Information</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5 px-8 py-6 text-lg backdrop-blur-sm transition-all duration-300 hover:border-amber-500/50"
              >
                <Link to="/casting">Apply: Cast & Crew</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;