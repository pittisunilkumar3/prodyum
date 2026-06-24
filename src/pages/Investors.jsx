import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { CheckCircle2, TrendingUp, Shield, Clock, Users, ArrowRight, BarChart3 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import EnhancedForm from '../components/EnhancedForm';
import ScrollReveal from '../components/animation/ScrollReveal';
import AnimatedCounter from '../components/animation/AnimatedCounter';

const Investors = () => {
  const { toast } = useToast();

  const handleSubmit = async (formData) => {
    try {
      // Send form data to backend API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'investor',
          formData: formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Interest Submitted Successfully!',
          description: "We'll contact you within 2 business days.",
        });
      } else {
        throw new Error(result.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your interest. Please try again or contact us directly.',
        variant: 'destructive',
      });
    }
  };

  const benefits = [
    { icon: Shield, title: 'Transparent Budgeting', description: 'Clear financial planning with detailed breakdowns and milestone-based tracking for complete visibility.' },
    { icon: Clock, title: 'Milestone Tracking', description: 'Weekly updates and regular progress reports to keep you informed at every stage of production.' },
    { icon: TrendingUp, title: 'Diverse Slate', description: 'Invest across films, web series, and short content to diversify your entertainment portfolio.' },
    { icon: Users, title: 'Experienced Team', description: 'Work with seasoned professionals who understand both creative and commercial aspects of filmmaking.' },
  ];

  const processSteps = [
    { step: '01', title: 'Project Approval', desc: 'Review and select projects from our slate' },
    { step: '02', title: 'Funding Milestones', desc: 'Agree on payment schedule and terms' },
    { step: '03', title: 'Production', desc: 'Weekly updates during filming and post' },
    { step: '04', title: 'Delivery & QC', desc: 'Quality control and final delivery' },
    { step: '05', title: 'Revenue Share', desc: 'Returns after recoupment as agreed' },
  ];

  const stats = [
    { value: '15+', label: 'Projects Completed' },
    { value: '5+', label: 'Years Experience' },
    { value: '25+', label: 'Team Members' },
    { value: '8+', label: 'Awards Won' },
  ];

  return (
    <div className="relative min-h-screen pt-32 pb-24">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <ScrollReveal className="mb-20 text-center">
          <span className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 bg-clip-text text-sm font-semibold uppercase tracking-wider text-transparent">Investment Opportunities</span>
          <h1 className="mt-4 font-display text-5xl font-bold text-gradient-animated sm:text-6xl lg:text-7xl">Investor Information</h1>
          <div className="mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500" />
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-gray-300">
            Invest in premium Telugu originals with a transparent, milestone-driven model
          </p>
        </ScrollReveal>

        {/* CINEMATIC STATS */}
        <ScrollReveal className="mb-24">
          <Card className="overflow-hidden rounded-3xl glass-panel-strong gradient-border p-10">
            <div className="absolute inset-0 bg-gradient-to-br from-prodyum-blue-500/10 via-transparent to-prodyum-lime-500/10" />
            <div className="relative grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 16 }}
                  className="text-center"
                >
                  <div className="font-display text-5xl font-bold text-gradient-animated md:text-6xl">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="mt-2 text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </Card>
        </ScrollReveal>

        {/* WHY PARTNER */}
        <section className="mb-24">
          <ScrollReveal className="mb-12 text-center">
            <h2 className="font-display text-4xl font-bold text-gradient-animated">Why Partner With ProDyum?</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1, duration: 0.7 }}
                whileHover={{ y: -8 }}
                data-cursor-label="Learn More"
              >
                <Card className="group h-full rounded-3xl glass-panel gradient-border transition-all duration-500 hover:border-prodyum-green-500/50 hover:shadow-xl hover:shadow-prodyum-green-500/10">
                  <div className="p-8">
                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-prodyum-blue-500/30 bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 transition-all duration-300 group-hover:scale-110 group-hover:border-prodyum-green-500/50">
                      <benefit.icon className="h-8 w-8 text-prodyum-green-400" />
                    </div>
                    <h3 className="mb-3 font-display text-xl font-bold text-white transition-colors duration-300 group-hover:text-prodyum-green-500">{benefit.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-300">{benefit.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PRODUCTION PIPELINE VISUALIZATION */}
        <section className="mb-24">
          <ScrollReveal className="mb-12 text-center">
            <h2 className="font-display text-4xl font-bold text-gradient-animated">Investment Process</h2>
            <p className="mx-auto mt-4 flex max-w-xl items-center justify-center gap-2 text-gray-400">
              <BarChart3 className="h-5 w-5 text-prodyum-green-400" /> A transparent pipeline from approval to returns
            </p>
          </ScrollReveal>

          <div className="mx-auto max-w-6xl">
            <div className="relative">
              {/* connecting line */}
              <div className="absolute left-0 right-0 top-9 hidden h-px bg-white/10 lg:block" />
              <motion.div
                className="absolute left-0 top-9 hidden h-px bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500 lg:block"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
              />
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {processSteps.map((item, idx) => (
                  <ScrollReveal key={item.step} delay={idx * 0.12} className="relative">
                    <div className="flex flex-col items-center text-center">
                      <motion.div
                        className="relative mb-6 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl bg-gradient-to-br from-prodyum-blue-500 to-prodyum-green-500 p-[1.5px] shadow-lg shadow-prodyum-blue-500/30"
                        whileHover={{ scale: 1.08, rotate: 3 }}
                      >
                        <div className="flex h-full w-full items-center justify-center rounded-2xl bg-black/80 backdrop-blur-sm">
                          <span className="font-display text-xl font-bold text-prodyum-lime-400">{item.step}</span>
                        </div>
                      </motion.div>
                      <h3 className="font-display text-base font-bold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-400">{item.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FORM */}
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <Card className="overflow-hidden rounded-3xl glass-panel-strong gradient-border backdrop-blur-xl transition-all duration-500 hover:border-prodyum-green-500/50">
              <div className="p-8 sm:p-12">
                <div className="mb-10 text-center">
                  <h2 className="font-display text-3xl font-bold text-gradient-animated sm:text-4xl">Express Your Interest</h2>
                  <p className="mt-3 text-lg text-gray-300">Fill out the form below and we&apos;ll get back to you within 2 business days</p>
                </div>
                <EnhancedForm type="investor" onSubmit={handleSubmit} />

                <div className="mt-10 border-t border-prodyum-blue-500/20 pt-10">
                  <p className="mb-4 text-center text-sm text-gray-300">Or reach out directly:</p>
                  <div className="flex flex-col items-center justify-center gap-4 text-sm sm:flex-row">
                    <a href="mailto:entertainment@prodyum.in" className="font-medium text-prodyum-green-400 transition-colors hover:text-prodyum-lime-400">
                      entertainment@prodyum.in
                    </a>
                    <span className="hidden text-gray-600 sm:inline">•</span>
                    <a href="tel:+919550989977" className="font-medium text-prodyum-green-400 transition-colors hover:text-prodyum-lime-400">
                      +91-9550989977
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Investors;
