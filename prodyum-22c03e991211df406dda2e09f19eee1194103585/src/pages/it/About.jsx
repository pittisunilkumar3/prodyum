import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
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
  Building2,
  Monitor,
  Rocket,
} from 'lucide-react';
import ITLayout from '../../components/it/ITLayout';
import ScrollReveal from '../../components/animation/ScrollReveal';
import GlassCard from '../../components/animation/GlassCard';
import TiltCard from '../../components/animation/TiltCard';
import AnimatedCounter from '../../components/animation/AnimatedCounter';
import SectionHeading from '../../components/animation/SectionHeading';

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

const ITAbout = () => {
  const reduceMotion = useReducedMotion();
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 60%'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <ITLayout>
      {/* HERO */}
      <section className="relative overflow-hidden pb-16 pt-36 lg:pt-44">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 text-xs text-gray-300 backdrop-blur-sm">
                <Building2 className="h-4 w-4 text-prodyum-green-400" /> About Us
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h1 className="mt-6 font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                About <span className="text-gradient-animated">ProDyum IT</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-5 text-xl leading-relaxed text-gray-300">
                Empowering businesses with innovative digital solutions that drive growth and visibility.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* COMPANY OVERVIEW */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            <div>
              <ScrollReveal>
                <span className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 text-xs font-medium text-prodyum-blue-400">
                  <Building2 className="h-4 w-4" /> Who We Are
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.05}>
                <h2 className="mt-6 font-display text-3xl font-bold text-white md:text-4xl">Company Overview</h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className="mt-6 space-y-5 text-lg leading-relaxed text-gray-300">
                  <p>
                    ProDyum IT Pvt Ltd is a digital services company helping businesses build their
                    online presence through creative design, digital marketing, and technology solutions.
                  </p>
                  <p>
                    We combine creativity, strategy, and technology to deliver solutions that help
                    brands grow and succeed in the digital world.
                  </p>
                  <p>
                    Based in Hyderabad, we serve clients across India, providing comprehensive digital
                    solutions tailored to their unique needs and goals.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.1}>
              <TiltCard intensity={6} className="h-full">
                <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-prodyum-blue-500 to-prodyum-green-500 p-8 text-white shadow-2xl shadow-prodyum-blue-500/25">
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  {/* floating achievement badge */}
                  <motion.div
                    className="absolute -right-6 -top-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-md"
                    animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [0, 6, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Award className="h-9 w-9 text-white" />
                  </motion.div>
                  <div className="relative">
                    <div className="mb-6 flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                        <Monitor className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-bold">ProDyum IT Pvt Ltd</h3>
                        <p className="text-white/80">Digital Solutions Company</p>
                      </div>
                    </div>
                    <p className="text-white/90">
                      Hyderabad-based digital solutions company focused on helping businesses grow
                      through technology, creativity, and strategic digital marketing.
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      {[
                        { value: '100+', label: 'Happy Clients' },
                        { value: '50+', label: 'Projects' },
                        { value: '15+', label: 'Team Members' },
                        { value: '5+', label: 'Years' },
                      ].map((s) => (
                        <div key={s.label} className="rounded-xl bg-white/10 p-4 text-center">
                          <div className="font-display text-3xl font-bold">
                            <AnimatedCounter value={s.value} />
                          </div>
                          <div className="text-sm text-white/80">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <ScrollReveal>
              <GlassCard glow="blue" reveal={false} className="h-full p-8 md:p-10">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-blue-500/30">
                  <Target className="h-8 w-8 text-prodyum-blue-400" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">Our Mission</h3>
                <p className="mt-4 text-lg leading-relaxed text-gray-300">
                  To empower businesses with innovative digital solutions that drive growth and visibility.
                  We are committed to delivering measurable results through strategic digital marketing,
                  creative design, and cutting-edge technology.
                </p>
              </GlassCard>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <GlassCard glow="green" reveal={false} className="h-full p-8 md:p-10">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-prodyum-green-500/20 to-prodyum-green-500/30">
                  <Eye className="h-8 w-8 text-prodyum-green-400" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">Our Vision</h3>
                <p className="mt-4 text-lg leading-relaxed text-gray-300">
                  To become a trusted digital partner for businesses by delivering impactful marketing
                  and technology solutions. We envision a world where every business can thrive in
                  the digital landscape.
                </p>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Values"
            icon={Heart}
            title={<>What <span className="text-gradient-animated">Drives Us</span></>}
            subtitle="Our core values guide everything we do"
          />
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => (
              <GlassCard key={value.title} tilt glow={i % 3 === 0 ? 'blue' : i % 3 === 1 ? 'green' : 'lime'} delay={i * 0.06} className="p-8" reveal>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 transition-transform duration-300 group-hover:scale-110">
                  <value.icon className="h-7 w-7 text-prodyum-blue-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">{value.title}</h3>
                <p className="mt-3 text-gray-400">{value.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section ref={timelineRef} className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Journey"
            icon={Award}
            title={<>Company <span className="text-gradient-animated">Milestones</span></>}
          />

          <div className="relative mx-auto mt-20 max-w-4xl">
            {/* vertical glowing path */}
            <div className="absolute left-4 top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
            <motion.div
              className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500 md:left-1/2 md:-translate-x-1/2"
              style={{ scaleY: lineScale }}
            />

            <div className="space-y-12">
              {milestones.map((m, i) => {
                const left = i % 2 === 0;
                return (
                  <ScrollReveal key={m.year} delay={0.05} className="relative">
                    <div className={`relative flex flex-col gap-6 md:flex-row ${left ? 'md:flex-row-reverse' : ''}`}>
                      <div className={`flex-1 md:w-1/2 ${left ? 'md:pl-12 md:text-left' : 'md:pr-12 md:text-right'} pl-12 md:pl-0`}>
                        <GlassCard glow="green" reveal={false} className="p-6">
                          <span className="font-display text-lg font-bold text-prodyum-green-400">{m.year}</span>
                          <h3 className="mt-2 font-display text-xl font-bold text-white">{m.title}</h3>
                          <p className="mt-2 text-gray-400">{m.description}</p>
                        </GlassCard>
                      </div>

                      {/* node */}
                      <div className="absolute left-4 top-6 z-10 -translate-x-1/2 md:left-1/2">
                        <motion.div
                          className="flex h-4 w-4 items-center justify-center rounded-full border-4 border-ink bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500"
                          whileInView={{ scale: [0, 1.3, 1] }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>

                      <div className="hidden md:block md:w-1/2" />
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-prodyum-blue-600 to-prodyum-green-600 p-12 text-center lg:p-16">
              <div className="absolute inset-0 bg-grid opacity-20" />
              <div className="relative z-10">
                <Rocket className="mx-auto mb-4 h-8 w-8 text-white/80" />
                <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                  Ready to Work With Us?
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                  Let&apos;s discuss how our digital solutions can help your business grow.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button asChild size="lg" className="bg-white px-8 font-bold text-prodyum-blue-600 shadow-xl hover:bg-gray-100">
                    <Link to="/it/contact" className="flex items-center gap-2">
                      Contact Us <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-2 border-white px-8 font-bold text-white hover:bg-white/10">
                    <Link to="/it/services">View Services</Link>
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </ITLayout>
  );
};

export default ITAbout;
