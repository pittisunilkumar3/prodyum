import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Youtube, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link to="/entertainment" className="flex items-center space-x-3 group mb-4">
              <img 
                src="/logo.png" 
                alt="ProDyum Logo" 
                className="h-10 w-10 object-contain" 
              />
              <span className="text-xl font-bold">
                <span className="text-white">Pro</span>
                <span className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 bg-clip-text text-transparent">Dyum</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm">
              A growing ecosystem of digital technology, marketing, and entertainment solutions.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/it" className="text-gray-400 hover:text-prodyum-blue-400 transition-colors text-sm">
                  ProDyum IT
                </Link>
              </li>
              <li>
                <Link to="/entertainment" className="text-gray-400 hover:text-prodyum-lime-400 transition-colors text-sm">
                  ProDyum Entertainments
                </Link>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About
                </a>
              </li>
              <li>
                <a href="/entertainment#contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">Film Production</li>
              <li className="text-gray-400 text-sm">Web Series</li>
              <li className="text-gray-400 text-sm">Music Content</li>
              <li className="text-gray-400 text-sm">Digital Media</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="flex items-center space-x-2 text-gray-400 text-sm mb-4">
              <Mail className="h-4 w-4 text-prodyum-green-400" />
              <a href="mailto:hr@prodyum.in" className="hover:text-prodyum-lime-400 transition-colors">
                hr@prodyum.in
              </a>
            </div>
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="https://youtube.com/@prodyumentertainments?si=KsDM4KsQnfHdTIFI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-prodyum-green-400 transition-all duration-300 hover:scale-110"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/prodyumentertainments?igsh=OTF2cjB6MmI5cDh6&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-prodyum-green-400 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/share/1JkwxPbR4q/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-prodyum-green-400 transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} ProDyum. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
