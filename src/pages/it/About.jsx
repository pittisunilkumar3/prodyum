import React from 'react';
import {
  Target,
  Eye,
  Users,
  Award,
  Lightbulb,
  Heart,
  Shield,
  Zap,
  Building2,
  Monitor
} from 'lucide-react';

const AboutSection = () => {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We constantly explore new technologies and creative approaches to deliver cutting-edge solutions.'
    },
    {
      icon: Heart,
      title: 'Client Focus',
      description: 'Your success is our priority. We work closely with you to understand and achieve your goals.'
    },
    {
      icon: Shield,
      title: 'Quality',
      description: 'We maintain the highest standards in everything we do, from design to development to delivery.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and maintain transparent communication throughout every project.'
    },
    {
      icon: Zap,
      title: 'Agility',
      description: 'We adapt quickly to changing needs and market conditions to deliver results efficiently.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every project, no matter how big or small.'
    }
  ];

  const milestones = [
    { year: '2019', title: 'Company Founded', description: 'ProDyum IT was established in Hyderabad.' },
    { year: '2020', title: 'Expanded Services', description: 'Added web development and video production.' },
    { year: '2021', title: '50+ Clients', description: 'Reached milestone of serving over 50 clients.' },
    { year: '2022', title: 'Team Growth', description: 'Expanded our team to 15+ professionals.' },
    { year: '2023', title: '100+ Projects', description: 'Successfully delivered over 100 projects.' },
    { year: '2024', title: 'Continued Growth', description: 'Continuing to innovate and expand.' }
  ];

  return (
    <section id="about" className="scroll-mt-24">
      {/* Section Heading */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
          <Building2 className="h-4 w-4 text-prodyum-green-400" />
          <span className="text-gray-300 text-sm">About Us</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          About <span className="bg-gradient-to-r from-prodyum-blue-400 to-prodyum-green-400 bg-clip-text text-transparent">ProDyum IT</span>
        </h2>
        <p className="text-xl text-gray-300 leading-relaxed">
          Empowering businesses with innovative digital solutions that drive growth and visibility.
        </p>
      </div>

      {/* Company Overview */}
      <div className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-prodyum-blue-500/10 border border-prodyum-blue-500/20 rounded-full px-4 py-2 mb-6">
                <Building2 className="h-4 w-4 text-prodyum-blue-400" />
                <span className="text-prodyum-blue-400 text-sm font-medium">Who We Are</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Company Overview
              </h3>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                ProDyum IT Pvt Ltd is a digital services company helping businesses build their
                online presence through creative design, digital marketing, and technology solutions.
              </p>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                We combine creativity, strategy, and technology to deliver solutions that help
                brands grow and succeed in the digital world.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Based in Hyderabad, we serve clients across India, providing comprehensive digital
                solutions tailored to their unique needs and goals.
              </p>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-prodyum-blue-500 to-prodyum-green-500 rounded-3xl p-8 text-white shadow-xl shadow-prodyum-blue-500/25">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Monitor className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold">ProDyum IT Pvt Ltd</h4>
                    <p className="text-white/80">Digital Solutions Company</p>
                  </div>
                </div>
                <p className="text-white/90 mb-6">
                  Hyderabad-based digital solutions company focused on helping businesses grow
                  through technology, creativity, and strategic digital marketing.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold mb-1">100+</div>
                    <div className="text-sm text-white/80">Happy Clients</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold mb-1">50+</div>
                    <div className="text-sm text-white/80">Projects</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold mb-1">15+</div>
                    <div className="text-sm text-white/80">Team Members</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold mb-1">5+</div>
                    <div className="text-sm text-white/80">Years</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16 lg:py-20 bg-gray-900/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-black/50 border border-white/10 rounded-3xl p-8 md:p-10">
              <div className="h-16 w-16 bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-blue-500/30 rounded-2xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-prodyum-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                To empower businesses with innovative digital solutions that drive growth and visibility.
                We are committed to delivering measurable results through strategic digital marketing,
                creative design, and cutting-edge technology.
              </p>
            </div>

            <div className="bg-black/50 border border-white/10 rounded-3xl p-8 md:p-10">
              <div className="h-16 w-16 bg-gradient-to-br from-prodyum-green-500/20 to-prodyum-green-500/30 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-prodyum-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                To become a trusted digital partner for businesses by delivering impactful marketing
                and technology solutions. We envision a world where every business can thrive in
                the digital landscape.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 bg-prodyum-green-500/10 border border-prodyum-green-500/20 rounded-full px-4 py-2 mb-6">
              <Heart className="h-4 w-4 text-prodyum-green-400" />
              <span className="text-prodyum-green-400 text-sm font-medium">Our Values</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Drives Us
            </h3>
            <p className="text-xl text-gray-400">
              Our core values guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-gray-900/50 border border-white/10 rounded-2xl p-8 hover:border-prodyum-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-prodyum-blue-500/10"
              >
                <div className="h-14 w-14 bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-7 w-7 text-prodyum-blue-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{value.title}</h4>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-16 lg:py-24 bg-gradient-to-b from-gray-900/60 to-black/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 mb-6">
              <Award className="h-4 w-4 text-prodyum-green-400" />
              <span className="text-gray-300 text-sm font-medium">Our Journey</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Company <span className="bg-gradient-to-r from-prodyum-blue-400 to-prodyum-green-400 bg-clip-text text-transparent">Milestones</span>
            </h3>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-prodyum-blue-500 to-prodyum-green-500 transform md:-translate-x-1/2" />

              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className={`flex-1 md:w-1/2 ${index % 2 === 0 ? 'md:text-left md:pl-12' : 'md:text-right md:pr-12'} pl-8 md:pl-0`}>
                    <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 hover:border-prodyum-green-500/50 transition-all duration-300">
                      <span className="text-prodyum-green-400 font-bold text-lg">{milestone.year}</span>
                      <h4 className="text-xl font-bold text-white mt-2 mb-2">{milestone.title}</h4>
                      <p className="text-gray-400">{milestone.description}</p>
                    </div>
                  </div>

                  <div className="absolute left-0 md:left-1/2 top-6 w-4 h-4 bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 rounded-full transform -translate-x-1/2 border-4 border-gray-900" />

                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
