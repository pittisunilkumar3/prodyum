import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, Film, Palette, Volume2, Sparkles, Play, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { projects, services } from '../mock';
import TestimonialSection from '../components/TestimonialSection';
import TeamSection from '../components/TeamSection';
import TimelineSection from '../components/TimelineSection';
import ScrollReveal from '../components/animation/ScrollReveal';
import MagneticButton from '../components/animation/MagneticButton';
import LensFlare from '../components/entertainment/LensFlare';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const reduce = useReducedMotion();
  const heroRef = useRef(null);

  const latestProjects = projects.slice(0, 3);
  const featuredServices = services.slice(0, 4);
  const heroProjects = projects.slice(0, 3);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroProjects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroProjects.length]);

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
    document.querySelectorAll('[id^="section-"]').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroProjects.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroProjects.length) % heroProjects.length);

  return (
    <div className="relative min-h-screen">
      {/* ================= HERO ================= */}
      <section ref={heroRef} className="relative flex h-screen items-center justify-center overflow-hidden">
        {/* background slider */}
        {heroProjects.map((project, index) => (
          <motion.div
            key={project.id}
            className="absolute inset-0"
            initial={false}
            animate={reduce ? { opacity: index === currentSlide ? 1 : 0 } : undefined}
            style={{ opacity: index === currentSlide ? 1 : 0 }}
          >
            <motion.img
              src={project.thumbnail}
              alt={project.title}
              className="h-full w-full object-cover"
              style={{ scale: reduce ? 1 : heroScale, filter: 'brightness(0.42)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)]" />
          </motion.div>
        ))}

        <LensFlare x="85%" y="15%" size={360} />

        {/* content */}
        <motion.div
          style={reduce ? undefined : { y: heroY, opacity: heroOpacity }}
          className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-5xl space-y-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-2 rounded-full border border-prodyum-lime-500/20 bg-prodyum-lime-500/10 px-4 py-2 backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 text-prodyum-lime-500" />
              <span className="text-sm font-medium text-prodyum-lime-500">Premium Content Production</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl xl:text-8xl"
              >
                <span className="block mb-2 tracking-[0.3em] text-white/90" style={{ fontWeight: 300 }}>SPOTLIGHT</span>
                <motion.span
                  key={currentSlide}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-6xl text-gradient-animated sm:text-7xl lg:text-8xl xl:text-9xl"
                >
                  {heroProjects[currentSlide].title.toUpperCase()}
                </motion.span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex items-center justify-center gap-6 text-sm text-gray-300"
            >
              <span className="rounded border border-white/20 px-3 py-1">{heroProjects[currentSlide].type}</span>
              <span>{heroProjects[currentSlide].year}</span>
              <span className="flex items-center gap-1">
                <span className="text-prodyum-lime-500">★</span> PG-13
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-200 sm:text-2xl"
            >
              {heroProjects[currentSlide].logline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row"
            >
              <MagneticButton strength={14}>
                <Button
                  asChild
                  size="lg"
                  className="group bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500 px-8 py-6 text-lg font-bold text-white transition-all duration-300 hover:shadow-2xl hover:shadow-prodyum-blue-500/50"
                  data-cursor-label="Projects"
                >
                  <Link to="/entertainment/projects">
                    View Projects
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </MagneticButton>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-prodyum-green-500/60 px-8 py-6 text-lg text-white backdrop-blur-sm transition-all duration-300 hover:border-prodyum-green-400 hover:bg-prodyum-green-500/20"
                data-cursor-label="Watch"
              >
                <Link to="/entertainment/investors">
                  <Play className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  Investor Info
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* slider controls */}
        <div className="absolute bottom-16 left-1/2 z-30 flex -translate-x-1/2 items-center gap-4">
          <button onClick={prevSlide} aria-label="Previous" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-all duration-300 hover:border-prodyum-green-500/50 hover:bg-white/10">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {heroProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Slide ${index + 1}`}
                className={`h-1 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-12 bg-prodyum-lime-500' : 'w-6 bg-white/30 hover:bg-white/50'}`}
              />
            ))}
          </div>
          <button onClick={nextSlide} aria-label="Next" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-all duration-300 hover:border-prodyum-green-500/50 hover:bg-white/10">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2"
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-2">
            <div className="h-3 w-1 rounded-full bg-prodyum-lime-500" />
          </div>
        </motion.div>
      </section>

      {/* ================= SYNOPSIS ================= */}
      <section id="section-synopsis" className="relative overflow-hidden py-32">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mx-auto max-w-6xl transition-all duration-1000 ${isVisible['section-synopsis'] ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="text-sm font-semibold uppercase tracking-wider text-prodyum-green-500">About Us</span>
                  <div className="mt-2 h-1 w-12 bg-prodyum-green-500" />
                </div>
                <h2 className="font-display text-5xl font-bold leading-tight text-white">
                  Cinema-First <br />
                  <span className="text-gradient-animated">Storytelling</span>
                </h2>
                <div className="space-y-4 text-lg leading-relaxed text-gray-300">
                  <p>
                    ProDyum Entertainments is a <span className="font-semibold text-white">cinema-first studio</span> producing movies, original web series, short films and high-impact music videos.
                  </p>
                  <p>
                    Our in-house post production pipeline—Editing, DI/Color, Title Design, VFX, Sound Design &amp; 5.1 Mix—ensures speed, quality, and cost control.
                  </p>
                  <p>
                    We partner with investors to create premium content with <span className="font-semibold text-prodyum-lime-500">transparent budgeting</span> and milestone-based tracking.
                  </p>
                </div>
                <div className="pt-4">
                  <Button asChild size="lg" className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 px-8 font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-prodyum-blue-500/50">
                    <Link to="/entertainment/services">Explore Services <ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="relative overflow-hidden rounded-lg">
                  <img src="https://picsum.photos/seed/production1/800/500" alt="Production" className="h-[500px] w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-6 -right-6 grid grid-cols-2 gap-4">
                  <Card className="glass-panel-strong border-prodyum-green-500/30">
                    <div className="p-4 text-center">
                      <div className="text-gradient-animated text-3xl font-bold">15+</div>
                      <div className="text-xs text-gray-400">Projects</div>
                    </div>
                  </Card>
                  <Card className="glass-panel-strong border-prodyum-lime-500/30">
                    <div className="p-4 text-center">
                      <div className="text-gradient-animated text-3xl font-bold">100%</div>
                      <div className="text-xs text-gray-400">Quality</div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LATEST TRAILERS ================= */}
      <section id="section-projects" className="relative py-32">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-prodyum-lime-500">Portfolio</span>
            <h2 className="mt-4 font-display text-5xl font-bold text-gradient-animated">Latest Trailers</h2>
            <div className="mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500" />
            <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-400">
              Explore our recent work across movies, web series, and short films
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {latestProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                data-cursor-label="View Details"
              >
                <Card className="group overflow-hidden rounded-2xl glass-panel gradient-border transition-all duration-500 hover:border-prodyum-lime-500/50 hover:shadow-2xl hover:shadow-prodyum-lime-500/20">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={project.thumbnail} alt={project.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex h-16 w-16 transform items-center justify-center rounded-full bg-prodyum-lime-500/90 transition-transform duration-300 group-hover:scale-110">
                        <Play className="ml-1 h-8 w-8 text-black" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute right-4 top-4">
                      <span className="rounded-full bg-prodyum-green-500 px-3 py-1 text-xs font-semibold text-black">{project.type}</span>
                    </div>
                    <div className="absolute inset-x-4 bottom-4">
                      <h3 className="mb-1 text-2xl font-bold text-white">{project.title}</h3>
                      <p className="text-sm text-gray-300">{project.year}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="mb-4 text-sm leading-relaxed text-gray-400">{project.logline}</p>
                    <Button asChild variant="ghost" className="group/btn h-auto p-0 font-semibold text-prodyum-lime-500 hover:bg-transparent hover:text-prodyum-lime-400">
                      <Link to="/entertainment/projects">
                        Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <ScrollReveal className="mt-12 text-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500 px-8 font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-prodyum-blue-500/50">
              <Link to="/entertainment/projects">View All Projects <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="section-services" className="relative py-32">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-prodyum-green-500">What We Do</span>
            <h2 className="mt-4 font-display text-5xl font-bold text-gradient-animated">Our Production</h2>
            <div className="mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500" />
            <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-400">
              End-to-end film production and robust post-production workflow
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1, duration: 0.7 }}
                whileHover={{ y: -8 }}
                data-cursor-label="Explore"
              >
                <Card className="group glass-panel gradient-border p-8 text-center transition-all duration-500 hover:border-prodyum-green-500/50 hover:shadow-xl hover:shadow-prodyum-green-500/10">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-prodyum-green-500/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-prodyum-green-500/30">
                    {index === 0 && <Film className="h-8 w-8 text-prodyum-green-500" />}
                    {index === 1 && <Film className="h-8 w-8 text-prodyum-lime-500" />}
                    {index === 2 && <Film className="h-8 w-8 text-prodyum-green-500" />}
                    {index === 3 && <Palette className="h-8 w-8 text-prodyum-lime-500" />}
                  </div>
                  <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-prodyum-green-500">{service.category}</div>
                  <h3 className="mb-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-prodyum-green-500">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{service.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <ScrollReveal className="mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="border-2 border-prodyum-lime-500/60 px-8 text-white backdrop-blur-sm transition-all duration-300 hover:border-prodyum-lime-400 hover:bg-prodyum-lime-500/20 hover:shadow-lg hover:shadow-prodyum-lime-500/30">
              <Link to="/entertainment/services">Explore All Services <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= PRESENTATION ================= */}
      <section id="section-presentation" className="relative overflow-hidden py-32">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-prodyum-lime-500">Company Overview</span>
            <h2 className="mt-4 font-display text-5xl font-bold text-white">ProDyum Entertainments <span className="text-gradient-animated">Presentation</span></h2>
            <div className="mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-prodyum-blue-500 to-prodyum-lime-500" />
            <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-400">
              Explore our comprehensive company presentation to learn more about our vision, projects, and investment opportunities.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mx-auto max-w-5xl">
            <Card className="overflow-hidden rounded-2xl glass-panel-strong gradient-border backdrop-blur-md transition-all duration-500 hover:border-prodyum-lime-500/60 hover:shadow-2xl hover:shadow-prodyum-lime-500/20">
              {/* window chrome */}
              <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-prodyum-blue-500/20 via-prodyum-green-500/20 to-prodyum-lime-500/20 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-prodyum-blue-500" />
                  <div className="h-3 w-3 rounded-full bg-prodyum-green-500" />
                  <div className="h-3 w-3 rounded-full bg-prodyum-lime-500" />
                </div>
                <span className="text-sm font-medium text-gray-400">ProDyum Entertainments - Company Profile</span>
                <div className="w-24" />
              </div>

              <div className="relative bg-black/40 p-8">
                <div className="space-y-8">
                  {/* slide 1 */}
                  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-prodyum-blue-500/10 to-prodyum-green-500/10 p-8">
                    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                      <div>
                        <h3 className="mb-4 font-display text-3xl font-bold text-white">Welcome to <span className="text-gradient-animated">ProDyum Entertainments</span></h3>
                        <p className="mb-6 text-gray-300">A cinema-first studio producing movies, original web series, short films and high-impact music videos.</p>
                        <div className="flex flex-wrap gap-3">
                          <span className="rounded-full bg-prodyum-blue-500/20 px-4 py-2 text-sm text-prodyum-blue-400">Film Production</span>
                          <span className="rounded-full bg-prodyum-green-500/20 px-4 py-2 text-sm text-prodyum-green-400">Web Series</span>
                          <span className="rounded-full bg-prodyum-lime-500/20 px-4 py-2 text-sm text-prodyum-lime-400">Music Content</span>
                          <span className="rounded-full bg-prodyum-blue-500/20 px-4 py-2 text-sm text-prodyum-blue-400">Digital Media</span>
                        </div>
                      </div>
                      <div className="relative">
                        <img src="https://picsum.photos/seed/filmpost1/600/400" alt="Film Production" className="rounded-lg shadow-2xl" />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    </div>
                  </div>

                  {/* slide 2 */}
                  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-prodyum-green-500/10 to-prodyum-lime-500/10 p-8">
                    <h3 className="mb-6 text-center font-display text-2xl font-bold text-white">Our <span className="text-prodyum-green-500">Services</span></h3>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      {[
                        { icon: Film, title: 'Film Production', desc: 'Full-length feature films' },
                        { icon: Film, title: 'Web Series', desc: 'Original digital content' },
                        { icon: Volume2, title: 'Music Videos', desc: 'High-impact productions' },
                        { icon: Palette, title: 'Post Production', desc: 'DI, VFX, Sound Design' },
                      ].map((service, i) => (
                        <div key={i} className="rounded-lg bg-black/30 p-4 text-center transition-colors hover:bg-black/50">
                          <service.icon className="mx-auto mb-3 h-10 w-10 text-prodyum-lime-500" />
                          <h4 className="mb-1 font-semibold text-white">{service.title}</h4>
                          <p className="text-xs text-gray-400">{service.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* slide 3 */}
                  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-prodyum-lime-500/10 to-prodyum-blue-500/10 p-8">
                    <h3 className="mb-6 text-center font-display text-2xl font-bold text-white">Our <span className="text-gradient-animated">Achievements</span></h3>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                      {[
                        { value: '15+', label: 'Projects Completed' },
                        { value: '5+', label: 'Years Experience' },
                        { value: '25+', label: 'Team Members' },
                        { value: '8+', label: 'Awards Won' },
                      ].map((stat, i) => (
                        <div key={i} className="text-center">
                          <div className="mb-2 text-4xl font-bold text-gradient-animated">{stat.value}</div>
                          <div className="text-sm text-gray-400">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* slide 4 */}
                  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-prodyum-blue-500/10 to-prodyum-green-500/10 p-8">
                    <h3 className="mb-6 text-center font-display text-2xl font-bold text-white">Why <span className="text-prodyum-blue-500">Partner</span> With Us?</h3>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      {[
                        { icon: CheckCircle2, title: 'Transparent Budgeting', desc: 'Clear financial planning with detailed breakdowns', color: 'text-prodyum-blue-400' },
                        { icon: CheckCircle2, title: 'Milestone Tracking', desc: 'Weekly updates and regular progress reports', color: 'text-prodyum-green-400' },
                        { icon: CheckCircle2, title: 'Experienced Team', desc: 'Seasoned professionals in filmmaking', color: 'text-prodyum-lime-400' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/5">
                            <item.icon className={`h-6 w-6 ${item.color}`} />
                          </div>
                          <div>
                            <h4 className="mb-1 font-semibold text-white">{item.title}</h4>
                            <p className="text-sm text-gray-400">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* cta slide */}
                  <div className="rounded-xl border border-white/10 bg-gradient-to-r from-prodyum-blue-500/20 via-prodyum-green-500/20 to-prodyum-lime-500/20 p-8 text-center">
                    <h3 className="mb-4 font-display text-2xl font-bold text-white">Ready to <span className="text-gradient-animated">Collaborate</span>?</h3>
                    <p className="mx-auto mb-6 max-w-2xl text-gray-300">Whether you're an investor looking for premium content opportunities or talent seeking to join our team, we'd love to hear from you.</p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                      <Button asChild size="lg" className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 font-bold text-white">
                        <Link to="/entertainment/investors">Investor Information</Link>
                      </Button>
                      <Button asChild size="lg" variant="outline" className="border-prodyum-lime-500/60 text-white hover:bg-prodyum-lime-500/20">
                        <Link to="/entertainment/contact">Contact Us</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      <TimelineSection />
      <TestimonialSection />
      <TeamSection />

      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden py-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute left-1/4 top-0 h-96 w-96 animate-pulse rounded-full bg-prodyum-green-500 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 animate-pulse rounded-full bg-prodyum-lime-500 blur-3xl" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mx-auto max-w-4xl space-y-8 text-center">
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">Ready to bring your vision to life?</h2>
            <p className="text-xl text-gray-300">
              Whether you're an investor looking for premium content opportunities or talent seeking to join our team, we'd love to hear from you.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
              <Button asChild size="lg" className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 px-8 py-6 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-prodyum-blue-500/50">
                <Link to="/entertainment/investors">Investor Information</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-prodyum-green-500/60 px-8 py-6 text-lg text-white backdrop-blur-sm transition-all duration-300 hover:border-prodyum-green-400 hover:bg-prodyum-green-500/20">
                <Link to="/entertainment/casting">Apply: Cast &amp; Crew</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
