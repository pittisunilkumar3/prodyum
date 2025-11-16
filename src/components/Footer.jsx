import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Youtube, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src="/logo.png" 
                alt="ProDyum Logo" 
                className="h-10 w-10 object-contain" 
              />
              <span className="text-xl font-bold text-white">ProDyum</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              We craft cinematic stories for Movies, Web Series & Short Films. From script to screen—ProDyum Entertainments builds premium Telugu and multilingual content.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://youtube.com/@prodyumentertainments?si=KsDM4KsQnfHdTIFI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-prodyum-blue-500 transition-colors duration-300"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/prodyumentertainments?igsh=OTF2cjB6MmI5cDh6&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-prodyum-blue-500 transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/share/1JkwxPbR4q/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-prodyum-blue-500 transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-prodyum-blue-500 transition-colors duration-300 text-sm">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-prodyum-blue-500 transition-colors duration-300 text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/investors" className="text-gray-400 hover:text-prodyum-blue-500 transition-colors duration-300 text-sm">
                  Investors
                </Link>
              </li>
              <li>
                <Link to="/casting" className="text-gray-400 hover:text-prodyum-blue-500 transition-colors duration-300 text-sm">
                  Casting & Crew
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Our Services</h3>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm">Movies Production</li>
              <li className="text-gray-400 text-sm">Web Series</li>
              <li className="text-gray-400 text-sm">Short Films</li>
              <li className="text-gray-400 text-sm">Post-Production</li>
              <li className="text-gray-400 text-sm">VFX & Sound</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-prodyum-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">Hyderabad, Telangana, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-prodyum-blue-500 flex-shrink-0" />
                <a href="tel:+919949590033" className="text-gray-400 hover:text-prodyum-blue-500 transition-colors duration-300 text-sm">
                  +91 99495 90033
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-prodyum-blue-500 flex-shrink-0" />
                <a href="mailto:entertainment@prodyum.in" className="text-gray-400 hover:text-prodyum-blue-500 transition-colors duration-300 text-sm break-all">
                  entertainment@prodyum.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {currentYear} ProDyum Pvt Ltd. All Rights Reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-gray-500 hover:text-prodyum-blue-500 transition-colors duration-300 text-sm">
                Privacy Policy
              </Link>
              <Link to="/" className="text-gray-500 hover:text-prodyum-blue-500 transition-colors duration-300 text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;