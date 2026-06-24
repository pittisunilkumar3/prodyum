import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { MapPin, Phone, Mail, Youtube, Instagram, Clock, Send } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import EnhancedForm from '../components/EnhancedForm';
import ScrollReveal from '../components/animation/ScrollReveal';

const Contact = () => {
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
          formType: 'contact',
          formData: formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Message Sent Successfully!',
          description: "We'll get back to you within 24 hours.",
        });
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error sending your message. Please try again or contact us directly.',
        variant: 'destructive',
      });
    }
  };

  const infoCards = [
    { icon: MapPin, title: 'Location', value: 'Hyderabad, Telangana, India' },
    { icon: Phone, title: 'Phone', value: '+91-9550989977', href: 'tel:+919550989977' },
    { icon: Mail, title: 'Email', value: 'entertainment@prodyum.in', href: 'mailto:entertainment@prodyum.in', breakAll: true },
  ];

  return (
    <div className="relative min-h-screen pt-32 pb-24">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <ScrollReveal className="mb-20 text-center">
          <span className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 bg-clip-text text-sm font-semibold uppercase tracking-wider text-transparent">Get In Touch</span>
          <h1 className="mt-4 font-display text-5xl font-bold text-gradient-animated sm:text-6xl lg:text-7xl">Contact Us</h1>
          <div className="mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500" />
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-gray-300">
            Let&apos;s build something cinematic together
          </p>
        </ScrollReveal>

        {/* CONTACT INFO CARDS */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {infoCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              whileHover={{ y: -8 }}
              data-cursor-label="Connect"
            >
              <Card className="group h-full rounded-3xl glass-panel gradient-border transition-all duration-300 hover:border-prodyum-green-500/60 hover:shadow-xl hover:shadow-prodyum-green-500/10">
                <div className="p-8">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-prodyum-green-500/30 bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 transition-all duration-300 group-hover:scale-110 group-hover:border-prodyum-green-500/60">
                    <card.icon className="h-7 w-7 text-prodyum-green-400" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-bold text-white">{card.title}</h3>
                  {card.href ? (
                    <a href={card.href} className={`text-sm text-gray-300 transition-colors hover:text-prodyum-lime-400 ${card.breakAll ? 'break-all' : ''}`}>
                      {card.value}
                    </a>
                  ) : (
                    <p className="text-sm leading-relaxed text-gray-300">{card.value}</p>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FORM + SIDE PANEL */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* SIDE */}
          <div className="space-y-8">
            {/* Social */}
            <ScrollReveal>
              <Card className="rounded-3xl glass-panel transition-all duration-300 hover:border-prodyum-green-500/50">
                <div className="p-8">
                  <h3 className="mb-6 flex items-center font-display text-lg font-bold text-white">
                    <Send className="mr-2 h-5 w-5 text-prodyum-green-400" /> Follow Us
                  </h3>
                  <div className="flex items-center space-x-4">
                    <a
                      href="https://www.youtube.com/@prodyumentertainments"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-prodyum-green-500/30 bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 text-prodyum-green-400 transition-all duration-300 hover:scale-110 hover:border-prodyum-green-500 hover:bg-gradient-to-br hover:from-prodyum-blue-500 hover:to-prodyum-green-500 hover:text-white"
                    >
                      <Youtube className="h-6 w-6" />
                    </a>
                    <a
                      href="https://www.instagram.com/prodyumentertainments"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-prodyum-green-500/30 bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 text-prodyum-green-400 transition-all duration-300 hover:scale-110 hover:border-prodyum-green-500 hover:bg-gradient-to-br hover:from-prodyum-blue-500 hover:to-prodyum-green-500 hover:text-white"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            {/* Business Hours */}
            <ScrollReveal delay={0.1}>
              <Card className="rounded-3xl glass-panel transition-all duration-300 hover:border-prodyum-green-500/50">
                <div className="p-8">
                  <h3 className="mb-6 flex items-center font-display text-lg font-bold text-white">
                    <Clock className="mr-2 h-5 w-5 text-prodyum-green-400" /> Business Hours
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between border-b border-prodyum-blue-500/20 pb-3">
                      <span className="text-gray-300">Monday - Friday</span>
                      <span className="font-medium text-prodyum-green-400">9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-prodyum-blue-500/20 pb-3">
                      <span className="text-gray-300">Saturday</span>
                      <span className="font-medium text-prodyum-green-400">10:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Sunday</span>
                      <span className="font-medium text-gray-500">Closed</span>
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          </div>

          {/* FORM */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.1}>
              <Card className="relative overflow-hidden rounded-3xl glass-panel-strong gradient-border backdrop-blur-xl transition-all duration-500 hover:border-prodyum-green-500/50">
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-prodyum-blue-500/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-prodyum-green-500/20 blur-3xl" />
                <div className="relative p-8 sm:p-12">
                  <h2 className="mb-8 font-display text-3xl font-bold text-gradient-animated">Send Us a Message</h2>
                  <EnhancedForm type="contact" onSubmit={handleSubmit} />
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
