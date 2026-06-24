import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Card } from './ui/card';
import { Film, Award, TrendingUp, Users, Sparkles } from 'lucide-react';
import ScrollReveal from './animation/ScrollReveal';

const TimelineSection = () => {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 70%', 'end 70%'],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const milestones = [
    {
      year: '2020',
      title: 'Foundation',
      description: 'ProDyum Entertainments established with a vision to revolutionize Telugu cinema production.',
      icon: Sparkles,
      image: 'https://picsum.photos/seed/timeline2020/800/600',
    },
    {
      year: '2021',
      title: 'First Productions',
      description: 'Launched our first web series and short film productions with critical acclaim.',
      icon: Film,
      image: 'https://picsum.photos/seed/timeline2021/800/600',
    },
    {
      year: '2022',
      title: 'Award Recognition',
      description: 'Received multiple awards for best cinematography and sound design at regional film festivals.',
      icon: Award,
      image: 'https://picsum.photos/seed/timeline2022/800/600',
    },
    {
      year: '2023',
      title: 'Expansion',
      description: 'Expanded post-production capabilities with state-of-the-art DI suite and VFX studio.',
      icon: TrendingUp,
      image: 'https://picsum.photos/seed/timeline2023/800/600',
    },
    {
      year: '2024',
      title: 'Industry Leader',
      description: 'Established as a leading production house with 15+ successful projects and growing team.',
      icon: Users,
      image: 'https://picsum.photos/seed/timeline2024/800/600',
    },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute right-1/4 top-0 h-80 w-80 rounded-full bg-prodyum-blue-500/15 blur-3xl" />
        <div className="absolute left-1/4 bottom-0 h-80 w-80 rounded-full bg-prodyum-green-500/15 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-20 text-center">
          <span className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 bg-clip-text text-sm font-semibold uppercase tracking-[0.2em] text-transparent">
            Our Journey
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-gradient-animated md:text-5xl">
            Timeline of Excellence
          </h2>
          <div className="mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500" />
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-300">
            From humble beginnings to industry leadership
          </p>
        </ScrollReveal>

        <div className="relative">
          {/* central film-reel spine */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/10 lg:block" />
          <motion.div
            className="absolute left-1/2 top-0 hidden h-full w-px origin-top -translate-x-1/2 bg-gradient-to-b from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500 lg:block"
            style={{ scaleY: reduce ? 1 : lineScaleY }}
          />

          <div className="space-y-16">
            {milestones.map((milestone, index) => {
              const left = index % 2 === 0;
              return (
                <ScrollReveal key={milestone.year} className="relative">
                  <div className={`flex flex-col items-center gap-8 lg:flex-row ${left ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    {/* card */}
                    <div className="w-full flex-1">
                      <motion.div
                        whileHover={{ y: -6 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="group"
                        data-cursor-label={milestone.year}
                      >
                        <Card className="overflow-hidden rounded-3xl glass-panel gradient-border transition-all duration-500 hover:border-prodyum-green-500/40 hover:shadow-[0_30px_80px_-30px_rgba(76,175,80,0.4)]">
                          <div className="grid grid-cols-1 sm:grid-cols-2">
                            <div className="relative aspect-video overflow-hidden sm:aspect-square">
                              <img
                                src={milestone.image}
                                alt={milestone.title}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://via.placeholder.com/800x600/050505/ffffff?text=' + milestone.year;
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                              <div className="absolute left-6 top-6">
                                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-prodyum-green-500/50 bg-black/40 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                                  <milestone.icon className="h-8 w-8 text-prodyum-green-400" />
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col justify-center p-8">
                              <div className="mb-3 font-display text-6xl font-bold text-gradient-animated">{milestone.year}</div>
                              <h3 className="font-display text-2xl font-bold text-white transition-colors duration-300 group-hover:text-prodyum-lime-400">
                                {milestone.title}
                              </h3>
                              <p className="mt-3 leading-relaxed text-gray-300">{milestone.description}</p>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    </div>

                    {/* reel node */}
                    <div className="relative hidden flex-shrink-0 lg:block">
                      <motion.div
                        className="relative flex h-12 w-12 items-center justify-center rounded-full border-4 border-black bg-gradient-to-br from-prodyum-blue-500 to-prodyum-green-500 shadow-lg shadow-prodyum-green-500/40"
                        whileInView={{ scale: [0, 1.3, 1] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="h-3 w-3 rounded-full bg-white" />
                        <span className="absolute inset-0 animate-ping rounded-full bg-prodyum-green-500/30" />
                      </motion.div>
                    </div>

                    <div className="hidden flex-1 lg:block" />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
