import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { 
  ArrowRight, 
  Megaphone, 
  Palette, 
  Globe, 
  Video, 
  CheckCircle2,
  TrendingUp,
  Share2,
  Search,
  Youtube,
  FileText,
  PenTool,
  Layout,
  Image,
  Figma,
  Monitor,
  Building,
  Zap,
  Camera,
  Film,
  Clapperboard
} from 'lucide-react';
import ITHeader from '../../components/ITHeader';
import ITFooter from '../../components/ITFooter';

const ITServices = () => {
  const [activeService, setActiveService] = useState('digital-marketing');

  const serviceCategories = [
    { id: 'digital-marketing', title: 'Digital Marketing', icon: Megaphone },
    { id: 'branding-design', title: 'Branding & Design', icon: Palette },
    { id: 'web-development', title: 'Web Development', icon: Globe },
    { id: 'video-production', title: 'Video Production', icon: Video }
  ];

  const services = {
    'digital-marketing': {
      title: 'Digital Marketing',
      description: 'Helping businesses increase online visibility and reach the right audience through strategic marketing.',
      services: [
        {
          icon: Share2,
          title: 'Social Media Management',
          description: 'Comprehensive social media management across all major platforms including Facebook, Instagram, LinkedIn, and Twitter.'
        },
        {
          icon: TrendingUp,
          title: 'Performance Marketing (Meta Ads & Google Ads)',
          description: 'Data-driven advertising campaigns on Meta (Facebook/Instagram) and Google platforms.'
        },
        {
          icon: Search,
          title: 'Search Engine Optimization (SEO)',
          description: 'Improve your website\'s visibility on search engines with keyword research, on-page optimization, and link building.'
        },
        {
          icon: Youtube,
          title: 'YouTube Marketing',
          description: 'Grow your YouTube presence with optimized video content, channel management, and advertising.'
        },
        {
          icon: FileText,
          title: 'Content Strategy',
          description: 'Develop a winning content strategy that aligns with your business goals and resonates with your audience.'
        }
      ]
    },
    'branding-design': {
      title: 'Branding & Design',
      description: 'Building strong brand identities and impactful visual communication that sets you apart from the competition.',
      services: [
        {
          icon: PenTool,
          title: 'Logo Design',
          description: 'Create a memorable and professional logo that represents your brand identity.'
        },
        {
          icon: Layout,
          title: 'Brand Identity Design',
          description: 'Comprehensive brand identity packages including color palettes, typography, and brand guidelines.'
        },
        {
          icon: Image,
          title: 'Social Media Creatives',
          description: 'Eye-catching social media graphics and templates designed to increase engagement.'
        },
        {
          icon: Camera,
          title: 'Marketing Graphics',
          description: 'Professional marketing materials including brochures, flyers, banners, and posters.'
        },
        {
          icon: Figma,
          title: 'UI/UX Design',
          description: 'User-centered design for websites and applications that enhance user experience.'
        }
      ]
    },
    'web-development': {
      title: 'Web Development',
      description: 'Developing modern, responsive websites that help businesses establish their online presence.',
      services: [
        {
          icon: Building,
          title: 'Business Websites',
          description: 'Professional websites for small and medium businesses with modern, responsive design.'
        },
        {
          icon: Monitor,
          title: 'Corporate Websites',
          description: 'Enterprise-level websites with advanced features and sophisticated functionality.'
        },
        {
          icon: Zap,
          title: 'Landing Pages',
          description: 'High-converting landing pages designed for marketing campaigns and lead generation.'
        },
        {
          icon: Globe,
          title: 'E-commerce Websites',
          description: 'Full-featured online stores with product catalogs, shopping carts, and payment integration.'
        }
      ]
    },
    'video-production': {
      title: 'Video & Multimedia',
      description: 'Producing professional visual content for branding and marketing that captivates your audience.',
      services: [
        {
          icon: Camera,
          title: 'Product Shoots',
          description: 'Professional product photography and videography that showcases your products in the best light.'
        },
        {
          icon: Film,
          title: 'Promotional Videos',
          description: 'Engaging promotional videos that tell your brand story and showcase your products or services.'
        },
        {
          icon: Clapperboard,
          title: 'Social Media Videos',
          description: 'Short-form video content optimized for Instagram Reels, TikTok, and YouTube Shorts.'
        },
        {
          icon: Video,
          title: 'Video Editing',
          description: 'Professional video editing services including color grading, motion graphics, and sound design.'
        }
      ]
    }
  };

  const currentService = services[activeService];

  return (
    <div className="min-h-screen bg-black">
      <ITHeader />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
              <Megaphone className="h-4 w-4 text-prodyum-green-400" />
              <span className="text-gray-300 text-sm">What We Offer</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Our <span className="bg-gradient-to-r from-prodyum-blue-400 to-prodyum-green-400 bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Comprehensive digital solutions tailored to your business needs. 
              From digital marketing to web development, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Service Categories Navigation */}
      <section className="sticky top-20 z-40 bg-black/95 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-4 gap-2 scrollbar-hide">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveService(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all duration-300 ${
                  activeService === category.id
                    ? 'bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <category.icon className="h-5 w-5" />
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Service Content */}
      <section className="py-16 lg:py-24 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {currentService.title}
            </h2>
            <p className="text-xl text-gray-400">
              {currentService.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {currentService.services.map((service, index) => (
              <div
                key={index}
                className="group bg-gray-900/50 border border-white/10 rounded-2xl p-8 hover:border-prodyum-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-prodyum-blue-500/10"
              >
                <div className="flex items-start gap-6">
                  <div className="h-14 w-14 bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-7 w-7 text-prodyum-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 text-white hover:from-prodyum-blue-600 hover:to-prodyum-green-600 font-bold px-8"
            >
              <Link to="/it/contact" className="flex items-center gap-2">
                Get a Quote <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* All Services Overview */}
      <section className="py-16 lg:py-24 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Complete Service Overview
            </h2>
            <p className="text-xl text-gray-400">
              All our services at a glance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(services).map(([key, service]) => (
              <div
                key={key}
                className="bg-black/50 border border-white/10 rounded-2xl p-6 hover:border-prodyum-green-500/50 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-white mb-4">{service.title}</h3>
                <ul className="space-y-3">
                  {service.services.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-prodyum-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-400 text-sm">{item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-prodyum-blue-600 to-prodyum-green-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss how our services can help you achieve your business goals.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-prodyum-blue-600 hover:bg-gray-100 font-bold px-8"
          >
            <Link to="/it/contact" className="flex items-center gap-2">
              Contact Us <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <ITFooter />
    </div>
  );
};

export default ITServices;
