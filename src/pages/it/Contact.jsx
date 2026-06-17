import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { 
  ArrowRight, 
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
  AlertCircle
} from 'lucide-react';
import TiltCard from '../../components/TiltCard';
import ScrollReveal from '../../components/ScrollReveal';
import { AnimatedShinyText, SparklesCore, BackgroundBeams, MorphingBlob, StaggeredList, MagneticButton, RippleHover } from '../../components/animations';
import Spotlight from '../../components/animations/Spotlight';
import DotPattern from '../../components/animations/DotPattern';

const ITContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          _subject: `New Contact Form Submission from ${formData.name} - ProDyum IT`
        })
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
    {
      icon: MapPin,
      title: 'Our Location',
      details: ['Hyderabad, Telangana, India'],
      action: null
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['hr@prodyum.in'],
      action: 'mailto:hr@prodyum.in'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 2:00 PM'],
      action: null
    }
  ];

  const services = [
    'Digital Marketing',
    'Branding & Design',
    'Web Development',
    'Video Production',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-black">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        <SparklesCore particleCount={30} particleColor="#1E88E5" className="absolute inset-0 w-full h-full" background="transparent" />
        <MorphingBlob color="rgba(76,175,80,0.05)" size={300} speed={7} className="absolute -bottom-10 -right-10" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal animation="zoomIn">
              <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
                <MessageSquare className="h-4 w-4 text-prodyum-green-400" />
                <AnimatedShinyText className="text-gray-300 text-sm">Get In Touch</AnimatedShinyText>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={100}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                Contact <span className="bg-gradient-to-r from-prodyum-blue-400 to-prodyum-green-400 bg-clip-text text-transparent">Us</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={200}>
              <p className="text-xl text-gray-300 leading-relaxed">
                Have a project in mind? Let's discuss how we can help you achieve your digital goals.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  We'd love to hear from you. Fill out the form and our team will get back to you within 24 hours.
                </p>
              </div>

              {/* Contact Cards */}
              <StaggeredList className="space-y-6" staggerDelay={150} animation="fadeLeft">
                {contactInfo.map((item, index) => (
                    <TiltCard key={index} tiltOptions={{ maxTilt: 5, scale: 1.01 }} className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 hover:border-prodyum-blue-500/50 transition-all duration-300">
                      <div className="flex items-start gap-4">
                      <div className="h-12 w-12 bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-6 w-6 text-prodyum-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-2">{item.title}</h3>
                        {item.details.map((detail, i) => (
                          item.action ? (
                            <a
                              key={i}
                              href={item.action}
                              className="text-gray-400 hover:text-prodyum-blue-400 transition-colors block"
                            >
                              {detail}
                            </a>
                          ) : (
                            <p key={i} className="text-gray-400">{detail}</p>
                          )
                        ))}
                      </div>
                    </div>
                    </TiltCard>
                ))}
              </StaggeredList>

              {/* Social Links */}
              <div className="pt-8 border-t border-white/10">
                <h3 className="font-bold text-white mb-4">Follow Us</h3>
                <div className="flex items-center gap-4">
                  {[
                    { icon: Linkedin, href: 'https://linkedin.com', color: 'hover:bg-blue-600' },
                    { icon: Twitter, href: 'https://twitter.com', color: 'hover:bg-sky-500' },
                    { icon: Instagram, href: 'https://instagram.com', color: 'hover:bg-pink-600' },
                    { icon: Facebook, href: 'https://facebook.com', color: 'hover:bg-blue-700' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`h-12 w-12 bg-white/5 rounded-xl flex items-center justify-center text-gray-400 hover:text-white ${social.color} transition-all duration-300 border border-white/10`}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <RippleHover className="bg-gray-900/50 border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden" rippleColor="rgba(30,136,229,0.1)">
                <Spotlight className="absolute inset-0" fill="rgba(30,136,229,0.03)" />
                <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
                
                {isSubmitted && (
                  <div className="mb-8 p-6 bg-prodyum-green-500/10 border border-prodyum-green-500/20 rounded-2xl flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-prodyum-green-500 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-prodyum-green-400 mb-1">Message Sent Successfully!</h3>
                      <p className="text-gray-400">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mb-8 p-6 bg-prodyum-blue-500/10 border border-prodyum-blue-500/20 rounded-2xl flex items-start gap-4">
                    <AlertCircle className="h-6 w-6 text-prodyum-blue-400 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-prodyum-blue-400 mb-1">Email Client Opened</h3>
                      <p className="text-gray-400">{error}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-prodyum-blue-500 focus:ring-2 focus:ring-prodyum-blue-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-prodyum-blue-500 focus:ring-2 focus:ring-prodyum-blue-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-prodyum-blue-500 focus:ring-2 focus:ring-prodyum-blue-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-prodyum-blue-500 focus:ring-2 focus:ring-prodyum-blue-500/20 transition-all"
                      >
                        <option value="">Select a service</option>
                        {services.map((service, index) => (
                          <option key={index} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your project..."
                      className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-prodyum-blue-500 focus:ring-2 focus:ring-prodyum-blue-500/20 transition-all resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 text-white hover:from-prodyum-blue-600 hover:to-prodyum-green-600 font-bold py-6 text-lg transition-all duration-300 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message <Send className="h-5 w-5" />
                      </span>
                    )}
                  </Button>
                </form>
              </RippleHover>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-900 relative overflow-hidden">
        <BackgroundBeams className="absolute inset-0" beamColor="rgba(30,136,229,0.15)" beamCount={4} speed={3} />
        <DotPattern className="absolute inset-0 opacity-20" dotSize={1} gap={30} color="#1E88E5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black/50 border border-white/10 rounded-3xl overflow-hidden h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">Hyderabad, Telangana, India</h3>
              <p className="text-gray-500">Interactive map coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400">Quick answers to common questions</p>
          </div>

          <StaggeredList className="max-w-3xl mx-auto space-y-6" staggerDelay={100} animation="fadeUp">
            {[
              {
                question: 'How long does it take to complete a website?',
                answer: 'The timeline varies depending on the complexity. A simple business website typically takes 2-4 weeks, while more complex solutions may take 6-8 weeks.'
              },
              {
                question: 'Do you offer ongoing support and maintenance?',
                answer: 'Yes, we offer comprehensive support and maintenance packages to keep your website and digital presence running smoothly.'
              },
              {
                question: 'What is your pricing structure?',
                answer: 'Our pricing is customized based on your specific requirements. Contact us for a free consultation and quote.'
              },
              {
                question: 'How do I get started with your services?',
                answer: 'Simply fill out the contact form above or email us at hr@prodyum.in. We\'ll schedule a consultation to understand your needs.'
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 hover:border-prodyum-blue-500/50 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-white mb-2">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </StaggeredList>
        </div>
      </section>

    </div>
  );
};

export default ITContact;
