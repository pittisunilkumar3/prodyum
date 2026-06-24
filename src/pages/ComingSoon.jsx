import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Monitor, ArrowLeft, Mail, Send, Rocket, Code, Cpu } from 'lucide-react';

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Animated background particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-prodyum-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-prodyum-green-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-prodyum-blue-500/30"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8 group">
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Logo */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-prodyum-blue-500 to-prodyum-green-500 mb-6 animate-pulse">
            <Monitor className="h-12 w-12 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          <span className="text-white">IT </span>
          <span className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 bg-clip-text text-transparent">ProDyum</span>
        </h1>

        {/* Coming Soon Badge */}
        <div className="inline-flex items-center space-x-2 bg-prodyum-blue-500/10 border border-prodyum-blue-500/30 rounded-full px-6 py-3 mb-8">
          <Rocket className="h-5 w-5 text-prodyum-blue-400" />
          <span className="text-prodyum-blue-400 font-semibold">Coming Soon</span>
        </div>

        {/* Description */}
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          We're crafting innovative IT solutions and technology services. 
          Get ready for cutting-edge software development, cloud solutions, and digital transformation.
        </p>

        {/* Features Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:border-prodyum-blue-500/50 transition-all duration-300">
            <Code className="h-8 w-8 text-prodyum-blue-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Software Development</h3>
            <p className="text-gray-400 text-sm">Custom solutions tailored to your needs</p>
          </div>
          <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:border-prodyum-green-500/50 transition-all duration-300">
            <Cpu className="h-8 w-8 text-prodyum-green-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Cloud Services</h3>
            <p className="text-gray-400 text-sm">Scalable and secure infrastructure</p>
          </div>
          <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:border-prodyum-lime-500/50 transition-all duration-300">
            <Rocket className="h-8 w-8 text-prodyum-lime-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Digital Transformation</h3>
            <p className="text-gray-400 text-sm">Modernize your business operations</p>
          </div>
        </div>

        {/* Email Subscription */}
        <div className="max-w-md mx-auto">
          <p className="text-gray-400 mb-4">Be the first to know when we launch:</p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-prodyum-blue-500 transition-colors"
              />
            </div>
            <Button
              type="submit"
              className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 text-white hover:from-prodyum-blue-600 hover:to-prodyum-green-600 px-6"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
          {isSubscribed && (
            <p className="text-prodyum-green-400 mt-4 animate-fade-in">
              Thanks! We'll notify you when we launch.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Prodyum. All rights reserved.</p>
        </div>
      </div>

      {/* CSS for floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;
