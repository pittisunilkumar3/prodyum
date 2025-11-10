import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { MapPin, Phone, Mail, Youtube, Instagram, Clock, Send } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import EnhancedForm from '../components/EnhancedForm';

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (formData) => {
    console.log('Contact form submitted:', formData);
    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you within 24 hours.",
    });
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-amber-500 text-sm font-semibold uppercase tracking-wider">Get In Touch</span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mt-4 mb-6">Contact Us</h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6" />
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Let's build something cinematic together
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Information Cards */}
          <Card className="bg-gradient-to-br from-neutral-900 to-black border-white/10 hover:border-amber-500/50 transition-all duration-300 group">
            <CardContent className="p-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6 group-hover:bg-amber-500/20 group-hover:scale-110 transition-all duration-300">
                <MapPin className="h-7 w-7 text-amber-500" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Location</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Hyderabad, Telangana, India</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-neutral-900 to-black border-white/10 hover:border-amber-500/50 transition-all duration-300 group">
            <CardContent className="p-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6 group-hover:bg-amber-500/20 group-hover:scale-110 transition-all duration-300">
                <Phone className="h-7 w-7 text-amber-500" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Phone</h3>
              <a href="tel:+919949590033" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                +91 99495 90033
              </a>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-neutral-900 to-black border-white/10 hover:border-amber-500/50 transition-all duration-300 group">
            <CardContent className="p-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6 group-hover:bg-amber-500/20 group-hover:scale-110 transition-all duration-300">
                <Mail className="h-7 w-7 text-amber-500" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Email</h3>
              <a href="mailto:entertainment@prodyum.in" className="text-gray-400 hover:text-amber-500 transition-colors text-sm break-all">
                entertainment@prodyum.in
              </a>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Additional Info */}
          <div className="space-y-8">
            {/* Social Media */}
            <Card className="bg-gradient-to-br from-neutral-900 to-black border-white/10">
              <CardContent className="p-8">
                <h3 className="text-white font-semibold text-lg mb-6 flex items-center">
                  <Send className="h-5 w-5 text-amber-500 mr-2" />
                  Follow Us
                </h3>
                <div className="flex items-center space-x-4">
                  <a
                    href="https://www.youtube.com/@prodyumentertainments"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500 hover:border-amber-500 text-amber-500 hover:text-black transition-all duration-300"
                  >
                    <Youtube className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.instagram.com/prodyumentertainments"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500 hover:border-amber-500 text-amber-500 hover:text-black transition-all duration-300"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="bg-gradient-to-br from-neutral-900 to-black border-white/10">
              <CardContent className="p-8">
                <h3 className="text-white font-semibold text-lg mb-6 flex items-center">
                  <Clock className="h-5 w-5 text-amber-500 mr-2" />
                  Business Hours
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <span className="text-gray-400">Monday - Friday</span>
                    <span className="text-white font-medium">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <span className="text-gray-400">Saturday</span>
                    <span className="text-white font-medium">10:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Sunday</span>
                    <span className="text-red-400 font-medium">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-neutral-900 via-black to-neutral-900 border-white/10 backdrop-blur-xl">
              <CardContent className="p-8 sm:p-12">
                <h2 className="text-3xl font-bold text-white mb-8">Send Us a Message</h2>
                <EnhancedForm type="contact" onSubmit={handleSubmit} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;