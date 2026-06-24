import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { CheckCircle2, Film, Palette, Volume2, Zap, Sparkles, Cpu, Aperture, Clapperboard, Radio } from 'lucide-react';
import { services } from '../mock';
import ScrollReveal from '../components/animation/ScrollReveal';
import LensFlare from '../components/entertainment/LensFlare';

const Services = () => {
  const reduce = useReducedMotion();
  const productionServices = services.filter((s) => s.category === 'Production');
  const postProductionServices = services.filter((s) => s.category === 'Post-Production');
  const deliveryServices = services.filter((s) => s.category === 'Delivery');

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const whyChoose = [
    { icon: Film, title: 'Cinema-First Creative', description: 'Story-driven approach with artistic excellence' },
    { icon: CheckCircle2, title: 'Transparent Budgets', description: 'Clear milestone-based tracking and reporting' },
    { icon: Zap, title: 'Faster Turnaround', description: 'In-house pipeline ensures speed and quality' },
    { icon: Palette, title: 'Trusted Collaborators', description: 'Experienced team with proven track record' },
  ];

  // Large 3D centerpiece visuals per section
  const SectionCenterpiece = ({ icon: Icon, label, glow }) => (
    <div className="relative mx-auto mb-16 hidden h-64 w-full max-w-md items-center justify-center lg:flex">
      <LensFlare x="50%" y="50%" size={300} />
      {/* rotating rings */}
      <motion.div
        className="absolute inset-0 rounded-full border border-white/10"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-8 rounded-full border border-dashed border-prodyum-green-500/20"
        animate={reduce ? undefined : { rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
      {/* center equipment "console" */}
      <motion.div
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <div className="absolute -inset-10 rounded-full bg-prodyum-green-500/25 blur-3xl" />
        <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl glass-panel-strong gradient-border">
          <Icon className="h-14 w-14 text-prodyum-green-400" style={{ transform: 'translateZ(20px)' }} />
        </div>
      </motion.div>
      {/* orbiting chips */}
      {[
        { icon: Aperture, angle: 0, color: 'from-prodyum-blue-500 to-prodyum-green-500' },
        { icon: Clapperboard, angle: 90, color: 'from-prodyum-green-500 to-prodyum-lime-500' },
        { icon: Radio, angle: 180, color: 'from-prodyum-lime-500 to-prodyum-blue-500' },
        { icon: Cpu, angle: 270, color: 'from-prodyum-blue-500 to-prodyum-green-500' },
      ].map((chip, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: 'center' }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ transform: `rotate(${chip.angle}deg) translateY(-140px)` }}
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${chip.color} shadow-lg`}>
              <div className="flex h-full w-full items-center justify-center rounded-xl border border-white/20 bg-black/30">
                <chip.icon className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
      {label && (
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">{label}</span>
      )}
    </div>
  );

  const ServiceCard = ({ service, index, accent }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      data-cursor-label="Explore"
    >
      <Card className="group h-full overflow-hidden rounded-3xl glass-panel gradient-border transition-all duration-500 hover:border-prodyum-green-500/50 hover:shadow-2xl hover:shadow-prodyum-green-500/20">
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-prodyum-green-500/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
        <div className="relative p-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <div className={`mb-2 bg-gradient-to-r ${accent} bg-clip-text text-sm font-semibold uppercase tracking-wider text-transparent`}>
                {service.category}
              </div>
              <h3 className="font-display text-2xl font-bold text-white transition-colors duration-300 group-hover:text-prodyum-green-500">{service.title}</h3>
            </div>
          </div>
          <p className="mb-6 text-sm leading-relaxed text-gray-300">{service.description}</p>
          <ul className="space-y-3">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-start text-sm text-gray-300">
                <CheckCircle2 className="mr-3 mt-0.5 h-4 w-4 flex-shrink-0 text-prodyum-green-400" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className="relative min-h-screen pt-32 pb-24">
      {/* HERO */}
      <section ref={heroRef} className="relative mb-20">
        <motion.div style={reduce ? undefined : { y: heroY }}>
          <ScrollReveal className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 text-xs text-gray-300">
              <Film className="h-4 w-4 text-prodyum-green-400" /> Studio Capabilities
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold text-gradient-animated sm:text-6xl">Our Services</h1>
            <div className="mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500" />
            <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-300">
              We deliver end-to-end film production and a robust post-production workflow
            </p>
          </ScrollReveal>
        </motion.div>
      </section>

      {/* WHY CHOOSE */}
      <section className="relative mb-24">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Card className="overflow-hidden rounded-3xl glass-panel-strong gradient-border p-8 sm:p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-prodyum-blue-500/10 via-prodyum-green-500/5 to-transparent" />
              <div className="relative">
                <h2 className="mb-8 text-center font-display text-3xl font-bold text-gradient-animated">Why Choose ProDyum?</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {whyChoose.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      className="group space-y-3 text-center"
                    >
                      <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-prodyum-blue-500/30 to-prodyum-green-500/30 transition-transform duration-300 hover:scale-110">
                        <item.icon className="h-6 w-6 text-prodyum-green-400" />
                      </div>
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="text-sm text-gray-300">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* PRODUCTION */}
      <section className="relative mb-24">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionCenterpiece icon={Clapperboard} label="On Set" glow="green" />
          <ScrollReveal className="mb-12">
            <h2 className="font-display text-3xl font-bold text-gradient-animated sm:text-4xl">Production Services</h2>
            <div className="mt-4 h-1 w-20 bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500" />
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {productionServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} accent="from-prodyum-blue-400 to-prodyum-green-400" />
            ))}
          </div>
        </div>
      </section>

      {/* POST-PRODUCTION */}
      <section className="relative mb-24">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionCenterpiece icon={Cpu} label="Post & Grade" glow="blue" />
          <ScrollReveal className="mb-12">
            <h2 className="font-display text-3xl font-bold text-gradient-animated sm:text-4xl">Post-Production Services</h2>
            <div className="mt-4 h-1 w-20 bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500" />
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {postProductionServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} accent="from-prodyum-green-400 to-prodyum-lime-400" />
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section className="relative">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <SectionCenterpiece icon={Aperture} label="Final Delivery" glow="lime" />
          <ScrollReveal className="mb-12">
            <h2 className="font-display text-3xl font-bold text-gradient-animated sm:text-4xl">Delivery &amp; QC</h2>
            <div className="mt-4 h-1 w-20 bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500" />
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {deliveryServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} accent="from-prodyum-lime-400 to-prodyum-blue-400" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
