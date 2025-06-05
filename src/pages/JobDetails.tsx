import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { getJobById } from '../lib/mockData';
import { useAuth } from '../context/AuthContext';
import { formatDate, pageTransition } from '../lib/utils';
import { 
  MapPin, Briefcase, DollarSign, Calendar, Globe, Building, 
  CheckCircle, ArrowLeft, BookmarkPlus, Share2 
} from 'lucide-react';

export const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const job = getJobById(id || '');
  
  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
        <p className="text-gray-600 mb-8">The job listing you're looking for doesn't exist or has been removed.</p>
        <Button as={Link} to="/jobs" variant="primary">
          Browse All Jobs
        </Button>
      </div>
    );
  }
  
  const handleApply = () => {
    if (!user) {
      navigate('/login', { state: { from: `/jobs/${id}/apply` } });
      return;
    }
    navigate(`/jobs/${id}/apply`);
  };
  
  const handleSaveJob = () => {
    if (!user) {
      navigate('/login', { state: { from: `/jobs/${id}` } });
      return;
    }
    // In a real app, this would save the job to the user's saved jobs
    alert('Job saved successfully!');
  };

  return (
    <motion.div className="bg-gray-50 min-h-screen py-8" {...pageTransition}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button 
            as={Link} 
            to="/jobs" 
            variant="ghost" 
            className="mb-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Jobs
          </Button>
          
          {/* Header Card */}
          <motion.div 
            className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start">
                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <img 
                    src={job.company.logo} 
                    alt={job.company.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                        {job.title}
                      </h1>
                      <div className="flex items-center mb-4">
                        <Link 
                          to={`/companies/${job.company.id}`} 
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {job.company.name}
                        </Link>
                      </div>
                    </div>
                    
                    <div className="flex mt-4 md:mt-0">
                      <Button
                        onClick={handleSaveJob}
                        variant="outline"
                        className="mr-2"
                      >
                        <BookmarkPlus size={16} className="mr-2" />
                        Save
                      </Button>
                      <Button
                        variant="outline"
                      >
                        <Share2 size={16} className="mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-gray-600">
                      <MapPin size={18} className="mr-2 text-gray-400" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Briefcase size={18} className="mr-2 text-gray-400" />
                      <Badge variant={job.type === 'Full-time' ? 'default' : job.type === 'Remote' ? 'success' : 'secondary'}>
                        {job.type}
                      </Badge>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign size={18} className="mr-2 text-gray-400" />
                      {job.salary}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar size={18} className="mr-2 text-gray-400" />
                      Posted {formatDate(job.postedAt)}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={handleApply} 
                    variant="primary" 
                    size="lg" 
                    className="w-full md:w-auto"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Job Description Section */}
            <div className="md:col-span-2">
              <motion.div 
                className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="p-6 md:p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
                  <p className="text-gray-700 mb-6 whitespace-pre-line">
                    {job.description}
                  </p>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                  <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="ml-4">
                        <span className="ml-2">{req}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Responsibilities</h3>
                  <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index} className="ml-4">
                        <span className="ml-2">{resp}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <Button 
                      onClick={handleApply} 
                      variant="primary" 
                      size="lg" 
                      className="mr-4"
                    >
                      Apply Now
                    </Button>
                    <Button 
                      onClick={handleSaveJob} 
                      variant="outline" 
                      size="lg"
                    >
                      Save Job
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Company Info Section */}
            <div className="md:col-span-1">
              <motion.div 
                className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">About the Company</h2>
                  
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 mr-3">
                      <img 
                        src={job.company.logo} 
                        alt={job.company.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{job.company.name}</h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{job.company.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Building size={18} className="mr-2 text-gray-400" />
                      {job.company.location}
                    </div>
                    {job.company.website && (
                      <div className="flex items-center text-gray-600">
                        <Globe size={18} className="mr-2 text-gray-400" />
                        <a 
                          href={job.company.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Company Website
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    as={Link}
                    to={`/companies/${job.company.id}`}
                    variant="outline" 
                    fullWidth
                  >
                    View Company Profile
                  </Button>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Job Details</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Job Type</h3>
                      <p className="font-medium text-gray-900">{job.type}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Experience Level</h3>
                      <p className="font-medium text-gray-900">{job.experience}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Salary Range</h3>
                      <p className="font-medium text-gray-900">{job.salary}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Posted Date</h3>
                      <p className="font-medium text-gray-900">{formatDate(job.postedAt)}</p>
                    </div>
                    {job.deadline && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Application Deadline</h3>
                        <p className="font-medium text-gray-900">{formatDate(job.deadline)}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Similar Jobs Section */}
          <motion.div 
            className="bg-white rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Similar Jobs You Might Like</h2>
              
              <div className="space-y-4">
                {getFilteredJobs('', job.type).slice(0, 3).filter(j => j.id !== job.id).map((similarJob) => (
                  <div key={similarJob.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 mr-3">
                        <img 
                          src={similarJob.company.logo} 
                          alt={similarJob.company.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <Link 
                          to={`/jobs/${similarJob.id}`} 
                          className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                        >
                          {similarJob.title}
                        </Link>
                        <p className="text-sm text-gray-600">{similarJob.company.name}</p>
                        <div className="flex flex-wrap items-center mt-1 text-sm text-gray-500">
                          <span className="flex items-center mr-4">
                            <MapPin size={14} className="mr-1" />
                            {similarJob.location}
                          </span>
                          <span className="flex items-center">
                            <Briefcase size={14} className="mr-1" />
                            {similarJob.type}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <Button
                          as={Link}
                          to={`/jobs/${similarJob.id}`}
                          variant="outline"
                          size="sm"
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button 
                  as={Link} 
                  to="/jobs" 
                  variant="outline"
                >
                  View All Jobs
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};