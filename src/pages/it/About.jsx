import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import {
  ArrowRight,
  Target,
  Eye,
  Users,
  Award,
  Lightbulb,
  Heart,
  Shield,
  Zap,
  CheckCircle2,
  Building2,
  Monitor,
} from 'lucide-react';
import TiltCard from '../../components/TiltCard';
import ScrollReveal from '../../components/ScrollReveal';
import { NumberTicker, AnimatedShinyText, SparklesCore, BorderBeam, BackgroundBeams, MorphingBlob, StaggeredList, TypingText } from '../../components/animations';
import Spotlight from '../../components/animations/Spotlight';
import DotPattern from '../../components/animations/DotPattern';

const ITAbout = () => {
  const values = [
    { icon: Lightbulb, title: 'Innovation', description: 'We constantly explore new technologies and creative approaches to deliver cutting-edge solutions.' },
    { icon: Heart, title: 'Client Focus', description: 'Your success is our priority. We work closely with you to understand and achieve your goals.' },
    { icon: Shield, title: 'Quality', description: 'We maintain the highest standards in everything we do, from design to development to delivery.' },
    { icon: Users, title: 'Collaboration', description: 'We believe in the power of teamwork and maintain transparent communication throughout every project.' },
    { icon: Zap, title: 'Agility', description: 'We adapt quickly to changing needs and market conditions to deliver results efficiently.' },
    { icon: Award, title: 'Excellence', description: 'We strive for excellence in every project, no matter how big or small.' },
  ];

  const milestones = [
    { year: '2019', title: 'Company Founded', description: 'ProDyum IT was established in Hyderabad.' },
    { year: '2020', title: 'Expanded Services', description: 'Added web development and video production.' },
    { year: '2021', title: '50+ Clients', description: 'Reached milestone of serving over 50 clients.' },
    { year: '2022', title: 'Team Growth', description: 'Expanded our team to 15+ professionals.' },
    { year: '2023', title: '100+ Projects', description: 'Successfully delivered over 100 projects.' },
    { year: '2024', title: 'Continued Growth', description: 'Continuing to innovate and expand.' },
  ];

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
          <SparklesCore particleCount={30} particleColor="#1E88E5" className="absolute inset-0 w-full h-full" background="transparent" />
          <MorphingBlob color="rgba(76, 175, 80, 0.05)" size={350} speed={7} className="absolute top-10 right-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal animation="zoomIn">
              <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
                <Building2 className="h-4 w-4 text-prodyum-green-400" />
                <AnimatedShinyText className="text-gray-300 text-sm">About Us</AnimatedShinyText>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={100}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                About{' '}
                <span className="bg-gradient-to-r from-prodyum-blue-400 to-prodyum-green-400 bg-clip-text text-transparent">
                  ProDyum IT
                </span>
              </h1>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={200}>
              <p className="text-xl text-gray-300 leading-relaxed">
                Empowering businesses with innovative digital solutions that drive growth and visibility.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 lg:py-24 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal animation="fadeLeft">
                <div className="inline-flex items-center space-x-2 bg-prodyum-blue-500/10 border border-prodyum-blue-500/20 rounded-full px-4 py-2 mb-6">
                  <Building2 className="h-4 w-4 text-prodyum-blue-400" />
                  <span className="text-prodyum-blue-400 text-sm font-medium">Who We Are</span>
                </div>
              </ScrollReveal>
              <ScrollReveal animation="fadeLeft" delay={100}>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Company Overview</h2>
              </ScrollReveal>
              <ScrollReveal animation="fadeLeft" delay={200}>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  ProDyum IT Pvt Ltd is a digital services company helping businesses build their
                  online presence through creative design, digital marketing, and technology solutions.
                </p>
              </ScrollReveal>
              <ScrollReveal animation="fadeLeft" delay={300}>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  We combine creativity, strategy, and technology to deliver solutions that help
                  brands grow and succeed in the digital world.
                </p>
              </ScrollReveal>
              <ScrollReveal animation="fadeLeft" delay={400}>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Based in Hyderabad, we serve clients across India, providing comprehensive digital
                  solutions tailored to their unique needs and goals.
                </p>
              </ScrollReveal>
            </div>

            <div className="relative">
              <ScrollReveal animation="fadeRight" delay={200}>
                <TiltCard
                  tiltOptions={{ maxTilt: 8, scale: 1.01 }}
                  className="bg-gradient-to-br from-prodyum-blue-500 to-prodyum-green-500 rounded-3xl p-8 text-white shadow-xl shadow-prodyum-blue-500/25"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Monitor className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">ProDyum IT Pvt Ltd</h3>
                      <p className="text-white/80">Digital Solutions Company</p>
                    </div>
                  </div>
                  <p className="text-white/90 mb-6">
                    Hyderabad-based digital solutions company focused on helping businesses grow
                    through technology, creativity, and strategic digital marketing.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold mb-1"><NumberTicker value={100} suffix="+" /></div>
                      <div className="text-sm text-white/80">Happy Clients</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold mb-1"><NumberTicker value={50} suffix="+" /></div>
                      <div className="text-sm text-white/80">Projects</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold mb-1"><NumberTicker value={15} suffix="+" /></div>
                      <div className="text-sm text-white/80">Team Members</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold mb-1"><NumberTicker value={5} suffix="+" /></div>
                      <div className="text-sm text-white/80">Years</div>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <ScrollReveal animation="fadeLeft">
              <TiltCard className="bg-black/50 border border-white/10 rounded-3xl p-8 md:p-10 h-full">
                <div className="h-16 w-16 bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-blue-500/30 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-prodyum-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  To empower businesses with innovative digital solutions that drive growth and visibility.
                  We are committed to delivering measurable results through strategic digital marketing,
                  creative design, and cutting-edge technology.
                </p>
              </TiltCard>
            </ScrollReveal>

            <ScrollReveal animation="fadeRight">
              <TiltCard className="bg-black/50 border border-white/10 rounded-3xl p-8 md:p-10 h-full">
                <div className="h-16 w-16 bg-gradient-to-br from-prodyum-green-500/20 to-prodyum-green-500/30 rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="h-8 w-8 text-prodyum-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  To become a trusted digital partner for businesses by delivering impactful marketing
                  and technology solutions. We envision a world where every business can thrive in
                  the digital landscape.
                </p>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 lg:py-24 bg-black relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <ScrollReveal animation="fadeUp">
              <div className="inline-flex items-center space-x-2 bg-prodyum-green-500/10 border border-prodyum-green-500/20 rounded-full px-4 py-2 mb-6">
                <Heart className="h-4 w-4 text-prodyum-green-400" />
                <span className="text-prodyum-green-400 text-sm font-medium">Our Values</span>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={100}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Drives Us</h2>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={200}>
              <p className="text-xl text-gray-400">Our core values guide everything we do</p>
            </ScrollReveal>
          </div>
          <Spotlight className="absolute inset-0" fill="rgba(30, 136, 229, 0.03)" />

          <StaggeredList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={100} animation="fadeUp">
            {values.map((value, index) => (
              <TiltCard key={index} className="group bg-gray-900/50 border border-white/10 rounded-2xl p-8 hover:border-prodyum-blue-500/50 transition-all duration-300 h-full">
                <div className="h-14 w-14 bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-7 w-7 text-prodyum-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </TiltCard>
            ))}
          </StaggeredList>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <MorphingBlob className="absolute top-1/2 left-1/4" color="rgba(30,136,229,0.04)" />
          <div className="text-center max-w-3xl mx-auto mb-16">
            <ScrollReveal animation="fadeUp">
              <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 mb-6">
                <Award className="h-4 w-4 text-prodyum-green-400" />
                <span className="text-gray-300 text-sm font-medium">Our Journey</span>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={100}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Company{' '}
                <span className="bg-gradient-to-r from-prodyum-blue-400 to-prodyum-green-400 bg-clip-text text-transparent">
                  Milestones
                </span>
              </h2>
            </ScrollReveal>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-prodyum-blue-500 to-prodyum-green-500 transform md:-translate-x-1/2" />

              {milestones.map((milestone, index) => (
                <ScrollReveal
                  key={index}
                  animation={index % 2 === 0 ? 'fadeRight' : 'fadeLeft'}
                  delay={index * 100}
                >
                  <div
                    className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                      index % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <div className={`flex-1 md:w-1/2 ${index % 2 === 0 ? 'md:text-left md:pl-12' : 'md:text-right md:pr-12'} pl-8 md:pl-0`}>
                      <TiltCard tiltOptions={{ maxTilt: 5, scale: 1.01 }} className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 hover:border-prodyum-green-500/50 transition-all duration-300">
                        <span className="text-prodyum-green-400 font-bold text-lg">{milestone.year}</span>
                        <h3 className="text-xl font-bold text-white mt-2 mb-2">{milestone.title}</h3>
                        <p className="text-gray-400">{milestone.description}</p>
                      </TiltCard>
                    </div>

                    <div className="absolute left-0 md:left-1/2 top-6 w-4 h-4 bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 rounded-full transform -translate-x-1/2 border-4 border-gray-900" />

                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-prodyum-blue-600 to-prodyum-green-600 relative overflow-hidden">
        <BackgroundBeams className="absolute inset-0" beamColor="rgba(255,255,255,0.15)" />
        <DotPattern className="absolute inset-0" dotSize={1} gap={20} color="rgba(255,255,255,0.1)" />
        <ScrollReveal animation="zoomIn">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Let's discuss how our digital solutions can help your business grow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-prodyum-blue-600 hover:bg-gray-100 font-bold px-8 shadow-xl"
              >
                <Link to="/it/contact" className="flex items-center gap-2">
                  Contact Us <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-bold px-8"
              >
                <Link to="/it/services">View Services</Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default ITAbout;
