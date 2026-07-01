import React from 'react';
import { Mail, MapPin, Linkedin, Twitter, Instagram, Facebook, ArrowRight, Monitor } from 'lucide-react';
import { Button } from './ui/button';

const ITFooter = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/it', label: 'Home' },
    { href: '/it#services', label: 'Services' },
    { href: '/it#portfolio', label: 'Portfolio' },
    { href: '/it#about', label: 'About Us' },
    { href: '/it#careers', label: 'Careers' },
    { href: '/it#contact', label: 'Contact' }
  ];

  const services = [
    'Digital Marketing',
    'Branding & Design',
    'Web Development',
    'Video & Multimedia',
    'SEO Services',
    'Social Media Management'
  ];

  return (
    <footer className="bg-gray-900/80 border-t border-gray-800">
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-prodyum-blue-600 to-prodyum-green-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Ready to Grow Your Business Online?
              </h3>
              <p className="text-white/80">
                Let's discuss how we can help you achieve your digital goals.
              </p>
            </div>
            <Button
              asChild
              className="bg-white text-prodyum-blue-600 hover:bg-gray-100 font-bold px-8 py-6 text-lg transition-all duration-300 hover:scale-105 shadow-xl"
            >
              <a href="/it#contact" className="flex items-center gap-2">
                Contact Us <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <a href="/it" className="flex items-center space-x-3 group">
              <div className="h-12 w-12 bg-gradient-to-br from-prodyum-blue-500 to-prodyum-green-500 rounded-xl flex items-center justify-center">
                <Monitor className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">ProDyum IT</span>
                <span className="text-xs text-gray-400">Pvt Ltd</span>
              </div>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed">
              ProDyum IT Pvt Ltd is a Hyderabad-based digital solutions company focused on helping businesses grow through technology, creativity, and strategic digital marketing.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-prodyum-blue-600 transition-all duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-prodyum-blue-600 transition-all duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-prodyum-green-600 transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-prodyum-green-600 transition-all duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-prodyum-green-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href="/it#services"
                    className="text-gray-400 hover:text-prodyum-blue-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-prodyum-green-400" />
                </div>
                <span className="text-gray-300 text-sm pt-2">Hyderabad, Telangana, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-prodyum-blue-400" />
                </div>
                <a href="mailto:hr@prodyum.in" className="text-gray-300 hover:text-prodyum-green-400 transition-colors duration-300 text-sm">
                  hr@prodyum.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {currentYear} ProDyum IT Pvt Ltd. All Rights Reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="/it" className="text-gray-500 hover:text-prodyum-green-400 transition-colors duration-300 text-sm">
                Privacy Policy
              </a>
              <a href="/it" className="text-gray-500 hover:text-prodyum-green-400 transition-colors duration-300 text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ITFooter;
