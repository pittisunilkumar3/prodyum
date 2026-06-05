import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Film, Palette, Volume2, Sparkles, Play, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { projects, services } from '../mock';
import TestimonialSection from '../components/TestimonialSection';
import TeamSection from '../components/TeamSection';
import TimelineSection from '../components/TimelineSection';
import { AnimatedShinyText, NumberTicker, TextGenerateEffect, SparklesCore, BorderBeam, Spotlight, ScrollRevealPro } from '../components/animations';
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
      {/* Hero Section with Slider + Sparkles + Spotlight */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Slider */}
        {heroProjects.map((project, index) => (
          <div
            key={project.id}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
          >
            <div className="absolute inset-0 bg-black/60" />
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.7)' }}
            />
          </div>
        ))}

        {/* Sparkles on top of slider - 21st.dev style */}
        <div className="absolute inset-0 z-[5] pointer-events-none">
          <SparklesCore
            particleCount={80}
            particleColor="#4CAF50"
            minSize={0.3}
            maxSize={1.2}
            speed={0.5}
            className="w-full h-full"
          />
        </div>

        {/* Spotlight on top - 21st.dev style */}
        <Spotlight
          className="z-[6]"
          fill="rgba(30, 136, 229, 0.08)"
          gradientSize={400}
        />

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Animated Badge with Shiny Text - 21st.dev style */}
            <div 
              className="inline-flex items-center space-x-2 bg-prodyum-lime-500/10 border border-prodyum-lime-500/20 rounded-full px-4 py-2 backdrop-blur-sm"
              style={{ animation: 'fadeInUp 1s ease-out 0.2s forwards', opacity: 0 }}
            >
              <Sparkles className="h-4 w-4 text-prodyum-lime-500" />
              <AnimatedShinyText className="text-prodyum-lime-500 text-sm font-medium" speed={4}>
                Premium Content Production
              </AnimatedShinyText>
            </div>

            {/* Main Heading with Text Generate Effect - 21st.dev style */}
            <div className="overflow-hidden">
              <h1 
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight"
              >
                <span className="block text-white mb-2 spotlight-text">SPOTLIGHT</span>
                <span className="block text-6xl sm:text-7xl lg:text-8xl xl:text-9xl">
                  <span className="spotlight-gradient">
                    <TextGenerateEffect
                      words={heroProjects[currentSlide].title.toUpperCase()}
                      duration={0.8}
                      delay={0.5}
                      type="character"
                    />
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
                <span className="text-prodyum-lime-500">★</span>
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
                className="bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500 text-white hover:from-prodyum-blue-600 hover:via-prodyum-green-600 hover:to-prodyum-lime-600 font-bold px-8 py-6 text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-prodyum-blue-500/50 hover:scale-105 group"
              >
                <Link to="/entertainment/projects">
                  View Projects
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-prodyum-green-500/60 text-white hover:bg-prodyum-green-500/20 hover:border-prodyum-green-400 px-8 py-6 text-lg backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-prodyum-green-500/30 group"
              >
                <Link to="/entertainment/investors">
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
            className="w-12 h-12 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/10 hover:border-prodyum-green-500/50 transition-all duration-300"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {heroProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-12 bg-prodyum-lime-500' : 'w-6 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/10 hover:border-prodyum-green-500/50 transition-all duration-300"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-30">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-prodyum-lime-500 rounded-full" />
          </div>
        </div>
      </section>

      {/* Synopsis Section with Parallax */}
      <section id="section-synopsis" className="py-32 bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-prodyum-green-500 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${
              isVisible['section-synopsis'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}>
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="text-prodyum-green-500 text-sm font-semibold uppercase tracking-wider">About Us</span>
                  <div className="w-12 h-1 bg-prodyum-green-500 mt-2" />
                </div>
                <h2 className="text-5xl font-bold text-white leading-tight">
                  Cinema-First <br />
                  <span className="text-prodyum-green-500">Storytelling</span>
                </h2>
                <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
                  <p>
                    ProDyum Entertainments is a <span className="text-white font-semibold">cinema-first studio</span> producing movies, original web series, short films and high-impact music videos.
                  </p>
                  <p>
                    Our in-house post production pipeline—Editing, DI/Color, Title Design, VFX, Sound Design & 5.1 Mix—ensures speed, quality, and cost control.
                  </p>
                  <p>
                    We partner with investors to create premium content with <span className="text-prodyum-lime-500 font-semibold">transparent budgeting</span> and milestone-based tracking.
                  </p>
                </div>
                <div className="pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 text-white hover:from-prodyum-blue-600 hover:to-prodyum-green-600 font-bold px-8 transition-all duration-300 hover:shadow-lg hover:shadow-prodyum-blue-500/50 hover:scale-105"
                  >
                    <Link to="/entertainment/services">
                      Explore Services
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src="https://picsum.photos/seed/production1/800/500"
                    alt="Production"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-6 -right-6 grid grid-cols-2 gap-4">
                  <Card className="bg-black/90 border-prodyum-green-500/30 backdrop-blur-md">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-prodyum-green-500">
                        <NumberTicker value={15} suffix="+" duration={2} delay={0.5} />
                      </div>
                      <div className="text-xs text-gray-400">Projects</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-black/90 border-prodyum-lime-500/30 backdrop-blur-md">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-prodyum-lime-500">
                        <NumberTicker value={100} suffix="%" duration={2} delay={0.7} />
                      </div>
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
            <span className="text-prodyum-lime-500 text-sm font-semibold uppercase tracking-wider">Portfolio</span>
            <h2 className="text-5xl font-bold text-white mt-4 mb-6">Latest Trailers</h2>
            <div className="w-24 h-1 bg-prodyum-lime-500 mx-auto mb-6" />
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore our recent work across movies, web series, and short films
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestProjects.map((project, index) => (
              <ScrollRevealPro
                key={project.id}
                effect="fade-up"
                duration={0.6}
                delay={index * 0.15}
                className="h-full"
              >
              <Card
                className="relative bg-neutral-900 border-white/10 overflow-hidden group hover:border-prodyum-lime-500/50 transition-all duration-700 hover:shadow-2xl hover:shadow-prodyum-lime-500/20 h-full"
              >
                {/* BorderBeam - 21st.dev style */}
                <BorderBeam
                  size={120}
                  duration={10}
                  colorFrom="#1E88E5"
                  colorTo="#8BC34A"
                  borderWidth={2}
                />
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-prodyum-lime-500/90 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-8 w-8 text-black ml-1" fill="currentColor" />
                    </div>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="bg-prodyum-green-500 text-black text-xs font-semibold px-3 py-1 rounded-full">
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
                    className="text-prodyum-lime-500 hover:text-prodyum-lime-400 hover:bg-prodyum-lime-500/10 p-0 h-auto font-semibold group/btn"
                  >
                    <Link to={`/entertainment/projects`}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              </ScrollRevealPro>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500 text-white hover:from-prodyum-blue-600 hover:via-prodyum-green-600 hover:to-prodyum-lime-600 font-bold px-8 transition-all duration-300 hover:shadow-lg hover:shadow-prodyum-blue-500/50 hover:scale-105"
            >
              <Link to="/entertainment/projects">
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
            <span className="text-prodyum-green-500 text-sm font-semibold uppercase tracking-wider">What We Do</span>
            <h2 className="text-5xl font-bold text-white mt-4 mb-6">Our Production</h2>
            <div className="w-24 h-1 bg-prodyum-green-500 mx-auto mb-6" />
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              End-to-end film production and robust post-production workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredServices.map((service, index) => (
              <ScrollRevealPro
                key={service.id}
                effect="zoom-in"
                duration={0.5}
                delay={index * 0.1}
              >
              <Card
                className="relative bg-black border-white/10 hover:border-prodyum-green-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-prodyum-green-500/10 group h-full"
              >
                {/* BorderBeam - 21st.dev style */}
                <BorderBeam
                  size={80}
                  duration={12}
                  colorFrom="#4CAF50"
                  colorTo="#8BC34A"
                  borderWidth={1.5}
                />
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-prodyum-green-500/20 mb-6 group-hover:bg-prodyum-green-500/30 transition-all duration-300 group-hover:scale-110">
                    {index === 0 && <Film className="h-8 w-8 text-prodyum-green-500" />}
                    {index === 1 && <Film className="h-8 w-8 text-prodyum-lime-500" />}
                    {index === 2 && <Film className="h-8 w-8 text-prodyum-green-500" />}
                    {index === 3 && <Palette className="h-8 w-8 text-prodyum-lime-500" />}
                  </div>
                  <div className="text-sm text-prodyum-green-500 font-semibold mb-2 uppercase tracking-wider">
                    {service.category}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-prodyum-green-500 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
              </ScrollRevealPro>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-prodyum-lime-500/60 text-white hover:bg-prodyum-lime-500/20 hover:border-prodyum-lime-400 px-8 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-prodyum-lime-500/30"
            >
              <Link to="/entertainment/services">
                Explore All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* PDF Presentation Section */}
      <section id="section-presentation" className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-prodyum-lime-500 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-prodyum-blue-500 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`text-center mb-12 transition-all duration-1000 ${
            isVisible['section-presentation'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}>
            <span className="text-prodyum-lime-500 text-sm font-semibold uppercase tracking-wider">Company Overview</span>
            <h2 className="text-5xl font-bold text-white mt-4 mb-6">ProDyum Entertainments <span className="text-prodyum-lime-500">Presentation</span></h2>
            <div className="w-24 h-1 bg-gradient-to-r from-prodyum-blue-500 to-prodyum-lime-500 mx-auto mb-6" />
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore our comprehensive company presentation to learn more about our vision, projects, and investment opportunities.
            </p>
          </div>

          {/* PDF Viewer */}
          <div className={`max-w-5xl mx-auto transition-all duration-1000 ${
            isVisible['section-presentation'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}>
            <Card className="bg-neutral-900/80 border-prodyum-lime-500/30 overflow-hidden backdrop-blur-md hover:border-prodyum-lime-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-prodyum-lime-500/20">
              <CardContent className="p-0">
                {/* PDF Header */}
                <div className="bg-gradient-to-r from-prodyum-blue-500/20 via-prodyum-green-500/20 to-prodyum-lime-500/20 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-gray-400 text-sm font-medium">ProDyum Entertainments - Company Profile</span>
                  <div className="w-24" /> {/* Spacer for alignment */}
                </div>
                
                {/* PDF Content Area */}
                <div className="relative bg-neutral-950" style={{ minHeight: '600px' }}>
                  {/* Presentation Content Slides */}
                  <div className="p-8 space-y-8">
                    {/* Slide 1: Company Overview */}
                    <div className="bg-gradient-to-br from-prodyum-blue-500/10 to-prodyum-green-500/10 rounded-xl p-8 border border-white/10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-4">Welcome to <span className="text-prodyum-lime-500">ProDyum Entertainments</span></h3>
                          <p className="text-gray-300 mb-6">A cinema-first studio producing movies, original web series, short films and high-impact music videos.</p>
                          <div className="flex flex-wrap gap-3">
                            <span className="px-4 py-2 bg-prodyum-blue-500/20 text-prodyum-blue-400 rounded-full text-sm">Film Production</span>
                            <span className="px-4 py-2 bg-prodyum-green-500/20 text-prodyum-green-400 rounded-full text-sm">Web Series</span>
                            <span className="px-4 py-2 bg-prodyum-lime-500/20 text-prodyum-lime-400 rounded-full text-sm">Music Content</span>
                            <span className="px-4 py-2 bg-prodyum-blue-500/20 text-prodyum-blue-400 rounded-full text-sm">Digital Media</span>
                          </div>
                        </div>
                        <div className="relative">
                          <img 
                            src="https://picsum.photos/seed/filmpost1/600/400" 
                            alt="Film Production" 
                            className="rounded-lg shadow-2xl"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                        </div>
                      </div>
                    </div>

                    {/* Slide 2: Our Services */}
                    <div className="bg-gradient-to-br from-prodyum-green-500/10 to-prodyum-lime-500/10 rounded-xl p-8 border border-white/10">
                      <h3 className="text-2xl font-bold text-white mb-6 text-center">Our <span className="text-prodyum-green-500">Services</span></h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { icon: Film, title: 'Film Production', desc: 'Full-length feature films' },
                          { icon: Film, title: 'Web Series', desc: 'Original digital content' },
                          { icon: Volume2, title: 'Music Videos', desc: 'High-impact productions' },
                          { icon: Palette, title: 'Post Production', desc: 'DI, VFX, Sound Design' }
                        ].map((service, index) => (
                          <div key={index} className="text-center p-4 rounded-lg bg-black/30 hover:bg-black/50 transition-colors">
                            <service.icon className="h-10 w-10 text-prodyum-lime-500 mx-auto mb-3" />
                            <h4 className="text-white font-semibold mb-1">{service.title}</h4>
                            <p className="text-gray-400 text-xs">{service.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Slide 3: Stats with NumberTicker - 21st.dev style */}
                    <div className="bg-gradient-to-br from-prodyum-lime-500/10 to-prodyum-blue-500/10 rounded-xl p-8 border border-white/10">
                      <h3 className="text-2xl font-bold text-white mb-6 text-center">Our <span className="text-prodyum-lime-500">Achievements</span></h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                          { value: 15, suffix: '+', label: 'Projects Completed' },
                          { value: 5, suffix: '+', label: 'Years Experience' },
                          { value: 25, suffix: '+', label: 'Team Members' },
                          { value: 8, suffix: '+', label: 'Awards Won' }
                        ].map((stat, index) => (
                          <div key={index} className="text-center">
                            <div className="text-4xl font-bold text-prodyum-lime-500 mb-2">
                              <NumberTicker value={stat.value} suffix={stat.suffix} duration={2} delay={index * 0.2} />
                            </div>
                            <div className="text-gray-400 text-sm">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Slide 4: Why Partner */}
                    <div className="bg-gradient-to-br from-prodyum-blue-500/10 to-prodyum-green-500/10 rounded-xl p-8 border border-white/10">
                      <h3 className="text-2xl font-bold text-white mb-6 text-center">Why <span className="text-prodyum-blue-500">Partner</span> With Us?</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 rounded-full bg-prodyum-blue-500/20 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="h-6 w-6 text-prodyum-blue-400" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold mb-1">Transparent Budgeting</h4>
                            <p className="text-gray-400 text-sm">Clear financial planning with detailed breakdowns</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 rounded-full bg-prodyum-green-500/20 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="h-6 w-6 text-prodyum-green-400" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold mb-1">Milestone Tracking</h4>
                            <p className="text-gray-400 text-sm">Weekly updates and regular progress reports</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 rounded-full bg-prodyum-lime-500/20 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="h-6 w-6 text-prodyum-lime-400" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold mb-1">Experienced Team</h4>
                            <p className="text-gray-400 text-sm">Seasoned professionals in filmmaking</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CTA Slide */}
                    <div className="bg-gradient-to-r from-prodyum-blue-500/20 via-prodyum-green-500/20 to-prodyum-lime-500/20 rounded-xl p-8 border border-white/10 text-center">
                      <h3 className="text-2xl font-bold text-white mb-4">Ready to <span className="text-prodyum-lime-500">Collaborate</span>?</h3>
                      <p className="text-gray-300 mb-6 max-w-2xl mx-auto">Whether you're an investor looking for premium content opportunities or talent seeking to join our team, we'd love to hear from you.</p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                          asChild
                          size="lg"
                          className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 text-white hover:from-prodyum-blue-600 hover:to-prodyum-green-600 font-bold"
                        >
                          <Link to="/entertainment/investors">Investor Information</Link>
                        </Button>
                        <Button
                          asChild
                          size="lg"
                          variant="outline"
                          className="border-prodyum-lime-500/60 text-white hover:bg-prodyum-lime-500/20"
                        >
                          <Link to="/entertainment/contact">Contact Us</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-prodyum-green-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-prodyum-lime-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
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
                className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 text-white hover:from-prodyum-blue-600 hover:to-prodyum-green-600 font-bold px-8 py-6 text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-prodyum-blue-500/50 hover:scale-105"
              >
                <Link to="/entertainment/investors">Investor Information</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-prodyum-green-500/60 text-white hover:bg-prodyum-green-500/20 hover:border-prodyum-green-400 px-8 py-6 text-lg backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-prodyum-green-500/30"
              >
                <Link to="/entertainment/casting">Apply: Cast & Crew</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;