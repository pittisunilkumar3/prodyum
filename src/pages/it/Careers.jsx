import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  Heart,
  Zap,
  GraduationCap,
  Building2,
  Send,
  CheckCircle2
} from 'lucide-react';

const CareersSection = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  const benefits = [
    { icon: Zap, title: 'Growth Opportunities', description: 'Continuous learning and career advancement' },
    { icon: Heart, title: 'Work-Life Balance', description: 'Flexible working hours and remote options' },
    { icon: Users, title: 'Team Culture', description: 'Collaborative and supportive environment' },
    { icon: GraduationCap, title: 'Learning Budget', description: 'Access to courses and certifications' }
  ];

  const jobs = [
    {
      id: 1,
      title: 'Digital Marketing & UI/UX Trainee',
      department: 'Marketing & Design',
      location: 'Hyderabad',
      type: 'Full-time',
      experience: '0-1 years',
      description: 'We are looking for passionate individuals who want to build innovative digital solutions.',
      responsibilities: [
        'Assist in creating and managing digital marketing campaigns',
        'Support UI/UX design projects',
        'Learn and implement SEO best practices',
        'Contribute to social media management'
      ],
      requirements: [
        'Bachelor\'s degree in Marketing, Design, or related field',
        'Basic understanding of digital marketing concepts',
        'Interest in UI/UX design',
        'Good communication skills'
      ]
    },
    {
      id: 2,
      title: 'HR & Operations Executive',
      department: 'Human Resources',
      location: 'Hyderabad',
      type: 'Full-time',
      experience: '1-3 years',
      description: 'We are seeking an HR professional to manage our human resources operations.',
      responsibilities: [
        'Manage end-to-end recruitment process',
        'Handle employee onboarding and documentation',
        'Organize team events and activities',
        'Support day-to-day office operations'
      ],
      requirements: [
        'Bachelor\'s degree in HR or related field',
        '1-3 years of HR experience',
        'Strong interpersonal skills',
        'Proficiency in MS Office and HR software'
      ]
    },
    {
      id: 3,
      title: 'Senior Creative Specialist',
      department: 'Creative',
      location: 'Hyderabad',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'We are looking for a creative professional to lead our design projects.',
      responsibilities: [
        'Lead creative design projects from concept to delivery',
        'Create brand identities, logos, and marketing materials',
        'Develop UI/UX designs for websites and applications',
        'Mentor junior designers'
      ],
      requirements: [
        '3-5 years of experience in graphic design',
        'Proficiency in Adobe Creative Suite and Figma',
        'Strong portfolio showcasing branding and UI/UX work',
        'Excellent communication skills'
      ]
    }
  ];

  return (
    <section id="careers" className="scroll-mt-24">
      {/* Section Heading */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
          <Briefcase className="h-4 w-4 text-prodyum-green-400" />
          <span className="text-gray-300 text-sm">Join Our Team</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Work With <span className="bg-gradient-to-r from-prodyum-blue-400 to-prodyum-green-400 bg-clip-text text-transparent">Us</span>
        </h2>
        <p className="text-xl text-gray-300 leading-relaxed">
          Join ProDyum IT Pvt Ltd and be part of a growing team working in Digital Marketing,
          Technology, and Creative Media.
        </p>
      </div>

      {/* Why Join Us */}
      <div className="py-16 lg:py-20 bg-gray-900/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 bg-prodyum-blue-500/10 border border-prodyum-blue-500/20 rounded-full px-4 py-2 mb-6">
              <Heart className="h-4 w-4 text-prodyum-blue-400" />
              <span className="text-prodyum-blue-400 text-sm font-medium">Why Join Us</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Build Your Career With Us
            </h3>
            <p className="text-xl text-gray-400">
              We are always looking for passionate individuals who want to build innovative
              digital solutions and grow their careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-black/50 border border-white/10 rounded-2xl p-8 text-center hover:border-prodyum-blue-500/50 transition-all duration-300 group"
              >
                <div className="h-16 w-16 bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-8 w-8 text-prodyum-blue-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{benefit.title}</h4>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current Openings */}
      <div className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 bg-prodyum-green-500/10 border border-prodyum-green-500/20 rounded-full px-4 py-2 mb-6">
              <Briefcase className="h-4 w-4 text-prodyum-green-400" />
              <span className="text-prodyum-green-400 text-sm font-medium">Current Opportunities</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Open Positions
            </h3>
            <p className="text-xl text-gray-400">
              Explore our current job openings and find the perfect role for you
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-gray-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-prodyum-green-500/50 transition-all duration-300"
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{job.title}</h4>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <Button
                      className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 text-white hover:from-prodyum-blue-600 hover:to-prodyum-green-600"
                    >
                      {selectedJob === job.id ? 'Close' : 'View Details'}
                    </Button>
                  </div>
                </div>

                {selectedJob === job.id && (
                  <div className="border-t border-white/10 p-6 bg-gray-900/60">
                    <p className="text-gray-300 mb-6">{job.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold text-white mb-4">Responsibilities</h4>
                        <ul className="space-y-3">
                          {job.responsibilities.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-prodyum-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-400">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-4">Requirements</h4>
                        <ul className="space-y-3">
                          {job.requirements.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-prodyum-blue-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-400">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-gray-400">
                          <span className="font-medium text-white">Experience:</span> {job.experience}
                        </p>
                        <Button
                          asChild
                          className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 text-white hover:from-prodyum-blue-600 hover:to-prodyum-green-600"
                        >
                          <a href={`mailto:hr@prodyum.in?subject=Application for ${job.title}`} className="flex items-center gap-2">
                            Apply Now <Send className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How to Apply */}
      <div className="py-16 lg:py-24 bg-gray-900/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/50 border border-white/10 rounded-3xl p-8 md:p-12 text-center">
              <div className="h-16 w-16 bg-gradient-to-br from-prodyum-blue-500/20 to-prodyum-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Send className="h-8 w-8 text-prodyum-blue-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">How to Apply</h3>
              <p className="text-gray-400 text-lg mb-8">
                Send your resume to start your journey with us
              </p>

              <div className="bg-gray-900/50 rounded-2xl p-6 inline-block">
                <p className="text-gray-400 mb-4">Email your resume to:</p>
                <a
                  href="mailto:hr@prodyum.in"
                  className="text-2xl font-bold bg-gradient-to-r from-prodyum-blue-400 to-prodyum-green-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                >
                  hr@prodyum.in
                </a>
                <p className="text-gray-500 text-sm mt-4">
                  Please include the position title in your email subject line
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="font-bold text-white mb-4">What to include in your application:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
                  {['Updated Resume/CV', 'Portfolio (if applicable)', 'Cover Letter (optional)', 'LinkedIn Profile'].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-left">
                      <CheckCircle2 className="h-5 w-5 text-prodyum-green-500 flex-shrink-0" />
                      <span className="text-gray-400">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersSection;
