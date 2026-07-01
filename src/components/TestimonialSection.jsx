import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { testimonials } from '../mock';

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-32 bg-neutral-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-prodyum-blue-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-prodyum-green-500 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 text-transparent bg-clip-text text-sm font-semibold uppercase tracking-wider">Testimonials</span>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-prodyum-blue-400 via-prodyum-green-400 to-prodyum-lime-400 text-transparent bg-clip-text mt-4 mb-6">What People Say</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500 mx-auto" />
          </div>

          <Card className="bg-gradient-to-br from-prodyum-blue-500/10 via-black/40 to-prodyum-green-500/10 border-2 border-prodyum-blue-500/30 hover:border-prodyum-green-500/50 backdrop-blur-xl relative overflow-hidden transition-all duration-500">
            <div className="absolute top-0 left-0 w-32 h-32 opacity-10">
              <Quote className="w-full h-full text-prodyum-green-400" />
            </div>
            <CardContent className="p-12 sm:p-16 relative z-10">
              <div className="flex items-center justify-center mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-prodyum-green-400 fill-prodyum-green-400" />
                ))}
              </div>
              <blockquote className="text-2xl sm:text-3xl text-white text-center font-light leading-relaxed mb-8 italic">
                "{currentTestimonial.content}"
              </blockquote>
              <div className="text-center">
                <p className="bg-gradient-to-r from-prodyum-blue-400 to-prodyum-green-400 text-transparent bg-clip-text font-semibold text-lg">{currentTestimonial.name}</p>
                <p className="text-gray-300 text-sm mt-1">{currentTestimonial.role}</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border-2 border-prodyum-blue-500/30 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gradient-to-br hover:from-prodyum-blue-500 hover:to-prodyum-green-500 hover:border-prodyum-green-500 hover:scale-110 transition-all duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'w-8 bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500' : 'w-2 bg-white/30 hover:bg-prodyum-green-400/50'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border-2 border-prodyum-blue-500/30 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gradient-to-br hover:from-prodyum-blue-500 hover:to-prodyum-green-500 hover:border-prodyum-green-500 hover:scale-110 transition-all duration-300"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;