import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import {
  ArrowRight,
  Megaphone,
  Palette,
  Globe,
  Video,
  Building2,
  GraduationCap,
  Rocket,
  ShoppingCart,
  Film,
  Store,
  Users,
  Target,
  Zap,
  Award,
  CheckCircle2,
  Lightbulb,
  FileText,
  PenTool,
  Monitor,
  Sparkles,
} from 'lucide-react';
import ITLayout from '../../components/it/ITLayout';
import ScrollReveal from '../../components/animation/ScrollReveal';
import GlassCard from '../../components/animation/GlassCard';
import TiltCard from '../../components/animation/TiltCard';
import MagneticButton from '../../components/animation/MagneticButton';
import AnimatedCounter from '../../components/animation/AnimatedCounter';
import SectionHeading from '../../components/animation/SectionHeading';

const services = [
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Helping businesses increase online visibility and reach the right audience through strategic marketing.',
    items: ['Social Media Management', 'Meta Ads & Google Ads', 'SEO', 'YouTube Marketing', 'Content Strategy'],
    glow: 'blue',
  },
  {
    icon: Palette,
    title: 'Branding & Design',
    description: 'Building strong brand identities and impactful visual communication.',
    items: ['Logo Design', 'Brand Identity Design', 'Social Media Creatives', 'Marketing Graphics', 'UI/UX Design'],
    glow: 'green',
  },
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Developing modern, responsive websites for businesses.',
    items: ['Business Websites', 'Corporate Websites', 'Landing Pages', 'E-commerce Websites'],
    glow: 'lime',
  },
  {
    icon: Video,
    title: 'Video & Multimedia',
    description: 'Producing professional visual content for branding and marketing.',
    items: ['Product Shoots', 'Video Editing', 'Promotional Videos', 'Social Media Reels'],
    glow: 'blue',
  },
];

const industries = [
  { icon: Building2, name: 'Real Estate' },
  { icon: GraduationCap, name: 'Education & Training' },
  { icon: Rocket, name: 'Startups & SMBs' },
  { icon: ShoppingCart, name: 'E-commerce Brands' },
  { icon: Film, name: 'Entertainment & Media' },
  { icon: Store, name: 'Local Businesses' },
];

const whyChooseUs = [
  { icon: Users, title: 'Experienced Team', description: 'Creative and technical team with years of expertise' },
  { icon: Target, title: 'End-to-end Solutions', description: 'Complete digital solutions under one roof' },
  { icon: Zap, title: 'Customized Strategies', description: "Tailored strategies for each client's needs" },
  { icon: Award, title: 'Focus on Growth', description: 'Committed to brand growth and performance' },
  { icon: CheckCircle2, title: 'Professional Service', description: 'Reliable and professional service delivery' },
];

const processSteps = [
  { icon: Lightbulb, title: 'Understanding Requirements', description: 'We listen to your goals and understand your business needs' },
  { icon: FileText, title: 'Strategy & Planning', description: 'Creating a tailored roadmap for your digital success' },
  { icon: PenTool, title: 'Creative Development', description: 'Bringing ideas to life with creative excellence' },
  { icon: Rocket, title: 'Execution & Delivery', description: 'Implementing solutions and delivering results' },
];

const stats = [
  { value: '100+', label: 'Happy Clients', icon: Users, color: 'text-prodyum-blue-400' },
  { value: '50+', label: 'Projects Delivered', icon: Award, color: 'text-prodyum-green-400' },
  { value: '5+', label: 'Years Experience', icon: Target, color: 'text-prodyum-lime-400' },
  { value: '24/7', label: 'Support Available', icon: Zap, color: 'text-prodyum-blue-400' },
];

