import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { CheckCircle2, TrendingUp, Shield, Clock, Users } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import EnhancedForm from '../components/EnhancedForm';

const Investors = () => {
  const { toast } = useToast();

  const handleSubmit = (formData) => {
    console.log('Investor form submitted:', formData);
    toast({
      title: "Interest Submitted Successfully!",
      description: "We'll contact you within 2 business days.",
    });
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-amber-500 text-sm font-semibold uppercase tracking-wider">Investment Opportunities</span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mt-4 mb-6">Investor Information</h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6" />
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Invest in premium Telugu originals with a transparent, milestone-driven model
          </p>
        </div>

        {/* Why Partner With Us */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Why Partner With ProDyum?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: 'Transparent Budgeting',
                description: 'Clear financial planning with detailed breakdowns and milestone-based tracking for complete visibility.'
              },
              {
                icon: Clock,
                title: 'Milestone Tracking',
                description: 'Weekly updates and regular progress reports to keep you informed at every stage of production.'
              },
              {
                icon: TrendingUp,
                title: 'Diverse Slate',
                description: 'Invest across films, web series, and short content to diversify your entertainment portfolio.'
              },
              {
                icon: Users,
                title: 'Experienced Team',
                description: 'Work with seasoned professionals who understand both creative and commercial aspects of filmmaking.'
              }
            ].map((benefit, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-neutral-900 to-black border-white/10 hover:border-amber-500/50 transition-all duration-500 group"
              >
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6 group-hover:bg-amber-500/20 group-hover:scale-110 transition-all duration-300">
                    <benefit.icon className="h-8 w-8 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Investment Process */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Investment Process</h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                { step: '01', title: 'Project Approval', desc: 'Review and select projects from our slate' },
                { step: '02', title: 'Funding Milestones', desc: 'Agree on payment schedule and terms' },
                { step: '03', title: 'Production', desc: 'Weekly updates during filming and post' },
                { step: '04', title: 'Delivery & QC', desc: 'Quality control and final delivery' },
                { step: '05', title: 'Revenue Share', desc: 'Returns after recoupment as agreed' }
              ].map((item, idx) => (
                <Card key={idx} className="bg-neutral-900 border-white/10 hover:border-amber-500/50 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-black font-bold text-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {item.step}
                      </div>
                      <h3 className="text-white font-semibold mb-2 group-hover:text-amber-500 transition-colors duration-300">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Form */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-neutral-900 via-black to-neutral-900 border-white/10 backdrop-blur-xl">
            <CardContent className="p-8 sm:p-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Express Your Interest</h2>
                <p className="text-gray-400 text-lg">Fill out the form below and we'll get back to you within 2 business days</p>
              </div>
              <EnhancedForm type="investor" onSubmit={handleSubmit} />

              {/* Contact Info */}
              <div className="mt-10 pt-10 border-t border-white/10">
                <p className="text-center text-gray-400 text-sm mb-4">Or reach out directly:</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                  <a href="mailto:entertainment@prodyum.in" className="text-amber-500 hover:text-amber-400 transition-colors font-medium">
                    entertainment@prodyum.in
                  </a>
                  <span className="text-gray-600 hidden sm:inline">•</span>
                  <a href="tel:+919949590033" className="text-amber-500 hover:text-amber-400 transition-colors font-medium">
                    +91 99495 90033
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Investors;