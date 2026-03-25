import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Film, Monitor, ArrowRight, Check } from 'lucide-react';

const Landing = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    setSelectedCard(path);
    // Add a small delay for animation before navigation
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-prodyum-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-prodyum-green-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-prodyum-lime-500 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8">
          <span className="text-gray-300 text-sm">Welcome to ProDyum</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="text-white">Choose Your </span>
          <span className="bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500 bg-clip-text text-transparent">Destination</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg sm:text-xl text-gray-400 mb-16 max-w-2xl mx-auto">
          A multi-division brand bringing together technology, digital marketing, and entertainment under one ecosystem.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* ProDyum IT Card */}
          <div 
            onClick={() => handleCardClick('/it')}
            className={`group relative cursor-pointer transition-all duration-500 ${
              selectedCard === '/it' ? 'scale-105' : ''
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br from-prodyum-blue-500 to-prodyum-green-500 rounded-3xl blur-xl transition-opacity duration-500 ${
              selectedCard === '/it' ? 'opacity-40' : 'opacity-20 group-hover:opacity-40'
            }`} />
            <div className={`relative bg-neutral-900/90 border rounded-3xl p-8 md:p-10 backdrop-blur-md transition-all duration-500 ${
              selectedCard === '/it' ? 'border-prodyum-blue-500 scale-105 shadow-2xl shadow-prodyum-blue-500/30' : 'border-prodyum-blue-500/30 hover:border-prodyum-blue-500/60 hover:shadow-2xl hover:shadow-prodyum-blue-500/20'
            }`}>
              {/* Selected Indicator */}
              {selectedCard === '/it' && (
                <div className="absolute -top-2 -right-2 h-6 w-6 bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 rounded-full flex items-center justify-center animate-in zoom-in">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
              
              <div className="flex items-center justify-center mb-6">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-prodyum-blue-500 to-prodyum-green-500 flex items-center justify-center transition-transform duration-300 ${
                  selectedCard === '/it' ? 'scale-110' : 'group-hover:scale-110'
                }`}>
                  <Monitor className="h-10 w-10 text-white" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">ProDyum IT</h2>
              <p className="text-gray-400 mb-6">Pvt Ltd</p>
              <p className="text-gray-300 mb-8">
                Digital Marketing, Branding & Design, Web Development, and Multimedia Solutions.
              </p>
              <div className="flex items-center justify-center">
                <Button
                  className={`bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 text-white hover:from-prodyum-blue-600 hover:to-prodyum-green-600 font-semibold px-8 py-6 transition-all duration-300 ${
                    selectedCard === '/it' ? 'shadow-lg' : ''
                  }`}
                >
                  Explore
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>

          {/* ProDyum Entertainments Card */}
          <div 
            onClick={() => handleCardClick('/entertainment')}
            className={`group relative cursor-pointer transition-all duration-500 ${
              selectedCard === '/entertainment' ? 'scale-105' : ''
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br from-prodyum-green-500 to-prodyum-lime-500 rounded-3xl blur-xl transition-opacity duration-500 ${
              selectedCard === '/entertainment' ? 'opacity-40' : 'opacity-20 group-hover:opacity-40'
            }`} />
            <div className={`relative bg-neutral-900/90 border rounded-3xl p-8 md:p-10 backdrop-blur-md transition-all duration-500 ${
              selectedCard === '/entertainment' ? 'border-prodyum-lime-500 scale-105 shadow-2xl shadow-prodyum-lime-500/30' : 'border-prodyum-lime-500/30 hover:border-prodyum-lime-500/60 hover:shadow-2xl hover:shadow-prodyum-lime-500/20'
            }`}>
              {/* Selected Indicator */}
              {selectedCard === '/entertainment' && (
                <div className="absolute -top-2 -right-2 h-6 w-6 bg-gradient-to-r from-prodyum-green-500 to-prodyum-lime-500 rounded-full flex items-center justify-center animate-in zoom-in">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
              
              <div className="flex items-center justify-center mb-6">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-prodyum-green-500 to-prodyum-lime-500 flex items-center justify-center transition-transform duration-300 ${
                  selectedCard === '/entertainment' ? 'scale-110' : 'group-hover:scale-110'
                }`}>
                  <Film className="h-10 w-10 text-black" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">ProDyum Entertainments</h2>
              <p className="text-gray-400 mb-6">&nbsp;</p>
              <p className="text-gray-300 mb-8">
                Movies, Web Series, Short Films, and Digital Media Production.
              </p>
              <div className="flex items-center justify-center">
                <Button
                  className={`bg-gradient-to-r from-prodyum-green-500 to-prodyum-lime-500 text-black hover:from-prodyum-green-600 hover:to-prodyum-lime-600 font-semibold px-8 py-6 transition-all duration-300 ${
                    selectedCard === '/entertainment' ? 'shadow-lg' : ''
                  }`}
                >
                  Explore
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} ProDyum. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