/* ----------------------- 3D Hero Stage ----------------------- */
const HeroStage = () => {
  const reduceMotion = useReducedMotion();
  const orbitIcons = [
    { Icon: Megaphone, style: { top: '-6%', left: '50%' }, color: 'from-prodyum-blue-500 to-prodyum-blue-400', delay: 0 },
    { Icon: Palette, style: { top: '40%', right: '-10%' }, color: 'from-prodyum-green-500 to-prodyum-green-400', delay: 0.6 },
    { Icon: Globe, style: { bottom: '-6%', left: '52%' }, color: 'from-prodyum-lime-500 to-prodyum-lime-400', delay: 1.2 },
    { Icon: Video, style: { top: '42%', left: '-12%' }, color: 'from-prodyum-blue-500 to-prodyum-green-500', delay: 1.8 },
  ];

  return (
    <div className="relative mx-auto h-[360px] w-full max-w-md sm:h-[460px] lg:h-[520px]">
      {/* light beams */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-60">
        <div className="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gradient-to-r from-transparent via-prodyum-blue-500/40 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-gradient-to-r from-transparent via-prodyum-green-500/40 to-transparent" />
      </div>

      {/* rotating rings */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <div className="h-72 w-72 rounded-full border border-white/10 sm:h-80 sm:w-80" />
      </motion.div>
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
      >
        <div className="h-96 w-96 rounded-full border border-dashed border-white/5 sm:h-[26rem] sm:w-[26rem]" />
      </motion.div>

      {/* pedestal */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="h-2 w-44 rounded-full bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500 opacity-70 blur-[2px]" />
        <div className="mx-auto mt-2 h-10 w-32 rounded-[50%] border border-white/10 bg-white/[0.03] backdrop-blur-sm" />
      </div>

      {/* central glass cube / logo */}
      <motion.div
        className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2"
        animate={reduceMotion ? undefined : { y: [0, -16, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-prodyum-blue-500/30 blur-3xl" />
          <TiltCard intensity={18} className="relative">
            <div className="preserve-3d flex h-32 w-32 items-center justify-center rounded-3xl glass-panel-strong gradient-border shadow-2xl sm:h-36 sm:w-36">
              <div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-prodyum-blue-500/20 via-transparent to-prodyum-green-500/20"
                style={{ transform: 'translateZ(20px)' }}
              />
              <Monitor className="h-14 w-14 text-white" style={{ transform: 'translateZ(40px)' }} />
            </div>
          </TiltCard>
        </div>
      </motion.div>

      {/* floating holographic service icons */}
      {orbitIcons.map(({ Icon, style, color, delay }, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={style}
          animate={reduceMotion ? undefined : { y: [0, -14, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay }}
        >
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-xl backdrop-blur-md sm:h-16 sm:w-16`}>
            <div className="flex h-full w-full items-center justify-center rounded-2xl border border-white/20 bg-black/20">
              <Icon className="h-6 w-6 text-white sm:h-7 sm:w-7" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const ITHome = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const reduceMotion = useReducedMotion();

  return (
    <ITLayout>
      {/* ================= HERO ================= */}
      <section ref={heroRef} className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16">
        {/* parallax content */}
        <motion.div
          style={reduceMotion ? undefined : { y: heroY, opacity: heroOpacity }}
          className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8"
        >
          {/* left: copy */}
          <div className="text-center lg:text-left">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 text-xs font-medium text-gray-300 backdrop-blur-sm">
                <Zap className="h-4 w-4 text-prodyum-green-400" />
                Digital Solutions Partner
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-[3.4rem] xl:text-6xl">
                Helping Businesses Grow Through
                <span className="mt-2 block text-gradient-animated">
                  Digital Marketing &amp; Technology
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-300 lg:mx-0">
                ProDyum IT Pvt Ltd delivers professional Digital Marketing, Branding, Web Development,
                and Multimedia Solutions that help businesses build a strong digital presence and grow online.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.24}>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <MagneticButton strength={14}>
                  <Button
                    asChild
                    size="lg"
                    className="group bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 px-8 py-6 text-base font-bold text-white shadow-xl shadow-prodyum-blue-500/25 transition-all duration-300 hover:shadow-prodyum-blue-500/50"
                  >
                    <Link to="/it/services" className="flex items-center gap-2">
                      Our Services <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </MagneticButton>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/25 px-8 py-6 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                >
                  <Link to="/it/contact">Contact Us</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>

          {/* right: 3D stage */}
          <ScrollReveal delay={0.2} className="hidden lg:block">
            <HeroStage />
          </ScrollReveal>
        </motion.div>

        {/* scroll indicator */}
        <motion.a
          href="#about"
          className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 md:block"
          animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          aria-label="Scroll to content"
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/25 p-1.5">
            <div className="h-2 w-1 rounded-full bg-prodyum-green-400" />
          </div>
        </motion.a>
      </section>

      {/* ================= ABOUT + STATS ================= */}
      <section id="about" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            <div>
              <ScrollReveal>
                <span className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 text-xs font-medium text-prodyum-blue-400">
                  <Building2 className="h-4 w-4" /> About Us
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.05}>
                <h2 className="mt-6 font-display text-4xl font-bold leading-tight text-white md:text-5xl">
                  About <span className="text-gradient-animated">ProDyum IT</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className="mt-6 space-y-5 text-lg leading-relaxed text-gray-300">
                  <p>
                    ProDyum IT Pvt Ltd is a Hyderabad-based digital solutions company focused on helping
                    businesses grow through technology, creativity, and strategic digital marketing.
                  </p>
                  <p>
                    We specialize in building strong digital presence for brands through modern marketing
                    strategies, creative design, and web technologies.
                  </p>
                  <p>
                    Our team works closely with clients to understand their goals and deliver customized
                    digital solutions that drive real business results.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <Button
                  asChild
                  className="mt-8 bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 px-6 font-bold text-white hover:from-prodyum-blue-600 hover:to-prodyum-green-600"
                >
                  <Link to="/it/about" className="flex items-center gap-2">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </ScrollReveal>
            </div>

            {/* animated stat grid */}
            <div className="grid grid-cols-2 gap-5">
              {stats.map((s, i) => (
                <ScrollReveal key={s.label} delay={i * 0.08} className={i % 2 === 1 ? 'mt-0 md:mt-10' : ''}>
                  <GlassCard tilt glow={i % 2 ? 'green' : 'blue'} className="p-6" reveal={false}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20">
                      <s.icon className={`h-6 w-6 ${s.color}`} />
                    </div>
                    <div className="mt-5 font-display text-4xl font-bold text-white md:text-5xl">
                      <AnimatedCounter value={s.value} />
                    </div>
                    <p className="mt-1 text-sm text-gray-400">{s.label}</p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Offer"
            icon={Megaphone}
            title={<>Our <span className="text-gradient-animated">Services</span></>}
            subtitle="Comprehensive digital solutions tailored to your business needs"
          />

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {services.map((service, i) => (
              <GlassCard key={service.title} tilt glow={service.glow} delay={i * 0.08} className="p-8">
                <div className="flex items-start gap-5">
                  <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 transition-transform duration-300 group-hover:scale-110">
                    <service.icon className="h-8 w-8 text-prodyum-blue-400 transition-transform duration-500 group-hover:rotate-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-bold text-white">{service.title}</h3>
                    <p className="mt-2 text-gray-400">{service.description}</p>
                    <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {service.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-gray-500">
                          <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-prodyum-green-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          <ScrollReveal className="mt-12 text-center">
            <Button
              asChild
              variant="outline"
              className="border-prodyum-blue-500/50 px-8 font-bold text-prodyum-blue-400 hover:bg-prodyum-blue-500/10"
            >
              <Link to="/it/services" className="flex items-center gap-2">
                View All Services <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= PROCESS TIMELINE ================= */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How We Work"
            icon={Rocket}
            title={<>Our <span className="text-gradient-animated">Process</span></>}
            subtitle="A proven path from first conversation to measurable results"
          />

          <div className="relative mt-20">
            {/* connecting glowing path */}
            <div className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />
            <motion.div
              className="absolute left-0 top-9 hidden h-px bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500 lg:block"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
            />

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, i) => (
                <ScrollReveal key={step.title} delay={i * 0.12} className="relative">
                  <div className="flex flex-col items-center text-center">
                    {/* node */}
                    <div className="relative mb-6">
                      <motion.div
                        className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl bg-gradient-to-br from-prodyum-blue-500 to-prodyum-green-500 p-[1.5px] shadow-lg shadow-prodyum-blue-500/30"
                        whileHover={{ scale: 1.08, rotate: 3 }}
                      >
                        <div className="flex h-full w-full items-center justify-center rounded-2xl bg-ink/80 backdrop-blur-sm">
                          <step.icon className="h-7 w-7 text-prodyum-green-400" />
                        </div>
                      </motion.div>
                      <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-ink text-xs font-bold text-prodyum-lime-400">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-400">{step.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= INDUSTRIES ================= */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Industries We Serve"
            icon={Building2}
            title={<>We Work Across <span className="text-gradient-animated">Multiple Industries</span></>}
            subtitle="ProDyum IT provides digital solutions to businesses across multiple industries"
          />

          <div className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
            {industries.map((industry, i) => (
              <GlassCard key={industry.name} tilt glow="green" delay={i * 0.06} className="p-6 text-center" reveal>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 transition-transform duration-300 group-hover:scale-110">
                  <industry.icon className="h-7 w-7 text-prodyum-green-400" />
                </div>
                <h3 className="mt-4 text-sm font-medium text-white">{industry.name}</h3>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US + PROCESS CARD ================= */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Why Choose Us"
                icon={Award}
                title={<>Why Partner With <span className="text-gradient-animated">ProDyum IT</span>?</>}
                subtitle="We combine creativity, strategy, and technology to deliver solutions that help brands grow and succeed in the digital world."
              />
              <div className="mt-10 space-y-6">
                {whyChooseUs.map((item, i) => (
                  <ScrollReveal key={item.title} delay={i * 0.06}>
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20">
                        <item.icon className="h-6 w-6 text-prodyum-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* process visualization card */}
            <ScrollReveal delay={0.1}>
              <TiltCard intensity={6} className="h-full">
                <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-prodyum-blue-500 to-prodyum-green-500 p-8 text-white shadow-2xl shadow-prodyum-blue-500/25">
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  <div className="relative">
                    <h3 className="font-display text-2xl font-bold">Our Process</h3>
                    <div className="mt-8 space-y-7">
                      {processSteps.map((step, index) => (
                        <div key={step.title} className="flex items-start gap-4">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-lg font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold">{step.title}</h4>
                            <p className="text-sm text-white/80">{step.description}</p>
                          </div>
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

      {/* ================= CTA ================= */}
      <section className="relative py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-prodyum-blue-600 to-prodyum-green-600 p-12 text-center lg:p-20">
              <div className="absolute inset-0 bg-dots opacity-20" />
              <div className="relative z-10">
                <Sparkles className="mx-auto mb-4 h-8 w-8 text-white/80" />
                <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
                  Ready to Grow Your Business Online?
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">
                  Let&apos;s discuss how our digital solutions can help you achieve your business goals.
                  Contact us today for a free consultation.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <MagneticButton strength={14}>
                    <Button
                      asChild
                      size="lg"
                      className="bg-white px-8 py-6 text-lg font-bold text-prodyum-blue-600 shadow-xl hover:bg-gray-100"
                    >
                      <Link to="/it/contact" className="flex items-center gap-2">
                        Contact Us <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>
                  </MagneticButton>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-2 border-white px-8 py-6 text-lg font-bold text-white hover:bg-white/10"
                  >
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

export default ITHome;
