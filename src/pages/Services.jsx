import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { CheckCircle2, Film, Palette, Volume2, Zap } from 'lucide-react';
import { services } from '../mock';

const Services = () => {
  const productionServices = services.filter(s => s.category === 'Production');
  const postProductionServices = services.filter(s => s.category === 'Post-Production');
  const deliveryServices = services.filter(s => s.category === 'Delivery');

  return (
    <section id="services" className="bg-black scroll-mt-24 py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-prodyum-blue-400 via-prodyum-green-400 to-prodyum-lime-400 text-transparent bg-clip-text mb-6">Our Services</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500 mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We deliver end-to-end film production and a robust post-production workflow
          </p>
        </div>

        {/* Why ProDyum */}
        <div className="mb-20">
          <Card className="bg-gradient-to-br from-prodyum-blue-500/10 via-prodyum-green-500/5 to-black border-2 border-prodyum-blue-500/30 hover:border-prodyum-green-500/50 backdrop-blur-sm transition-all duration-500">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-prodyum-blue-400 to-prodyum-green-400 text-transparent bg-clip-text mb-8 text-center">Why Choose ProDyum?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-prodyum-blue-500/30 to-prodyum-green-500/30 mb-2 hover:scale-110 transition-transform duration-300">
                    <Film className="h-6 w-6 text-prodyum-green-400" />
                  </div>
                  <h3 className="text-white font-semibold">Cinema-First Creative</h3>
                  <p className="text-gray-300 text-sm">Story-driven approach with artistic excellence</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-prodyum-blue-500/30 to-prodyum-green-500/30 mb-2 hover:scale-110 transition-transform duration-300">
                    <CheckCircle2 className="h-6 w-6 text-prodyum-green-400" />
                  </div>
                  <h3 className="text-white font-semibold">Transparent Budgets</h3>
                  <p className="text-gray-300 text-sm">Clear milestone-based tracking and reporting</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-prodyum-blue-500/30 to-prodyum-green-500/30 mb-2 hover:scale-110 transition-transform duration-300">
                    <Zap className="h-6 w-6 text-prodyum-green-400" />
                  </div>
                  <h3 className="text-white font-semibold">Faster Turnaround</h3>
                  <p className="text-gray-300 text-sm">In-house pipeline ensures speed and quality</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-prodyum-blue-500/30 to-prodyum-green-500/30 mb-2 hover:scale-110 transition-transform duration-300">
                    <Palette className="h-6 w-6 text-prodyum-green-400" />
                  </div>
                  <h3 className="text-white font-semibold">Trusted Collaborators</h3>
                  <p className="text-gray-300 text-sm">Experienced team with proven track record</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Production Services */}
        <div className="mb-20">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-prodyum-blue-400 to-prodyum-green-400 text-transparent bg-clip-text mb-4">Production Services</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productionServices.map((service) => (
              <Card
                key={service.id}
                className="bg-gradient-to-br from-prodyum-blue-500/5 via-prodyum-green-500/5 to-black border-prodyum-blue-500/30 hover:border-prodyum-green-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-prodyum-green-500/20 group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-sm bg-gradient-to-r from-prodyum-blue-400 to-prodyum-green-400 text-transparent bg-clip-text font-semibold mb-2 uppercase tracking-wider">
                        {service.category}
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-prodyum-blue-400 group-hover:to-prodyum-green-400 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-300">
                        <CheckCircle2 className="h-4 w-4 text-prodyum-green-400 mr-3 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Post-Production Services */}
        <div className="mb-20">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-prodyum-blue-400 to-prodyum-green-400 text-transparent bg-clip-text mb-4">Post-Production Services</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {postProductionServices.map((service) => (
              <Card
                key={service.id}
                className="bg-gradient-to-br from-prodyum-blue-500/5 via-prodyum-green-500/5 to-black border-prodyum-blue-500/30 hover:border-prodyum-green-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-prodyum-green-500/20 group"
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Volume2 className="h-8 w-8 text-prodyum-green-400 mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-prodyum-blue-400 group-hover:to-prodyum-green-400 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-xs text-gray-400">
                        <CheckCircle2 className="h-3 w-3 text-prodyum-green-400 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Delivery Services */}
        <div>
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-prodyum-blue-400 to-prodyum-green-400 text-transparent bg-clip-text mb-4">Delivery & QC</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliveryServices.map((service) => (
              <Card
                key={service.id}
                className="bg-gradient-to-br from-prodyum-blue-500/5 via-prodyum-green-500/5 to-black border-prodyum-blue-500/30 hover:border-prodyum-green-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-prodyum-green-500/20 group"
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-prodyum-blue-400 group-hover:to-prodyum-green-400 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-xs text-gray-400">
                        <CheckCircle2 className="h-3 w-3 text-prodyum-green-400 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;