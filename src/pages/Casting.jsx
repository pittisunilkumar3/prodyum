import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Users, Film, Camera, Mic, Palette, Star } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import EnhancedForm from '../components/EnhancedForm';

const Casting = () => {
  const { toast } = useToast();

  const handleSubmit = async (formData) => {
    try {
      // Send form data to backend API
      const response = await fetch('http://217.217.248.188:5000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'casting',
          formData: formData
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Application Submitted Successfully!",
          description: "We'll review your profile and contact shortlisted candidates.",
        });
      } else {
        throw new Error(result.message || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  const roles = [
    { icon: Star, title: 'Actors', description: 'Lead, supporting, and character roles', gradient: 'from-amber-500/20 to-amber-600/20' },
    { icon: Camera, title: 'Directors of Photography', description: 'Cinematography and visual storytelling', gradient: 'from-amber-500/20 to-orange-600/20' },
    { icon: Film, title: 'Editors', description: 'Post-production and assembly', gradient: 'from-amber-500/20 to-yellow-600/20' },
    { icon: Palette, title: 'VFX Artists', description: 'Visual effects and compositing', gradient: 'from-amber-500/20 to-red-600/20' },
    { icon: Mic, title: 'Sound Engineers', description: 'Sound design and mixing', gradient: 'from-amber-500/20 to-pink-600/20' },
    { icon: Users, title: 'Crew Members', description: 'ADs, makeup, art department & more', gradient: 'from-amber-500/20 to-purple-600/20' }
  ];

  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-amber-500 text-sm font-semibold uppercase tracking-wider">Join Our Team</span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mt-4 mb-6">Casting & Crew</h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6" />
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Join our team of talented professionals and be part of cinematic excellence
          </p>
        </div>

        {/* Roles We're Looking For */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Who Can Apply</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role, idx) => (
              <Card
                key={idx}
                className="bg-gradient-to-br from-neutral-900 to-black border-white/10 hover:border-amber-500/50 transition-all duration-500 group overflow-hidden relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-start space-x-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex-shrink-0 group-hover:bg-amber-500/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      <role.icon className="h-7 w-7 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-500 transition-colors duration-300">
                        {role.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{role.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-24">
          <Card className="bg-gradient-to-r from-neutral-900 via-black to-neutral-900 border-amber-500/20 overflow-hidden">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold text-white mb-8 text-center">Why Work With ProDyum?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-500 mb-2">Creative Freedom</div>
                  <p className="text-gray-400 text-sm">Express your artistic vision in a supportive environment</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-500 mb-2">Top Equipment</div>
                  <p className="text-gray-400 text-sm">Work with state-of-the-art production technology</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-500 mb-2">Career Growth</div>
                  <p className="text-gray-400 text-sm">Build your portfolio with acclaimed productions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Form */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-neutral-900 via-black to-neutral-900 border-white/10 backdrop-blur-xl">
            <CardContent className="p-8 sm:p-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Submit Your Application</h2>
                <p className="text-gray-400 text-lg">Submissions are reviewed on a rolling basis. We will contact shortlisted candidates.</p>
              </div>
              <EnhancedForm type="casting" onSubmit={handleSubmit} />

              {/* Contact Info */}
              <div className="mt-10 pt-10 border-t border-white/10">
                <p className="text-center text-gray-400 text-sm mb-4">Questions? Reach out to us:</p>
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

export default Casting;