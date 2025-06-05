import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { getApplicationsByUserId, getJobById, mockJobs } from '../lib/mockData';
import { formatDate, pageTransition } from '../lib/utils';
import { 
  User as UserIcon, Briefcase, CheckCircle, Building, Plus, 
  FileText, BookmarkPlus, Settings, Clock
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'applications' | 'profile'>('overview');
  
  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // Get applications for job seeker
  const applications = user.role === 'jobseeker' ? getApplicationsByUserId(user.id) : [];
  
  // Get posted jobs for recruiter (using mock data)
  const postedJobs = user.role === 'recruiter' ? mockJobs.slice(0, 3) : [];
  
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'reviewed':
        return 'default';
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'danger';
      default:
        return 'default';
    }
  };
  
  return (
    <motion.div className="bg-gray-50 min-h-screen py-8" {...pageTransition}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user.name}!</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <Card>
              <CardContent className="p-0">
                <div className="py-6 px-4 flex flex-col items-center border-b border-gray-200">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                    <img 
                      src={user.avatar || 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150'} 
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  <Badge 
                    variant={user.role === 'jobseeker' ? 'default' : 'secondary'} 
                    className="mt-2"
                  >
                    {user.role === 'jobseeker' ? 'Job Seeker' : 'Recruiter'}
                  </Badge>
                </div>
                
                <nav className="py-4">
                  <ul>
                    <li>
                      <button
                        className={`w-full flex items-center px-4 py-3 text-left ${
                          activeTab === 'overview' 
                            ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => setActiveTab('overview')}
                      >
                        <Briefcase size={18} className="mr-3" />
                        Overview
                      </button>
                    </li>
                    {user.role === 'jobseeker' ? (
                      <li>
                        <button
                          className={`w-full flex items-center px-4 py-3 text-left ${
                            activeTab === 'applications' 
                              ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => setActiveTab('applications')}
                        >
                          <FileText size={18} className="mr-3" />
                          Applications
                        </button>
                      </li>
                    ) : (
                      <li>
                        <button
                          className={`w-full flex items-center px-4 py-3 text-left ${
                            activeTab === 'jobs' 
                              ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => setActiveTab('jobs')}
                        >
                          <Briefcase size={18} className="mr-3" />
                          Posted Jobs
                        </button>
                      </li>
                    )}
                    <li>
                      <button
                        className={`w-full flex items-center px-4 py-3 text-left ${
                          activeTab === 'profile' 
                            ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => setActiveTab('profile')}
                      >
                        <UserIcon size={18} className="mr-3" />
                        My Profile
                      </button>
                    </li>
                  </ul>
                </nav>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="flex-grow">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {user.role === 'jobseeker' ? (
                    <>
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                              <FileText size={24} />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{applications.length}</h3>
                              <p className="text-gray-600">Applications</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                              <CheckCircle size={24} />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {applications.filter(a => a.status === 'accepted').length}
                              </h3>
                              <p className="text-gray-600">Accepted</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-center">
                            <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
                              <BookmarkPlus size={24} />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">0</h3>
                              <p className="text-gray-600">Saved Jobs</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  ) : (
                    <>
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                              <Briefcase size={24} />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{postedJobs.length}</h3>
                              <p className="text-gray-600">Posted Jobs</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                              <UserIcon size={24} />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">12</h3>
                              <p className="text-gray-600">Total Applicants</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-center">
                            <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
                              <Clock size={24} />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">2</h3>
                              <p className="text-gray-600">Pending Review</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
                
                {user.role === 'jobseeker' ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {applications.length > 0 ? (
                        <div className="space-y-4">
                          {applications.map((application) => {
                            const job = getJobById(application.jobId);
                            if (!job) return null;
                            
                            return (
                              <div key={application.id} className="flex items-start border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                                <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 mr-3">
                                  <img 
                                    src={job.company.logo} 
                                    alt={job.company.name} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-grow">
                                  <h3 className="font-medium text-gray-900">{job.title}</h3>
                                  <p className="text-sm text-gray-600">{job.company.name}</p>
                                  <div className="flex items-center mt-1">
                                    <Badge variant={getStatusBadgeVariant(application.status)}>
                                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                    </Badge>
                                    <span className="text-xs text-gray-500 ml-2">
                                      Applied on {formatDate(application.appliedAt)}
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <Button
                                    as={Link}
                                    to={`/jobs/${job.id}`}
                                    variant="outline"
                                    size="sm"
                                  >
                                    View Job
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-600 mb-4">You haven't applied to any jobs yet.</p>
                          <Button as={Link} to="/jobs" variant="primary">
                            Browse Jobs
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Your Job Listings</CardTitle>
                      <Button as={Link} to="/post-job" variant="primary" size="sm">
                        <Plus size={16} className="mr-1" />
                        Post a Job
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {postedJobs.length > 0 ? (
                        <div className="space-y-4">
                          {postedJobs.map((job) => (
                            <div key={job.id} className="flex items-start border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                              <div className="flex-grow">
                                <h3 className="font-medium text-gray-900">{job.title}</h3>
                                <div className="flex items-center mt-1">
                                  <Badge variant={job.type === 'Full-time' ? 'default' : 'secondary'}>
                                    {job.type}
                                  </Badge>
                                  <span className="text-xs text-gray-500 ml-2">
                                    Posted on {formatDate(job.postedAt)}
                                  </span>
                                  <span className="text-xs text-gray-500 ml-2">
                                    4 applicants
                                  </span>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  as={Link}
                                  to={`/jobs/${job.id}/applicants`}
                                  variant="outline"
                                  size="sm"
                                >
                                  View Applicants
                                </Button>
                                <Button
                                  as={Link}
                                  to={`/jobs/${job.id}/edit`}
                                  variant="outline"
                                  size="sm"
                                >
                                  Edit
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-600 mb-4">You haven't posted any jobs yet.</p>
                          <Button as={Link} to="/post-job" variant="primary">
                            Post Your First Job
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended for You</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {user.role === 'jobseeker' ? (
                      <div className="space-y-4">
                        {mockJobs.slice(0, 3).map((job) => (
                          <div key={job.id} className="flex items-start border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                            <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 mr-3">
                              <img 
                                src={job.company.logo} 
                                alt={job.company.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <h3 className="font-medium text-gray-900">{job.title}</h3>
                              <p className="text-sm text-gray-600">{job.company.name} • {job.location}</p>
                              <p className="text-sm text-gray-600 mt-1">{job.salary}</p>
                            </div>
                            <div>
                              <Button
                                as={Link}
                                to={`/jobs/${job.id}`}
                                variant="outline"
                                size="sm"
                              >
                                View
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
                          <h3 className="text-lg font-medium text-blue-800 mb-2">
                            Boost Your Job Posting
                          </h3>
                          <p className="text-blue-700 mb-4">
                            Get 3x more visibility and reach more qualified candidates.
                          </p>
                          <Button variant="primary">
                            Upgrade Now
                          </Button>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
                          <h3 className="text-lg font-medium text-gray-800 mb-2">
                            Complete Your Company Profile
                          </h3>
                          <p className="text-gray-700 mb-4">
                            Attract better candidates by showcasing your company culture and benefits.
                          </p>
                          <Button variant="outline">
                            Update Profile
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Applications Tab for Job Seekers */}
            {activeTab === 'applications' && user.role === 'jobseeker' && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  {applications.length > 0 ? (
                    <div className="space-y-6">
                      {applications.map((application) => {
                        const job = getJobById(application.jobId);
                        if (!job) return null;
                        
                        return (
                          <div key={application.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                            <div className="flex items-start">
                              <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 mr-4">
                                <img 
                                  src={job.company.logo} 
                                  alt={job.company.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-grow">
                                <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                                <p className="text-gray-600">{job.company.name} • {job.location}</p>
                                <div className="flex items-center mt-2">
                                  <Badge variant={getStatusBadgeVariant(application.status)}>
                                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                  </Badge>
                                  <span className="text-sm text-gray-500 ml-2">
                                    Applied on {formatDate(application.appliedAt)}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-4 flex flex-col space-y-2">
                                <Button
                                  as={Link}
                                  to={`/jobs/${job.id}`}
                                  variant="outline"
                                  size="sm"
                                >
                                  View Job
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                >
                                  Withdraw
                                </Button>
                              </div>
                            </div>
                            
                            <div className="mt-4 pl-16">
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Application Details</h4>
                              <div className="bg-gray-50 p-3 rounded-md">
                                <div className="flex items-center text-sm text-gray-600 mb-2">
                                  <FileText size={16} className="mr-2 text-gray-500" />
                                  Resume: {application.resume}
                                </div>
                                {application.coverLetter && (
                                  <p className="text-sm text-gray-600">
                                    <span className="font-medium">Cover Letter:</span> {application.coverLetter}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">You haven't applied to any jobs yet.</p>
                      <Button as={Link} to="/jobs" variant="primary">
                        Browse Jobs
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            {/* Posted Jobs Tab for Recruiters */}
            {activeTab === 'jobs' && user.role === 'recruiter' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Your Job Listings</h2>
                  <Button as={Link} to="/post-job" variant="primary">
                    <Plus size={16} className="mr-2" />
                    Post a Job
                  </Button>
                </div>
                
                {postedJobs.length > 0 ? (
                  <div className="space-y-4">
                    {postedJobs.map((job) => (
                      <Card key={job.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-start">
                            <div className="flex-grow mb-4 md:mb-0">
                              <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                              <p className="text-gray-600">{job.type} • {job.location}</p>
                              <div className="flex items-center mt-2">
                                <Badge variant="default">
                                  {job.type}
                                </Badge>
                                <span className="text-sm text-gray-500 ml-2">
                                  Posted on {formatDate(job.postedAt)}
                                </span>
                                {job.deadline && (
                                  <span className="text-sm text-gray-500 ml-2">
                                    Deadline: {formatDate(job.deadline)}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                              <Button
                                as={Link}
                                to={`/jobs/${job.id}/applicants`}
                                variant="primary"
                                size="sm"
                              >
                                View Applicants (4)
                              </Button>
                              <Button
                                as={Link}
                                to={`/jobs/${job.id}/edit`}
                                variant="outline"
                                size="sm"
                              >
                                Edit Job
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                Delete Job
                              </Button>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Job Statistics</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="bg-gray-50 p-3 rounded-md text-center">
                                <p className="text-2xl font-semibold text-gray-900">142</p>
                                <p className="text-xs text-gray-600">Views</p>
                              </div>
                              <div className="bg-gray-50 p-3 rounded-md text-center">
                                <p className="text-2xl font-semibold text-gray-900">12</p>
                                <p className="text-xs text-gray-600">Applicants</p>
                              </div>
                              <div className="bg-gray-50 p-3 rounded-md text-center">
                                <p className="text-2xl font-semibold text-gray-900">8</p>
                                <p className="text-xs text-gray-600">Qualified</p>
                              </div>
                              <div className="bg-gray-50 p-3 rounded-md text-center">
                                <p className="text-2xl font-semibold text-gray-900">2</p>
                                <p className="text-xs text-gray-600">Interviews</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Building size={48} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs posted yet</h3>
                      <p className="text-gray-600 mb-6">
                        Start attracting the best talent by posting your first job.
                      </p>
                      <Button 
                        as={Link}
                        to="/post-job"
                        variant="primary"
                      >
                        Post Your First Job
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle>My Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="mb-4 md:mb-0 md:mr-6">
                        <div className="w-24 h-24 rounded-full overflow-hidden">
                          <img 
                            src={user.avatar || 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150'} 
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-gray-900 mb-1">{user.name}</h3>
                        <p className="text-gray-600 mb-4">{user.email}</p>
                        <Button variant="outline" size="sm">
                          Change Photo
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={user.name}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={user.email}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            placeholder="Your phone number"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            placeholder="City, State"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {user.role === 'jobseeker' && (
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h3>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Professional Title
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Frontend Developer"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Bio
                            </label>
                            <textarea
                              rows={4}
                              placeholder="A brief description of yourself"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Resume
                            </label>
                            <div className="mt-1 flex items-center">
                              <Button variant="outline" size="sm">
                                Upload Resume
                              </Button>
                              <span className="ml-3 text-sm text-gray-500">No file uploaded</span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Skills
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. JavaScript, React, CSS"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <p className="mt-1 text-sm text-gray-500">
                              Separate skills with commas
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {user.role === 'recruiter' && (
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Company Name
                            </label>
                            <input
                              type="text"
                              placeholder="Your company's name"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Company Website
                            </label>
                            <input
                              type="url"
                              placeholder="https://example.com"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Company Description
                            </label>
                            <textarea
                              rows={4}
                              placeholder="Tell candidates about your company"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Company Logo
                            </label>
                            <div className="mt-1 flex items-center">
                              <Button variant="outline" size="sm">
                                Upload Logo
                              </Button>
                              <span className="ml-3 text-sm text-gray-500">No file uploaded</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="email-notifications"
                              name="email-notifications"
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              defaultChecked
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="email-notifications" className="font-medium text-gray-700">
                              Email notifications
                            </label>
                            <p className="text-gray-500">
                              Receive email updates about your account activity.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="marketing-emails"
                              name="marketing-emails"
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              defaultChecked
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="marketing-emails" className="font-medium text-gray-700">
                              Marketing emails
                            </label>
                            <p className="text-gray-500">
                              Receive tips, product updates and industry news.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-6">
                      <Button variant="outline">
                        Cancel
                      </Button>
                      <Button variant="primary">
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};