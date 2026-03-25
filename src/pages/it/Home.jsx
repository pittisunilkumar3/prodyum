import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { 
  ArrowRight, 
  Megaphone, 
  Palette, 
  Globe, 
  Video, 
  Building2, 
  GraduationCap, 
  Rocket, 
  ShoppingCart, 
  Film, 
  Store,
  Users,
  Target,
  Zap,
  Award,
  CheckCircle2,
  Lightbulb,
  FileText,
  PenTool
} from 'lucide-react';
import ITHeader from '../../components/ITHeader';
import ITFooter from '../../components/ITFooter';

const ITHome = () => {
  const services = [
    {
      icon: Megaphone,
      title: 'Digital Marketing',
      description: 'Helping businesses increase online visibility and reach the right audience through strategic marketing.',
      items: ['Social Media Management', 'Meta Ads & Google Ads', 'SEO', 'YouTube Marketing', 'Content Strategy']
    },
    {
      icon: Palette,
      title: 'Branding & Design',
      description: 'Building strong brand identities and impactful visual communication.',
      items: ['Logo Design', 'Brand Identity Design', 'Social Media Creatives', 'Marketing Graphics', 'UI/UX Design']
    },
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Developing modern, responsive websites for businesses.',
      items: ['Business Websites', 'Corporate Websites', 'Landing Pages', 'E-commerce Websites']
    },
    {
      icon: Video,
      title: 'Video & Multimedia',
      description: 'Producing professional visual content for branding and marketing.',
      items: ['Product Shoots', 'Video Editing', 'Promotional Videos', 'Social Media Reels']
    }
  ];

  const industries = [
    { icon: Building2, name: 'Real Estate' },
    { icon: GraduationCap, name: 'Education & Training' },
    { icon: Rocket, name: 'Startups & SMBs' },
    { icon: ShoppingCart, name: 'E-commerce Brands' },
    { icon: Film, name: 'Entertainment & Media' },
    { icon: Store, name: 'Local Businesses' }
  ];

  const whyChooseUs = [
    { icon: Users, title: 'Experienced Team', description: 'Creative and technical team with years of expertise' },
    { icon: Target, title: 'End-to-end Solutions', description: 'Complete digital solutions under one roof' },
    { icon: Zap, title: 'Customized Strategies', description: 'Tailored strategies for each client\'s needs' },
    { icon: Award, title: 'Focus on Growth', description: 'Committed to brand growth and performance' },
    { icon: CheckCircle2, title: 'Professional Service', description: 'Reliable and professional service delivery' }
  ];

  const processSteps = [
    { icon: Lightbulb, title: 'Understanding Requirements', description: 'We listen to your goals and understand your business needs' },
    { icon: FileText, title: 'Strategy & Planning', description: 'Creating a tailored roadmap for your digital success' },
    { icon: PenTool, title: 'Creative Development', description: 'Bringing ideas to life with creative excellence' },
    { icon: Rocket, title: 'Execution & Delivery', description: 'Implementing solutions and delivering results' }
  ];

  return (
    <div className="min-h-screen bg-black">
      <ITHeader />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-prodyum-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-prodyum-green-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
              <Zap className="h-4 w-4 text-prodyum-green-400" />
              <span className="text-gray-300 text-sm">Digital Solutions Partner</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="text-white">Helping Businesses Grow Through</span>
              <br />
              <span className="bg-gradient-to-r from-prodyum-blue-400 via-prodyum-green-400 to-prodyum-lime-400 bg-clip-text text-transparent">
                Digital Marketing & Technology
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              ProDyum IT Pvt Ltd delivers professional Digital Marketing, Branding, Web Development, 
              and Multimedia Solutions that help businesses build a strong digital presence and grow online.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 text-white hover:from-prodyum-blue-600 hover:to-prodyum-green-600 font-bold px-8 py-6 text-lg transition-all duration-300 hover:scale-105 shadow-xl shadow-prodyum-blue-500/25"
              >
                <Link to="/it/services" className="flex items-center gap-2">
                  Our Services <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-bold px-8 py-6 text-lg"
              >
                <Link to="/it/contact">Contact Us</Link>
              </Button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
              <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-prodyum-blue-500/10 border border-prodyum-blue-500/20 rounded-full px-4 py-2 mb-6">
                <Building2 className="h-4 w-4 text-prodyum-blue-400" />
                <span className="text-prodyum-blue-400 text-sm font-medium">About Us</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                About <span className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 bg-clip-text text-transparent">ProDyum IT</span>
              </h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                ProDyum IT Pvt Ltd is a Hyderabad-based digital solutions company focused on helping 
                businesses grow through technology, creativity, and strategic digital marketing.
              </p>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                We specialize in building strong digital presence for brands through modern marketing 
                strategies, creative design, and web technologies.
              </p>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Our team works closely with clients to understand their goals and deliver customized 
                digital solutions that drive real business results.
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 text-white hover:from-prodyum-blue-600 hover:to-prodyum-green-600 font-bold px-6"
              >
                <Link to="/it/about" className="flex items-center gap-2">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-gray-900/50 border border-white/10 p-6 rounded-2xl">
                    <div className="h-12 w-12 bg-prodyum-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-prodyum-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">100+</h3>
                    <p className="text-gray-400">Happy Clients</p>
                  </div>
                  <div className="bg-gradient-to-br from-prodyum-blue-500 to-prodyum-green-500 p-6 rounded-2xl shadow-lg shadow-prodyum-blue-500/25">
                    <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">50+</h3>
                    <p className="text-white/80">Projects Delivered</p>
                  </div>
                </div>
                <div className="space-y-6 mt-12">
                  <div className="bg-gray-900/50 border border-white/10 p-6 rounded-2xl">
                    <div className="h-12 w-12 bg-prodyum-green-500/20 rounded-xl flex items-center justify-center mb-4">
                      <Target className="h-6 w-6 text-prodyum-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">5+</h3>
                    <p className="text-gray-400">Years Experience</p>
                  </div>
                  <div className="bg-gray-900/50 border border-white/10 p-6 rounded-2xl">
                    <div className="h-12 w-12 bg-prodyum-lime-500/20 rounded-xl flex items-center justify-center mb-4">
                      <Zap className="h-6 w-6 text-prodyum-lime-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">24/7</h3>
                    <p className="text-gray-400">Support Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-32 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 bg-prodyum-green-500/10 border border-prodyum-green-500/20 rounded-full px-4 py-2 mb-6">
              <Megaphone className="h-4 w-4 text-prodyum-green-400" />
              <span className="text-prodyum-green-400 text-sm font-medium">What We Offer</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-gray-900/50 border border-white/10 rounded-3xl p-8 hover:border-prodyum-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-prodyum-blue-500/10"
              >
                <div className="flex items-start gap-6">
                  <div className="h-16 w-16 bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-8 w-8 text-prodyum-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-gray-400 mb-4">{service.description}</p>
                    <ul className="grid grid-cols-2 gap-2">
                      {service.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                          <CheckCircle2 className="h-4 w-4 text-prodyum-green-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              className="border-prodyum-blue-500/50 text-prodyum-blue-400 hover:bg-prodyum-blue-500/10 font-bold px-8"
            >
              <Link to="/it/services" className="flex items-center gap-2">
                View All Services <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 mb-6">
              <Building2 className="h-4 w-4 text-prodyum-green-400" />
              <span className="text-gray-300 text-sm font-medium">Industries We Serve</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              We Work Across <span className="bg-gradient-to-r from-prodyum-blue-400 to-prodyum-green-400 bg-clip-text text-transparent">Multiple Industries</span>
            </h2>
            <p className="text-gray-400 text-lg">
              ProDyum IT provides digital solutions to businesses across multiple industries
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="group bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 hover:border-prodyum-green-500/50 transition-all duration-300"
              >
                <div className="h-14 w-14 bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <industry.icon className="h-7 w-7 text-prodyum-green-400" />
                </div>
                <h3 className="text-white font-medium text-sm">{industry.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 lg:py-32 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-prodyum-lime-500/10 border border-prodyum-lime-500/20 rounded-full px-4 py-2 mb-6">
                <Award className="h-4 w-4 text-prodyum-lime-400" />
                <span className="text-prodyum-lime-400 text-sm font-medium">Why Choose Us</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why Partner With <span className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 bg-clip-text text-transparent">ProDyum IT</span>?
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                We combine creativity, strategy, and technology to deliver solutions that help brands 
                grow and succeed in the digital world.
              </p>
              
              <div className="space-y-6">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-6 w-6 text-prodyum-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-prodyum-blue-500 to-prodyum-green-500 rounded-3xl p-8 text-white shadow-xl shadow-prodyum-blue-500/25">
                <h3 className="text-2xl font-bold mb-6">Our Process</h3>
                <div className="space-y-6">
                  {processSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 text-lg font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{step.title}</h4>
                        <p className="text-white/80 text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-prodyum-blue-600 to-prodyum-green-600 rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '30px 30px'
              }} />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Grow Your Business Online?
              </h2>
              <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
                Let's discuss how our digital solutions can help you achieve your business goals. 
                Contact us today for a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-prodyum-blue-600 hover:bg-gray-100 font-bold px-8 py-6 text-lg shadow-xl"
                >
                  <Link to="/it/contact" className="flex items-center gap-2">
                    Contact Us <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-6 text-lg"
                >
                  <Link to="/it/services">View Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ITFooter />
    </div>
  );
};

export default ITHome;
