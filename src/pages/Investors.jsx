import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { CheckCircle2, TrendingUp, Shield, Clock, Users } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import EnhancedForm from '../components/EnhancedForm';

const Investors = () => {
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
          formType: 'investor',
          formData: formData
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Interest Submitted Successfully!",
          description: "We'll contact you within 2 business days.",
        });
      } else {
        throw new Error(result.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your interest. Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 text-transparent bg-clip-text text-sm font-semibold uppercase tracking-wider">Investment Opportunities</span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-prodyum-blue-400 via-prodyum-green-400 to-prodyum-lime-400 text-transparent bg-clip-text mt-4 mb-6">Investor Information</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500 mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Invest in premium Telugu originals with a transparent, milestone-driven model
          </p>
        </div>

        {/* Why Partner With Us */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-prodyum-blue-400 to-prodyum-green-400 text-transparent bg-clip-text mb-12 text-center">Why Partner With ProDyum?</h2>
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
                className="bg-gradient-to-br from-prodyum-blue-500/5 via-prodyum-green-500/5 to-black border-prodyum-blue-500/20 hover:border-prodyum-green-500/50 transition-all duration-500 group hover:shadow-xl hover:shadow-prodyum-green-500/10"
              >
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 border border-prodyum-blue-500/30 mb-6 group-hover:scale-110 group-hover:border-prodyum-green-500/50 transition-all duration-300">
                    <benefit.icon className="h-8 w-8 text-prodyum-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-prodyum-blue-400 group-hover:to-prodyum-green-400 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Investment Process */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-prodyum-blue-400 to-prodyum-green-400 text-transparent bg-clip-text mb-12 text-center">Investment Process</h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                { step: '01', title: 'Project Approval', desc: 'Review and select projects from our slate' },
                { step: '02', title: 'Funding Milestones', desc: 'Agree on payment schedule and terms' },
                { step: '03', title: 'Production', desc: 'Weekly updates during filming and post' },
                { step: '04', title: 'Delivery & QC', desc: 'Quality control and final delivery' },
                { step: '05', title: 'Revenue Share', desc: 'Returns after recoupment as agreed' }
              ].map((item, idx) => (
                <Card key={idx} className="bg-gradient-to-br from-prodyum-blue-500/10 to-prodyum-green-500/10 border-prodyum-blue-500/30 hover:border-prodyum-green-500/60 transition-all duration-300 group hover:shadow-lg hover:shadow-prodyum-green-500/20">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500 text-white font-bold text-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        {item.step}
                      </div>
                      <h3 className="text-white font-semibold mb-2 group-hover:bg-gradient-to-r group-hover:from-prodyum-blue-400 group-hover:to-prodyum-green-400 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300">{item.title}</h3>
                      <p className="text-gray-300 text-sm">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Form */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-prodyum-blue-500/5 via-black to-prodyum-green-500/5 border-2 border-prodyum-blue-500/30 hover:border-prodyum-green-500/50 backdrop-blur-xl transition-all duration-500">
            <CardContent className="p-8 sm:p-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-prodyum-blue-400 to-prodyum-green-400 text-transparent bg-clip-text mb-4">Express Your Interest</h2>
                <p className="text-gray-300 text-lg">Fill out the form below and we'll get back to you within 2 business days</p>
              </div>
              <EnhancedForm type="investor" onSubmit={handleSubmit} />

              {/* Contact Info */}
              <div className="mt-10 pt-10 border-t border-prodyum-blue-500/20">
                <p className="text-center text-gray-300 text-sm mb-4">Or reach out directly:</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                  <a href="mailto:entertainment@prodyum.in" className="text-prodyum-green-400 hover:text-prodyum-lime-400 transition-colors font-medium">
                    entertainment@prodyum.in
                  </a>
                  <span className="text-gray-600 hidden sm:inline">•</span>
                  <a href="tel:+919550989977" className="text-prodyum-green-400 hover:text-prodyum-lime-400 transition-colors font-medium">
                    +91-9550989977
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