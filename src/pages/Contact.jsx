import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { MapPin, Phone, Mail, Youtube, Instagram, Clock, Send } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import EnhancedForm from '../components/EnhancedForm';

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
          formData: formData
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message Sent Successfully!",
          description: "We'll get back to you within 24 hours.",
        });
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error sending your message. Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 text-transparent bg-clip-text text-sm font-semibold uppercase tracking-wider">Get In Touch</span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-prodyum-blue-400 via-prodyum-green-400 to-prodyum-lime-400 text-transparent bg-clip-text mt-4 mb-6">Contact Us</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500 mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Let's build something cinematic together
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Information Cards */}
          <Card className="bg-gradient-to-br from-prodyum-blue-500/5 via-prodyum-green-500/5 to-black border-prodyum-blue-500/30 hover:border-prodyum-green-500/60 transition-all duration-300 group hover:shadow-xl hover:shadow-prodyum-green-500/10">
            <CardContent className="p-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 border border-prodyum-green-500/30 mb-6 group-hover:scale-110 group-hover:border-prodyum-green-500/60 transition-all duration-300">
                <MapPin className="h-7 w-7 text-prodyum-green-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:bg-gradient-to-r group-hover:from-prodyum-blue-400 group-hover:to-prodyum-green-400 group-hover:text-transparent group-hover:bg-clip-text transition-all">Location</h3>
              <p className="text-gray-300 text-sm leading-relaxed">Hyderabad, Telangana, India</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-prodyum-blue-500/5 via-prodyum-green-500/5 to-black border-prodyum-blue-500/30 hover:border-prodyum-green-500/60 transition-all duration-300 group hover:shadow-xl hover:shadow-prodyum-green-500/10">
            <CardContent className="p-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 border border-prodyum-green-500/30 mb-6 group-hover:scale-110 group-hover:border-prodyum-green-500/60 transition-all duration-300">
                <Phone className="h-7 w-7 text-prodyum-green-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:bg-gradient-to-r group-hover:from-prodyum-blue-400 group-hover:to-prodyum-green-400 group-hover:text-transparent group-hover:bg-clip-text transition-all">Phone</h3>
              <a href="tel:+919550989977" className="text-gray-300 hover:text-prodyum-lime-400 transition-colors text-sm">
                +91-9550989977
              </a>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-prodyum-blue-500/5 via-prodyum-green-500/5 to-black border-prodyum-blue-500/30 hover:border-prodyum-green-500/60 transition-all duration-300 group hover:shadow-xl hover:shadow-prodyum-green-500/10">
            <CardContent className="p-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 border border-prodyum-green-500/30 mb-6 group-hover:scale-110 group-hover:border-prodyum-green-500/60 transition-all duration-300">
                <Mail className="h-7 w-7 text-prodyum-green-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:bg-gradient-to-r group-hover:from-prodyum-blue-400 group-hover:to-prodyum-green-400 group-hover:text-transparent group-hover:bg-clip-text transition-all">Email</h3>
              <a href="mailto:entertainment@prodyum.in" className="text-gray-300 hover:text-prodyum-lime-400 transition-colors text-sm break-all">
                entertainment@prodyum.in
              </a>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Additional Info */}
          <div className="space-y-8">
            {/* Social Media */}
            <Card className="bg-gradient-to-br from-prodyum-blue-500/5 via-prodyum-green-500/5 to-black border-prodyum-blue-500/30 hover:border-prodyum-green-500/50 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-white font-semibold text-lg mb-6 flex items-center">
                  <Send className="h-5 w-5 text-prodyum-green-400 mr-2" />
                  Follow Us
                </h3>
                <div className="flex items-center space-x-4">
                  <a
                    href="https://www.youtube.com/@prodyumentertainments"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 border border-prodyum-green-500/30 hover:bg-gradient-to-br hover:from-prodyum-blue-500 hover:to-prodyum-green-500 hover:border-prodyum-green-500 text-prodyum-green-400 hover:text-white transition-all duration-300 hover:scale-110"
                  >
                    <Youtube className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.instagram.com/prodyumentertainments"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 border border-prodyum-green-500/30 hover:bg-gradient-to-br hover:from-prodyum-blue-500 hover:to-prodyum-green-500 hover:border-prodyum-green-500 text-prodyum-green-400 hover:text-white transition-all duration-300 hover:scale-110"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="bg-gradient-to-br from-prodyum-blue-500/5 via-prodyum-green-500/5 to-black border-prodyum-blue-500/30 hover:border-prodyum-green-500/50 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-white font-semibold text-lg mb-6 flex items-center">
                  <Clock className="h-5 w-5 text-prodyum-green-400 mr-2" />
                  Business Hours
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center pb-3 border-b border-prodyum-blue-500/20">
                    <span className="text-gray-300">Monday - Friday</span>
                    <span className="text-prodyum-green-400 font-medium">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-prodyum-blue-500/20">
                    <span className="text-gray-300">Saturday</span>
                    <span className="text-prodyum-green-400 font-medium">10:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Sunday</span>
                    <span className="text-red-400 font-medium">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-prodyum-blue-500/5 via-black to-prodyum-green-500/5 border-2 border-prodyum-blue-500/30 hover:border-prodyum-green-500/50 backdrop-blur-xl transition-all duration-500">
              <CardContent className="p-8 sm:p-12">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-prodyum-blue-400 to-prodyum-green-400 text-transparent bg-clip-text mb-8">Send Us a Message</h2>
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