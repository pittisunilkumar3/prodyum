import React from 'react';
import { Card, CardContent } from './ui/card';
import { Film, Award, TrendingUp, Users, Sparkles } from 'lucide-react';

const TimelineSection = () => {
  const milestones = [
    {
      year: '2020',
      title: 'Foundation',
      description: 'ProDyum Entertainments established with a vision to revolutionize Telugu cinema production.',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800'
    },
    {
      year: '2021',
      title: 'First Productions',
      description: 'Launched our first web series and short film productions with critical acclaim.',
      icon: Film,
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800'
    },
    {
      year: '2022',
      title: 'Award Recognition',
      description: 'Received multiple awards for best cinematography and sound design at regional film festivals.',
      icon: Award,
      image: 'https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?w=800'
    },
    {
      year: '2023',
      title: 'Expansion',
      description: 'Expanded post-production capabilities with state-of-the-art DI suite and VFX studio.',
      icon: TrendingUp,
      image: 'https://images.unsplash.com/photo-1574267432644-f74f8ec1e93b?w=800'
    },
    {
      year: '2024',
      title: 'Industry Leader',
      description: 'Established as a leading production house with 15+ successful projects and growing team.',
      icon: Users,
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800'
    }
  ];

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="text-amber-500 text-sm font-semibold uppercase tracking-wider">Our Journey</span>
          <h2 className="text-5xl font-bold text-white mt-4 mb-6">Timeline of Excellence</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6" />
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            From humble beginnings to industry leadership
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-amber-500/50 to-transparent" />

          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className="flex-1 w-full">
                  <Card className="bg-neutral-900 border-white/10 hover:border-amber-500/50 transition-all duration-500 group overflow-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                      <div className="relative overflow-hidden aspect-video sm:aspect-square">
                        <img
                          src={milestone.image}
                          alt={milestone.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                        <div className="absolute top-6 left-6">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 backdrop-blur-sm border border-amber-500/50">
                            <milestone.icon className="h-8 w-8 text-amber-500" />
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-8 flex flex-col justify-center">
                        <div className="text-6xl font-bold text-amber-500/20 mb-4">{milestone.year}</div>
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors duration-300">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed">{milestone.description}</p>
                      </CardContent>
                    </div>
                  </Card>
                </div>

                {/* Timeline Dot */}
                <div className="hidden lg:flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-amber-500 border-4 border-black shadow-lg shadow-amber-500/50" />
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;