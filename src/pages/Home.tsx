import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SearchBar } from '../components/SearchBar';
import { JobCard } from '../components/JobCard';
import { Button } from '../components/ui/Button';
import { getFilteredJobs } from '../lib/mockData';
import { pageTransition } from '../lib/utils';
import { Briefcase, Users, Building, CheckCircle } from 'lucide-react';

export const Home: React.FC = () => {
  const [searchParams, setSearchParams] = React.useState({ term: '', location: '' });
  const featuredJobs = getFilteredJobs().slice(0, 3);

  const handleSearch = (query: { term: string; location: string }) => {
    setSearchParams(query);
    // In a real app, this would navigate to the jobs page with search params
  };

  const stats = [
    { icon: <Briefcase className="h-8 w-8 text-blue-600" />, value: '10,000+', label: 'Job Listings' },
    { icon: <Users className="h-8 w-8 text-blue-600" />, value: '5M+', label: 'Active Users' },
    { icon: <Building className="h-8 w-8 text-blue-600" />, value: '2,500+', label: 'Companies' },
    { icon: <CheckCircle className="h-8 w-8 text-blue-600" />, value: '87%', label: 'Success Rate' }
  ];

  const features = [
    {
      title: 'For Job Seekers',
      description: 'Find your dream job with powerful search tools, personalized job recommendations, and easy application process.',
      benefits: ['One-click applications', 'Track application status', 'Career insights', 'Personalized recommendations']
    },
    {
      title: 'For Employers',
      description: 'Reach qualified candidates faster, streamline your hiring process, and build your employer brand.',
      benefits: ['Target relevant candidates', 'Applicant tracking system', 'Employer branding tools', 'Analytics and reporting']
    }
  ];

  return (
    <motion.div {...pageTransition}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10 pattern-dots"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10">
              Connect with thousands of employers and discover opportunities that match your skills and career goals.
            </p>
            
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg max-w-4xl mx-auto">
              <SearchBar onSearch={handleSearch} large />
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button 
                as={Link} 
                to="/jobs" 
                variant="secondary" 
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50"
              >
                Explore All Jobs
              </Button>
              <Button 
                as={Link} 
                to="/post-job" 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-700"
              >
                Post a Job
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="mb-3">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm md:text-base text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Jobs Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Job Opportunities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover top positions from leading companies across various industries
            </p>
          </div>
          
          <div className="space-y-6">
            {featuredJobs.map((job) => (
              <motion.div 
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              as={Link} 
              to="/jobs" 
              variant="primary" 
              size="lg"
            >
              View All Jobs
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Simplest Way to Find & Post Jobs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform makes it easy for job seekers and employers to connect
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
                  <Button 
                    as={Link} 
                    to={index === 0 ? "/jobs" : "/post-job"} 
                    variant={index === 0 ? "primary" : "secondary"} 
                    size="md"
                  >
                    {index === 0 ? "Find Jobs" : "Post a Job"}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Take the Next Step in Your Career?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
            Join thousands of job seekers who have found their dream jobs on our platform
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              as={Link} 
              to="/register" 
              variant="secondary" 
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50"
            >
              Create an Account
            </Button>
            <Button 
              as={Link} 
              to="/jobs" 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-700"
            >
              Browse Jobs
            </Button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};