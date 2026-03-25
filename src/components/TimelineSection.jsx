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
      image: 'https://picsum.photos/seed/timeline2020/800/600'
    },
    {
      year: '2021',
      title: 'First Productions',
      description: 'Launched our first web series and short film productions with critical acclaim.',
      icon: Film,
      image: 'https://picsum.photos/seed/timeline2021/800/600'
    },
    {
      year: '2022',
      title: 'Award Recognition',
      description: 'Received multiple awards for best cinematography and sound design at regional film festivals.',
      icon: Award,
      image: 'https://picsum.photos/seed/timeline2022/800/600'
    },
    {
      year: '2023',
      title: 'Expansion',
      description: 'Expanded post-production capabilities with state-of-the-art DI suite and VFX studio.',
      icon: TrendingUp,
      image: 'https://picsum.photos/seed/timeline2023/800/600'
    },
    {
      year: '2024',
      title: 'Industry Leader',
      description: 'Established as a leading production house with 15+ successful projects and growing team.',
      icon: Users,
      image: 'https://picsum.photos/seed/timeline2024/800/600'
    }
  ];

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-prodyum-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-prodyum-green-500 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 text-transparent bg-clip-text text-sm font-semibold uppercase tracking-wider">Our Journey</span>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-prodyum-blue-400 via-prodyum-green-400 to-prodyum-lime-400 text-transparent bg-clip-text mt-4 mb-6">Timeline of Excellence</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500 mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            From humble beginnings to industry leadership
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500/50" />

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
                  <Card className="bg-gradient-to-br from-prodyum-blue-500/5 via-prodyum-green-500/5 to-black border-prodyum-blue-500/30 hover:border-prodyum-green-500/60 transition-all duration-500 group overflow-hidden hover:shadow-xl hover:shadow-prodyum-green-500/20">
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                      <div className="relative overflow-hidden aspect-video sm:aspect-square">
                        <img
                          src={milestone.image}
                          alt={milestone.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/800x600/1a1a1a/ffffff?text=' + milestone.year;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                        <div className="absolute top-6 left-6">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-prodyum-blue-500/30 to-prodyum-green-500/30 backdrop-blur-sm border border-prodyum-green-500/50 group-hover:scale-110 transition-transform duration-300">
                            <milestone.icon className="h-8 w-8 text-prodyum-green-400" />
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-8 flex flex-col justify-center">
                        <div className="text-6xl font-bold bg-gradient-to-r from-prodyum-blue-500/20 to-prodyum-green-500/20 text-transparent bg-clip-text mb-4">{milestone.year}</div>
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-prodyum-blue-400 group-hover:to-prodyum-green-400 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">{milestone.description}</p>
                      </CardContent>
                    </div>
                  </Card>
                </div>

                {/* Timeline Dot */}
                <div className="hidden lg:flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-prodyum-blue-500 to-prodyum-green-500 border-4 border-black shadow-lg shadow-prodyum-green-500/50" />
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
