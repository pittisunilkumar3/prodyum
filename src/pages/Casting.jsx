import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Users, Film, Camera, Mic, Palette, Star, Sparkles } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import EnhancedForm from '../components/EnhancedForm';
import ScrollReveal from '../components/animation/ScrollReveal';
import LensFlare from '../components/entertainment/LensFlare';

const Casting = () => {
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
          formType: 'casting',
          formData: formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Application Submitted Successfully!',
          description: "We'll review your profile and contact shortlisted candidates.",
        });
      } else {
        throw new Error(result.message || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your application. Please try again or contact us directly.',
        variant: 'destructive',
      });
    }
  };

  const roles = [
    { icon: Star, title: 'Actors', description: 'Lead, supporting, and character roles', gradient: 'from-prodyum-blue-500/20 to-prodyum-green-500/20' },
    { icon: Camera, title: 'Directors of Photography', description: 'Cinematography and visual storytelling', gradient: 'from-prodyum-blue-500/20 to-prodyum-green-500/20' },
    { icon: Film, title: 'Editors', description: 'Post-production and assembly', gradient: 'from-prodyum-blue-500/20 to-prodyum-lime-500/20' },
    { icon: Palette, title: 'VFX Artists', description: 'Visual effects and compositing', gradient: 'from-prodyum-blue-500/20 to-prodyum-lime-500/20' },
    { icon: Mic, title: 'Sound Engineers', description: 'Sound design and mixing', gradient: 'from-prodyum-green-500/20 to-prodyum-lime-500/20' },
    { icon: Users, title: 'Crew Members', description: 'ADs, makeup, art department & more', gradient: 'from-prodyum-green-500/20 to-prodyum-lime-500/20' },
  ];

  const benefits = [
    { value: 'Creative Freedom', description: 'Express your artistic vision in a supportive environment' },
    { value: 'Top Equipment', description: 'Work with state-of-the-art production technology' },
    { value: 'Career Growth', description: 'Build your portfolio with acclaimed productions' },
  ];

  return (
    <div className="relative min-h-screen pt-32 pb-24">
      {/* spotlight backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] overflow-hidden">
        {/* stage spotlights converging */}
        <motion.div
          className="absolute left-1/2 top-[-20%] h-[80vh] w-[40vw] -translate-x-1/2 origin-top"
          style={{ background: 'linear-gradient(to bottom, rgba(139,195,74,0.18), transparent 70%)', filter: 'blur(40px)', clipPath: 'polygon(40% 0, 60% 0, 100% 100%, 0% 100%)' }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <LensFlare x="50%" y="0%" size={420} />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <ScrollReveal className="mb-20 text-center">
          <span className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 bg-clip-text text-sm font-semibold uppercase tracking-wider text-transparent">Join Our Team</span>
          <h1 className="mt-4 font-display text-5xl font-bold text-gradient-animated sm:text-6xl lg:text-7xl">Casting &amp; Crew</h1>
          <div className="mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500" />
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-gray-300">
            Join our team of talented professionals and be part of cinematic excellence
          </p>
        </ScrollReveal>

        {/* ROLES */}
        <section className="mb-24">
          <ScrollReveal className="mb-12 text-center">
            <h2 className="font-display text-4xl font-bold text-gradient-animated">Who Can Apply</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {roles.map((role, idx) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.08, duration: 0.6 }}
                whileHover={{ y: -8 }}
                data-cursor-label="Apply"
                className="group"
              >
                <Card className="relative h-full overflow-hidden rounded-3xl glass-panel gradient-border transition-all duration-500 hover:border-prodyum-green-500/60 hover:shadow-xl hover:shadow-prodyum-green-500/20">
                  <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                  <div className="relative z-10 p-8">
                    <div className="mb-4 flex items-start gap-4">
                      <div className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-prodyum-green-500/30 bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:border-prodyum-green-500/60">
                        <role.icon className="h-7 w-7 text-prodyum-green-400" />
                      </div>
                      <div>
                        <h3 className="mb-2 font-display text-xl font-bold text-white transition-colors duration-300 group-hover:text-prodyum-green-500">{role.title}</h3>
                        <p className="text-sm leading-relaxed text-gray-300">{role.description}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* BENEFITS */}
        <section className="mb-24">
          <ScrollReveal>
            <Card className="overflow-hidden rounded-3xl glass-panel-strong gradient-border p-12 transition-all duration-500 hover:border-prodyum-green-500/50">
              <div className="absolute inset-0 bg-gradient-to-br from-prodyum-blue-500/10 via-black to-prodyum-green-500/10" />
              <div className="relative">
                <h3 className="mb-8 text-center font-display text-3xl font-bold text-gradient-animated">Why Work With ProDyum?</h3>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {benefits.map((b, i) => (
                    <motion.div
                      key={b.value}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      className="text-center"
                    >
                      <div className="mb-2 flex items-center justify-center gap-2">
                        <Sparkles className="h-5 w-5 text-prodyum-lime-400" />
                        <div className="font-display text-2xl font-bold text-gradient-animated">{b.value}</div>
                      </div>
                      <p className="text-sm text-gray-300">{b.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </section>

        {/* FORM */}
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <Card className="overflow-hidden rounded-3xl glass-panel-strong gradient-border backdrop-blur-xl transition-all duration-500 hover:border-prodyum-green-500/50">
              <div className="p-8 sm:p-12">
                <div className="mb-10 text-center">
                  <h2 className="font-display text-3xl font-bold text-gradient-animated sm:text-4xl">Submit Your Application</h2>
                  <p className="mt-3 text-lg text-gray-300">Submissions are reviewed on a rolling basis. We will contact shortlisted candidates.</p>
                </div>
                <EnhancedForm type="casting" onSubmit={handleSubmit} />

                <div className="mt-10 border-t border-prodyum-blue-500/20 pt-10">
                  <p className="mb-4 text-center text-sm text-gray-300">Questions? Reach out to us:</p>
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

export default Casting;
