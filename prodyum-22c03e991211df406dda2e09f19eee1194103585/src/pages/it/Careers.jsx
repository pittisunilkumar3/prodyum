import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/button';
import {
  ArrowRight,
  Briefcase,
  MapPin,
  Clock,
  Users,
  Heart,
  Zap,
  GraduationCap,
  Building2,
  Send,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import ITLayout from '../../components/it/ITLayout';
import ScrollReveal from '../../components/animation/ScrollReveal';
import GlassCard from '../../components/animation/GlassCard';
import SectionHeading from '../../components/animation/SectionHeading';

const ITCareers = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  const benefits = [
    { icon: Zap, title: 'Growth Opportunities', description: 'Continuous learning and career advancement' },
    { icon: Heart, title: 'Work-Life Balance', description: 'Flexible working hours and remote options' },
    { icon: Users, title: 'Team Culture', description: 'Collaborative and supportive environment' },
    { icon: GraduationCap, title: 'Learning Budget', description: 'Access to courses and certifications' },
  ];

  const jobs = [
    {
      id: 1,
      title: 'Digital Marketing & UI/UX Trainee',
      department: 'Marketing & Design',
      location: 'Hyderabad',
      type: 'Full-time',
      experience: '0-1 years',
      description: 'We are looking for passionate individuals who want to build innovative digital solutions.',
      responsibilities: [
        'Assist in creating and managing digital marketing campaigns',
        'Support UI/UX design projects',
        'Learn and implement SEO best practices',
        'Contribute to social media management',
      ],
      requirements: [
        "Bachelor's degree in Marketing, Design, or related field",
        'Basic understanding of digital marketing concepts',
        'Interest in UI/UX design',
        'Good communication skills',
      ],
    },
    {
      id: 2,
      title: 'HR & Operations Executive',
      department: 'Human Resources',
      location: 'Hyderabad',
      type: 'Full-time',
      experience: '1-3 years',
      description: 'We are seeking an HR professional to manage our human resources operations.',
      responsibilities: [
        'Manage end-to-end recruitment process',
        'Handle employee onboarding and documentation',
        'Organize team events and activities',
        'Support day-to-day office operations',
      ],
      requirements: [
        "Bachelor's degree in HR or related field",
        '1-3 years of HR experience',
        'Strong interpersonal skills',
        'Proficiency in MS Office and HR software',
      ],
    },
    {
      id: 3,
      title: 'Senior Creative Specialist',
      department: 'Creative',
      location: 'Hyderabad',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'We are looking for a creative professional to lead our design projects.',
      responsibilities: [
        'Lead creative design projects from concept to delivery',
        'Create brand identities, logos, and marketing materials',
        'Develop UI/UX designs for websites and applications',
        'Mentor junior designers',
      ],
      requirements: [
        '3-5 years of experience in graphic design',
        'Proficiency in Adobe Creative Suite and Figma',
        'Strong portfolio showcasing branding and UI/UX work',
        'Excellent communication skills',
      ],
    },
  ];

  return (
    <ITLayout>
      {/* HERO */}
      <section className="relative overflow-hidden pb-16 pt-36 lg:pt-44">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 text-xs text-gray-300 backdrop-blur-sm">
                <Briefcase className="h-4 w-4 text-prodyum-green-400" /> Join Our Team
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h1 className="mt-6 font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                Work With <span className="text-gradient-animated">Us</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-5 text-xl leading-relaxed text-gray-300">
                Join ProDyum IT Pvt Ltd and be part of a growing team working in Digital Marketing,
                Technology, and Creative Media.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* WHY JOIN US */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Join Us"
            icon={Heart}
            title={<>Build Your Career <span className="text-gradient-animated">With Us</span></>}
            subtitle="We are always looking for passionate individuals who want to build innovative digital solutions and grow their careers."
          />
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <GlassCard key={b.title} tilt glow={i % 2 ? 'green' : 'blue'} delay={i * 0.08} className="p-8 text-center" reveal>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 transition-transform duration-300 group-hover:scale-110">
                  <b.icon className="h-8 w-8 text-prodyum-blue-400" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-white">{b.title}</h3>
                <p className="mt-2 text-gray-400">{b.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Current Opportunities"
            icon={Briefcase}
            title={<>Open <span className="text-gradient-animated">Positions</span></>}
            subtitle="Explore our current job openings and find the perfect role for you"
          />

          <div className="mx-auto mt-16 max-w-4xl space-y-6">
            {jobs.map((job, i) => {
              const open = selectedJob === job.id;
              return (
                <ScrollReveal key={job.id} delay={i * 0.08}>
                  <div className={`overflow-hidden rounded-3xl glass-panel gradient-border transition-all duration-500 ${open ? 'border-prodyum-green-500/50 shadow-[0_30px_80px_-40px_rgba(76,175,80,0.5)]' : ''}`}>
                    <button
                      type="button"
                      onClick={() => setSelectedJob(open ? null : job.id)}
                      className="flex w-full items-center justify-between gap-4 p-6 text-left"
                    >
                      <div>
                        <h3 className="font-display text-xl font-bold text-white">{job.title}</h3>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1"><Building2 className="h-4 w-4" /> {job.department}</span>
                          <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
                          <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {job.type}</span>
                        </div>
                      </div>
                      <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown className="h-6 w-6 text-prodyum-green-400" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-white/10 p-6">
                            <p className="text-gray-300">{job.description}</p>
                            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
                              <div>
                                <h4 className="mb-4 font-bold text-white">Responsibilities</h4>
                                <ul className="space-y-3">
                                  {job.responsibilities.map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-prodyum-green-500" />
                                      <span className="text-gray-400">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="mb-4 font-bold text-white">Requirements</h4>
                                <ul className="space-y-3">
                                  {job.requirements.map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-prodyum-blue-500" />
                                      <span className="text-gray-400">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
                              <p className="text-gray-400">
                                <span className="font-medium text-white">Experience:</span> {job.experience}
                              </p>
                              <Button
                                asChild
                                className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 text-white hover:from-prodyum-blue-600 hover:to-prodyum-green-600"
                              >
                                <a href={`mailto:hr@prodyum.in?subject=Application for ${job.title}`} className="flex items-center gap-2">
                                  Apply Now <Send className="h-4 w-4" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW TO APPLY */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl glass-panel-strong gradient-border p-8 text-center md:p-12">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-prodyum-blue-500/20 blur-3xl" />
              <motion.div
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Send className="h-8 w-8 text-prodyum-blue-400" />
              </motion.div>
              <h2 className="font-display text-3xl font-bold text-white">How to Apply</h2>
              <p className="mt-3 text-lg text-gray-400">Send your resume to start your journey with us</p>

              <div className="mt-6 inline-block rounded-2xl bg-white/5 p-6">
                <p className="mb-3 text-gray-400">Email your resume to:</p>
                <a
                  href="mailto:hr@prodyum.in"
                  className="font-display text-2xl font-bold text-gradient-animated"
                >
                  hr@prodyum.in
                </a>
                <p className="mt-3 text-sm text-gray-500">
                  Please include the position title in your email subject line
                </p>
              </div>

              <div className="mt-8 border-t border-white/10 pt-8">
                <h3 className="mb-4 font-bold text-white">What to include in your application:</h3>
                <div className="mx-auto grid max-w-xl grid-cols-1 gap-4 md:grid-cols-2">
                  {['Updated Resume/CV', 'Portfolio (if applicable)', 'Cover Letter (optional)', 'LinkedIn Profile'].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-left">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-prodyum-green-500" />
                      <span className="text-gray-400">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-prodyum-blue-600 to-prodyum-green-600 p-12 text-center lg:p-16">
              <div className="absolute inset-0 bg-dots opacity-20" />
              <div className="relative z-10">
                <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                  Don&apos;t See the Right Role?
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                  We&apos;re always looking for talented individuals. Send us your resume!
                </p>
                <div className="mt-8 flex justify-center">
                  <Button asChild size="lg" className="bg-white px-8 font-bold text-prodyum-blue-600 hover:bg-gray-100">
                    <a href="mailto:hr@prodyum.in" className="flex items-center gap-2">
                      Send Your Resume <ArrowRight className="h-5 w-5" />
                    </a>
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

export default ITCareers;
