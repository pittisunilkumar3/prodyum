import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Card } from './ui/card';
import { ChevronLeft, ChevronRight, Quote, Star, Film } from 'lucide-react';
import { testimonials } from '../mock';
import ScrollReveal from './animation/ScrollReveal';

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reduce = useReducedMotion();

  const nextTestimonial = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // auto-advance
  useEffect(() => {
    if (reduce) return undefined;
    const t = setInterval(nextTestimonial, 6500);
    return () => clearInterval(t);
  }, [reduce]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative overflow-hidden py-28">
      {/* ambient brand lighting */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-1/4 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-prodyum-blue-500/15 blur-3xl" />
        <div className="absolute right-1/4 top-1/2 h-[600px] w-[600px] translate-x-1/2 -translate-y-1/2 rounded-full bg-prodyum-green-500/15 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal className="mb-16 text-center">
            <span className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 bg-clip-text text-sm font-semibold uppercase tracking-[0.2em] text-transparent">
              Testimonials
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold text-gradient-animated md:text-5xl">
              Critical Acclaim
            </h2>
            <div className="mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500" />
          </ScrollReveal>

          <div className="relative">
            <Card className="relative overflow-hidden rounded-3xl glass-panel-strong gradient-border p-10 sm:p-16">
              {/* film-strip top/bottom accents */}
              <div className="pointer-events-none absolute inset-x-0 top-0 flex h-3 items-center gap-2 bg-black/40">
                {Array.from({ length: 30 }).map((_, i) => (
                  <span key={i} className="h-1.5 w-3 rounded-sm bg-white/10" />
                ))}
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-3 items-center gap-2 bg-black/40">
                {Array.from({ length: 30 }).map((_, i) => (
                  <span key={i} className="h-1.5 w-3 rounded-sm bg-white/10" />
                ))}
              </div>

              <Quote className="absolute left-8 top-10 h-24 w-24 text-prodyum-green-500/10" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 text-center"
                >
                  <div className="mb-6 flex items-center justify-center gap-1">
                    {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.1 + i * 0.06, type: 'spring', stiffness: 300, damping: 14 }}
                      >
                        <Star className="h-6 w-6 fill-prodyum-lime-500 text-prodyum-lime-500" />
                      </motion.span>
                    ))}
                  </div>

                  <blockquote className="mx-auto max-w-3xl font-display text-2xl font-light italic leading-relaxed text-white sm:text-3xl">
                    &ldquo;{currentTestimonial.content}&rdquo;
                  </blockquote>

                  <div className="mt-8 flex items-center justify-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-prodyum-blue-500 to-prodyum-green-500">
                      <Film className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-gradient-animated text-lg font-semibold">{currentTestimonial.name}</p>
                      <p className="text-sm text-gray-300">{currentTestimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </Card>

            {/* controls */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
                className="group flex h-12 w-12 items-center justify-center rounded-full border-2 border-prodyum-blue-500/30 bg-black/40 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-prodyum-green-500 hover:bg-gradient-to-br hover:from-prodyum-blue-500 hover:to-prodyum-green-500"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-8 bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500'
                        : 'w-2 bg-white/30 hover:bg-prodyum-green-400/50'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                aria-label="Next testimonial"
                className="group flex h-12 w-12 items-center justify-center rounded-full border-2 border-prodyum-blue-500/30 bg-black/40 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-prodyum-green-500 hover:bg-gradient-to-br hover:from-prodyum-blue-500 hover:to-prodyum-green-500"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
