import React from 'react';
import { Card, CardContent } from './ui/card';
import { teamMembers } from '../mock';
import { Linkedin, Mail } from 'lucide-react';

const TeamSection = () => {
  return (
    <section className="py-32 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 text-transparent bg-clip-text text-sm font-semibold uppercase tracking-wider">Our Team</span>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-prodyum-blue-400 via-prodyum-green-400 to-prodyum-lime-400 text-transparent bg-clip-text mt-4 mb-6">Meet the Production Team</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500 mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Talented professionals dedicated to bringing your vision to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={member.id}
              className="bg-gradient-to-br from-prodyum-blue-500/5 via-prodyum-green-500/5 to-black border-prodyum-blue-500/30 overflow-hidden group hover:border-prodyum-green-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-prodyum-green-500/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:bg-gradient-to-r group-hover:from-prodyum-blue-400 group-hover:to-prodyum-green-400 group-hover:text-transparent group-hover:bg-clip-text transition-all">{member.name}</h3>
                  <p className="text-prodyum-green-400 text-sm font-semibold mb-3">{member.role}</p>
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gradient-to-br hover:from-prodyum-blue-500 hover:to-prodyum-green-500 hover:text-white transition-all duration-300 hover:scale-110"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gradient-to-br hover:from-prodyum-blue-500 hover:to-prodyum-green-500 hover:text-white transition-all duration-300 hover:scale-110"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-300 text-sm leading-relaxed">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;