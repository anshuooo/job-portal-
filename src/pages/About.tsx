import React from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '../lib/utils';
import { Link } from 'react-router-dom';
import {
  Users, Briefcase, Globe,
  CheckCircle, Shield, Clock, Building
} from 'lucide-react';

export const About: React.FC = () => {
  const stats = [
    { icon: <Users className="h-8 w-8 text-blue-600" />, value: '1M+', label: 'Users' },
    { icon: <Building className="h-8 w-8 text-blue-600" />, value: '50K+', label: 'Companies' },
    { icon: <Briefcase className="h-8 w-8 text-blue-600" />, value: '200K+', label: 'Jobs Posted' },
    { icon: <Globe className="h-8 w-8 text-blue-600" />, value: '120+', label: 'Countries' },
  ];

  const features = [
    {
      icon: <CheckCircle className="text-green-600 w-6 h-6" />,
      title: 'AI-Powered Matching',
      description: 'Our intelligent system connects you with the right opportunities in seconds.'
    },
    {
      icon: <Shield className="text-blue-600 w-6 h-6" />,
      title: 'Verified Employers',
      description: 'We ensure every employer is authentic and trustworthy.'
    },
    {
      icon: <Clock className="text-indigo-600 w-6 h-6" />,
      title: 'Real-Time Alerts',
      description: 'Stay ahead with instant job notifications and updates.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Visionary leader with 15+ years in recruitment and HR tech.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Technology strategist building scalable career platforms.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      image: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Crafting intuitive, user-first experiences.'
    }
  ];

  return (
    <motion.div className="bg-white" {...pageTransition}>
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-20 text-center px-4">
        <h1 className="text-5xl font-bold">About Us</h1>
        <p className="mt-6 text-xl max-w-2xl mx-auto">
          Empowering individuals and businesses through smart, modern hiring solutions.
        </p>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-lg">
          To build a world where talent meets opportunity effortlessly, and every career journey is empowered by technology.
        </p>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-lg shadow text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mx-auto mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-900">Meet the Team</h2>
          <p className="text-gray-600 mt-4 mb-12">
            A passionate team committed to transforming job search and hiring.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-blue-600">{member.role}</p>
                <p className="text-gray-600 mt-2">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16 text-center text-white">
        <h2 className="text-3xl font-bold">Join Us Today</h2>
        <p className="mt-4 text-lg">
          Start your journey with a platform designed to elevate your career.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/register"
            className="bg-white text-blue-700 hover:bg-blue-100 px-6 py-3 rounded font-semibold transition"
          >
            Create Account
          </Link>
          <Link
            to="/contact"
            className="border border-white text-white hover:bg-white hover:text-blue-700 px-6 py-3 rounded font-semibold transition"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </motion.div>
  );
};