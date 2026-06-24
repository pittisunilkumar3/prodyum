import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/button';
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  MessageSquare,
  Clock,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  AlertCircle,
  ChevronDown,
} from 'lucide-react';
import ITLayout from '../../components/it/ITLayout';
import ScrollReveal from '../../components/animation/ScrollReveal';
import GlassCard from '../../components/animation/GlassCard';
import SectionHeading from '../../components/animation/SectionHeading';

const ITContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // ============================================
      // SETUP REQUIRED: Get your free Formspree ID
      // 1. Go to https://formspree.io/
      // 2. Sign up and create a new form
      // 3. Replace 'YOUR_FORMSPREE_ID' below with your form ID
      // ============================================
      const FORMSPREE_ID = 'YOUR_FORMSPREE_ID'; // <-- Replace this!

      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          _subject: `New Contact Form Submission from ${formData.name} - ProDyum IT`,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (err) {
      // Fallback: Open email client with form data
      const mailtoLink = `mailto:hr@prodyum.in?subject=Contact Form Submission from ${encodeURIComponent(formData.name)} - ProDyum IT&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoLink;
      setError('Opening your email client. Please send the email to complete your message.');
    }

    setIsSubmitting(false);
  };

  const contactInfo = [
    { icon: MapPin, title: 'Our Location', details: ['Hyderabad, Telangana, India'], action: null },
    { icon: Mail, title: 'Email Us', details: ['hr@prodyum.in'], action: 'mailto:hr@prodyum.in' },
    { icon: Clock, title: 'Working Hours', details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 2:00 PM'], action: null },
  ];

  const services = ['Digital Marketing', 'Branding & Design', 'Web Development', 'Video Production', 'Other'];

  const socials = [
    { icon: Linkedin, href: 'https://linkedin.com', color: 'hover:bg-blue-600' },
    { icon: Twitter, href: 'https://twitter.com', color: 'hover:bg-sky-500' },
    { icon: Instagram, href: 'https://instagram.com', color: 'hover:bg-pink-600' },
    { icon: Facebook, href: 'https://facebook.com', color: 'hover:bg-blue-700' },
  ];

  const faqs = [
    {
      question: 'How long does it take to complete a website?',
      answer: 'The timeline varies depending on the complexity. A simple business website typically takes 2-4 weeks, while more complex solutions may take 6-8 weeks.',
    },
    {
      question: 'Do you offer ongoing support and maintenance?',
      answer: 'Yes, we offer comprehensive support and maintenance packages to keep your website and digital presence running smoothly.',
    },
    {
      question: 'What is your pricing structure?',
      answer: 'Our pricing is customized based on your specific requirements. Contact us for a free consultation and quote.',
    },
    {
      question: 'How do I get started with your services?',
      answer: "Simply fill out the contact form above or email us at hr@prodyum.in. We'll schedule a consultation to understand your needs.",
    },
  ];

  const fieldClasses = (name) =>
    `peer w-full rounded-xl border bg-black/40 px-4 py-3 text-white transition-all duration-300 outline-none placeholder-gray-500 focus:ring-2 focus:ring-prodyum-blue-500/30 ${
      focused === name ? 'border-prodyum-blue-500 shadow-[0_0_0_3px_rgba(30,136,229,0.12)]' : 'border-white/10 hover:border-white/20'
    }`;

  return (
    <ITLayout>
      {/* HERO */}
      <section className="relative overflow-hidden pb-12 pt-36 lg:pt-44">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 text-xs text-gray-300 backdrop-blur-sm">
                <MessageSquare className="h-4 w-4 text-prodyum-green-400" /> Get In Touch
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h1 className="mt-6 font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                Contact <span className="text-gradient-animated">Us</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-5 text-xl leading-relaxed text-gray-300">
                Have a project in mind? Let&apos;s discuss how we can help you achieve your digital goals.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* INFO */}
            <div className="space-y-6">
              <ScrollReveal>
                <h2 className="font-display text-2xl font-bold text-white">Get in Touch</h2>
                <p className="mt-3 leading-relaxed text-gray-400">
                  We&apos;d love to hear from you. Fill out the form and our team will get back to you within 24 hours.
                </p>
              </ScrollReveal>

              <div className="space-y-4">
                {contactInfo.map((item, i) => (
                  <ScrollReveal key={item.title} delay={i * 0.07}>
                    <GlassCard glow={i === 1 ? 'green' : null} reveal={false} className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20">
                          <item.icon className="h-6 w-6 text-prodyum-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{item.title}</h3>
                          {item.details.map((detail) =>
                            item.action ? (
                              <a key={detail} href={item.action} className="block text-gray-400 transition-colors hover:text-prodyum-blue-400">
                                {detail}
                              </a>
                            ) : (
                              <p key={detail} className="text-gray-400">{detail}</p>
                            )
                          )}
                        </div>
                      </div>
                    </GlassCard>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={0.1}>
                <div className="rounded-3xl glass-panel p-6">
                  <h3 className="mb-4 font-bold text-white">Follow Us</h3>
                  <div className="flex items-center gap-4">
                    {socials.map((s, i) => (
                      <a
                        key={i}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:text-white ${s.color}`}
                      >
                        <s.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* FORM */}
            <div className="lg:col-span-2">
              <ScrollReveal delay={0.1}>
                <div className="relative overflow-hidden rounded-3xl glass-panel-strong gradient-border p-8 md:p-10">
                  <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-prodyum-blue-500/20 blur-3xl" />
                  <h2 className="font-display text-2xl font-bold text-white">Send Us a Message</h2>

                  <AnimatePresence>
                    {isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6"
                      >
                        <div className="flex items-start gap-4 rounded-2xl border border-prodyum-green-500/20 bg-prodyum-green-500/10 p-6">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-prodyum-green-500"
                          >
                            <CheckCircle2 className="h-5 w-5 text-white" />
                          </motion.div>
                          <div>
                            <h3 className="font-bold text-prodyum-green-400">Message Sent Successfully!</h3>
                            <p className="text-gray-400">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6"
                      >
                        <div className="flex items-start gap-4 rounded-2xl border border-prodyum-blue-500/20 bg-prodyum-blue-500/10 p-6">
                          <AlertCircle className="h-6 w-6 flex-shrink-0 text-prodyum-blue-400" />
                          <div>
                            <h3 className="font-bold text-prodyum-blue-400">Email Client Opened</h3>
                            <p className="text-gray-400">{error}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
                          Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocused('name')}
                          onBlur={() => setFocused(null)}
                          required
                          placeholder="John Doe"
                          className={fieldClasses('name')}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                          Email Address <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocused('email')}
                          onBlur={() => setFocused(null)}
                          required
                          placeholder="john@example.com"
                          className={fieldClasses('email')}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-300">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => setFocused('phone')}
                          onBlur={() => setFocused(null)}
                          placeholder="+91 98765 43210"
                          className={fieldClasses('phone')}
                        />
                      </div>
                      <div>
                        <label htmlFor="service" className="mb-2 block text-sm font-medium text-gray-300">
                          Service Interested In
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          onFocus={() => setFocused('service')}
                          onBlur={() => setFocused(null)}
                          className={fieldClasses('service')}
                        >
                          <option value="">Select a service</option>
                          {services.map((service) => (
                            <option key={service} value={service}>{service}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-300">
                        Message <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused(null)}
                        required
                        rows={5}
                        placeholder="Tell us about your project..."
                        className={`${fieldClasses('message')} resize-none`}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 py-6 text-lg font-bold text-white transition-all duration-300 hover:from-prodyum-blue-600 hover:to-prodyum-green-600 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      )}
                    </Button>
                  </form>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex h-80 items-center justify-center overflow-hidden rounded-3xl glass-panel gradient-border">
              <div className="text-center">
                <motion.div
                  className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-prodyum-blue-500/30" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-prodyum-blue-500 to-prodyum-green-500">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                </motion.div>
                <h3 className="font-display text-xl font-semibold text-gray-300">Hyderabad, Telangana, India</h3>
                <p className="text-gray-500">Interactive map coming soon</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title={<>Frequently Asked <span className="text-gradient-animated">Questions</span></>}
            subtitle="Quick answers to common questions"
          />
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {faqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <ScrollReveal key={faq.question} delay={i * 0.05}>
                  <div className={`overflow-hidden rounded-2xl glass-panel gradient-border transition-colors ${open ? 'border-prodyum-green-500/40' : ''}`}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="flex w-full items-center justify-between gap-4 p-6 text-left"
                    >
                      <h3 className="font-display text-lg font-bold text-white">{faq.question}</h3>
                      <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown className="h-5 w-5 flex-shrink-0 text-prodyum-green-400" />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-6 text-gray-400">{faq.answer}</p>
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
    </ITLayout>
  );
};

export default ITContact;
