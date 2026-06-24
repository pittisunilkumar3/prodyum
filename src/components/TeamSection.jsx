import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { teamMembers } from '../mock';
import { Linkedin, Mail } from 'lucide-react';
import ScrollReveal from './animation/ScrollReveal';

const TeamSection = () => {
  return (
    <section className="relative overflow-hidden py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute right-1/4 top-0 h-72 w-72 rounded-full bg-prodyum-green-500/15 blur-3xl" />
        <div className="absolute left-1/4 bottom-0 h-72 w-72 rounded-full bg-prodyum-blue-500/15 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-16 text-center">
          <span className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 bg-clip-text text-sm font-semibold uppercase tracking-[0.2em] text-transparent">
            Our Team
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-gradient-animated md:text-5xl">
            Meet the Cast &amp; Crew
          </h2>
          <div className="mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500" />
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-300">
            Talented professionals dedicated to bringing your vision to life
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <ScrollReveal key={member.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative"
                data-cursor-label="Profile"
              >
                {/* holographic glow behind */}
                <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-br from-prodyum-blue-500/20 via-prodyum-green-500/10 to-prodyum-lime-500/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                <Card className="relative overflow-hidden rounded-3xl glass-panel gradient-border transition-all duration-500 group-hover:border-prodyum-green-500/40">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=050505&color=ffffff&size=400`;
                      }}
                    />
                    {/* cinematic gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
                    {/* brand light sweep on hover */}
                    <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-prodyum-green-500/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                    {/* name + role */}
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="font-display text-2xl font-bold text-white transition-colors duration-300 group-hover:text-prodyum-lime-400">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-prodyum-green-400">{member.role}</p>

                      {/* socials reveal */}
                      <div className="mt-3 flex gap-3 opacity-0 transition-all duration-500 group-hover:opacity-100">
                        <a
                          href="#"
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-gradient-to-br hover:from-prodyum-blue-500 hover:to-prodyum-green-500"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                        <a
                          href="#"
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-gradient-to-br hover:from-prodyum-blue-500 hover:to-prodyum-green-500"
                          aria-label={`${member.name} Email`}
                        >
                          <Mail className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* bio */}
                  <div className="p-6">
                    <p className="text-sm leading-relaxed text-gray-300">{member.bio}</p>
                  </div>
                </Card>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
