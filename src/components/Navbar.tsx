import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';
import { Briefcase, Menu, X, ChevronDown, LogOut, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  
  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  const menuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    open: { 
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const profileMenuVariants = {
    closed: { 
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    open: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: "easeInOut" }
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main nav */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <Briefcase className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">JobHub</span>
              </Link>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                to="/jobs" 
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                Find Jobs
              </Link>
              {user?.role === 'recruiter' && (
                <Link 
                  to="/post-job" 
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  Post a Job
                </Link>
              )}
              <Link 
                to="/about" 
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                About
              </Link>
            </div>
          </div>
          
          {/* User section */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={toggleProfile}
                  >
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={user.avatar || 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150'}
                        alt={user.name}
                      />
                      <span className="ml-2 text-gray-700">{user.name}</span>
                      <ChevronDown size={16} className="ml-1 text-gray-500" />
                    </div>
                  </button>
                </div>
                
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={profileMenuVariants}
                    >
                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <User size={16} className="mr-2" />
                          Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <LogOut size={16} className="mr-2" />
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Button
                  as={Link}
                  to="/login"
                  variant="outline"
                  size="sm"
                >
                  Log in
                </Button>
                <Button
                  as={Link}
                  to="/register"
                  variant="primary"
                  size="sm"
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="sm:hidden overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/jobs"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Jobs
              </Link>
              {user?.role === 'recruiter' && (
                <Link
                  to="/post-job"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Post a Job
                </Link>
              )}
              <Link
                to="/about"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </div>
            
            {/* Mobile user section */}
            <div className="pt-4 pb-3 border-t border-gray-200">
              {user ? (
                <>
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={user.avatar || 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150'}
                        alt={user.name}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">{user.name}</div>
                      <div className="text-sm font-medium text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Link
                      to="/dashboard"
                      className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-3 space-y-1 px-4">
                  <Button
                    as={Link}
                    to="/login"
                    variant="outline"
                    size="sm"
                    fullWidth
                    className="mb-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log in
                  </Button>
                  <Button
                    as={Link}
                    to="/register"
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign up
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};