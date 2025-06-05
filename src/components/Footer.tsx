import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <Briefcase className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-white">JobHub</span>
            </Link>
            <p className="mt-4 text-sm text-gray-300">
              Connecting talent with opportunity. Find your dream job or the perfect candidate today.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              For Job Seekers
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/jobs" className="text-gray-400 hover:text-white">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-white">
                  My Applications
                </Link>
              </li>
              <li>
                <Link to="/saved-jobs" className="text-gray-400 hover:text-white">
                  Saved Jobs
                </Link>
              </li>
              <li>
                <Link to="/career-advice" className="text-gray-400 hover:text-white">
                  Career Advice
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              For Employers
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/post-job" className="text-gray-400 hover:text-white">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-white">
                  Employer Resources
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-400 hover:text-white">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start">
                <Mail size={20} className="flex-shrink-0 mr-3 text-gray-400" />
                <span className="text-gray-400">support@jobhub.com</span>
              </li>
              <li className="flex items-start">
                <Phone size={20} className="flex-shrink-0 mr-3 text-gray-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Send a Message
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-base text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} JobHub. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-gray-400 hover:text-white">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/accessibility" className="text-gray-400 hover:text-white">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};