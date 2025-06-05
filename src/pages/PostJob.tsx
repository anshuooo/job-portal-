import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { pageTransition } from '../lib/utils';
import { 
  Briefcase, MapPin, DollarSign, Calendar, Building, 
  Upload, ChevronLeft, ChevronRight, CheckCircle
} from 'lucide-react';

export const PostJob: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not logged in or not a recruiter
  if (!user) {
    return <Navigate to="/login" state={{ from: '/post-job' }} />;
  }
  
  if (user.role !== 'recruiter') {
    return <Navigate to="/dashboard" />;
  }
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    company: {
      name: '',
      logo: 'https://images.pexels.com/photos/15013609/pexels-photo-15013609/free-photo-of-logo-of-a-tech-company.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    type: 'Full-time',
    location: '',
    salary: '',
    description: '',
    requirements: [''],
    responsibilities: [''],
    skills: [''],
    experience: '',
    deadline: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      company: {
        ...formData.company,
        [name]: value
      }
    });
  };
  
  const handleArrayChange = (fieldName: 'requirements' | 'responsibilities' | 'skills', index: number, value: string) => {
    const newArray = [...formData[fieldName]];
    newArray[index] = value;
    setFormData({ ...formData, [fieldName]: newArray });
  };
  
  const addArrayItem = (fieldName: 'requirements' | 'responsibilities' | 'skills') => {
    setFormData({
      ...formData,
      [fieldName]: [...formData[fieldName], '']
    });
  };
  
  const removeArrayItem = (fieldName: 'requirements' | 'responsibilities' | 'skills', index: number) => {
    const newArray = [...formData[fieldName]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [fieldName]: newArray });
  };
  
  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };
  
  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the job to an API
    console.log('Job submitted:', formData);
    navigate('/dashboard', { state: { jobPosted: true } });
  };
  
  return (
    <motion.div className="bg-gray-50 min-h-screen py-8" {...pageTransition}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Post a Job</h1>
          <p className="text-gray-600 mt-2">Attract qualified candidates for your open position</p>
        </div>
        
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step > 1 ? <CheckCircle size={16} /> : 1}
              </div>
              <div className={`ml-2 text-sm font-medium ${step >= 1 ? 'text-gray-900' : 'text-gray-500'}`}>
                Basic Info
              </div>
            </div>
            <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step > 2 ? <CheckCircle size={16} /> : 2}
              </div>
              <div className={`ml-2 text-sm font-medium ${step >= 2 ? 'text-gray-900' : 'text-gray-500'}`}>
                Description
              </div>
            </div>
            <div className={`flex-1 h-0.5 mx-4 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                3
              </div>
              <div className={`ml-2 text-sm font-medium ${step >= 3 ? 'text-gray-900' : 'text-gray-500'}`}>
                Preview
              </div>
            </div>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Job Information</h2>
                  
                  <div className="space-y-6">
                    <Input
                      label="Job Title"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Frontend Developer"
                      required
                      fullWidth
                    />
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job Type
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Remote">Remote</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                    
                    <Input
                      label="Location"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. San Francisco, CA or Remote"
                      required
                      fullWidth
                      icon={<MapPin size={18} className="text-gray-400" />}
                    />
                    
                    <Input
                      label="Salary Range"
                      id="salary"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      placeholder="e.g. $80,000 - $100,000"
                      required
                      fullWidth
                      icon={<DollarSign size={18} className="text-gray-400" />}
                    />
                    
                    <Input
                      label="Experience Level"
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="e.g. 3-5 years"
                      required
                      fullWidth
                    />
                    
                    <Input
                      label="Application Deadline"
                      id="deadline"
                      name="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={handleChange}
                      fullWidth
                      icon={<Calendar size={18} className="text-gray-400" />}
                    />
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
                      
                      <Input
                        label="Company Name"
                        id="companyName"
                        name="name"
                        value={formData.company.name}
                        onChange={handleCompanyChange}
                        placeholder="Your company name"
                        required
                        fullWidth
                        icon={<Building size={18} className="text-gray-400" />}
                      />
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Logo
                        </label>
                        <div className="flex items-center mt-1">
                          {formData.company.logo && (
                            <div className="w-12 h-12 rounded-md overflow-hidden mr-4">
                              <img 
                                src={formData.company.logo} 
                                alt="Company Logo" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <Button 
                            type="button"
                            variant="outline"
                          >
                            <Upload size={16} className="mr-2" />
                            Upload Logo
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <Button 
                      type="button" 
                      variant="primary" 
                      onClick={nextStep}
                    >
                      Next
                      <ChevronRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Job Description */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Job Description</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={5}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the role, responsibilities, and ideal candidate"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Requirements
                      </label>
                      {formData.requirements.map((req, index) => (
                        <div key={index} className="flex mb-2">
                          <input
                            type="text"
                            value={req}
                            onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                            placeholder={`Requirement ${index + 1}`}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mr-2"
                            required
                          />
                          {formData.requirements.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeArrayItem('requirements', index)}
                              className="inline-flex items-center p-1 border border-transparent rounded-full text-red-600 hover:bg-red-50 focus:outline-none"
                            >
                              <span className="sr-only">Remove</span>
                              &times;
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayItem('requirements')}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-500"
                      >
                        + Add Requirement
                      </button>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Responsibilities
                      </label>
                      {formData.responsibilities.map((resp, index) => (
                        <div key={index} className="flex mb-2">
                          <input
                            type="text"
                            value={resp}
                            onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                            placeholder={`Responsibility ${index + 1}`}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mr-2"
                            required
                          />
                          {formData.responsibilities.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeArrayItem('responsibilities', index)}
                              className="inline-flex items-center p-1 border border-transparent rounded-full text-red-600 hover:bg-red-50 focus:outline-none"
                            >
                              <span className="sr-only">Remove</span>
                              &times;
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayItem('responsibilities')}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-500"
                      >
                        + Add Responsibility
                      </button>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Required Skills
                      </label>
                      {formData.skills.map((skill, index) => (
                        <div key={index} className="flex mb-2">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => handleArrayChange('skills', index, e.target.value)}
                            placeholder={`Skill ${index + 1}`}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mr-2"
                            required
                          />
                          {formData.skills.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeArrayItem('skills', index)}
                              className="inline-flex items-center p-1 border border-transparent rounded-full text-red-600 hover:bg-red-50 focus:outline-none"
                            >
                              <span className="sr-only">Remove</span>
                              &times;
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayItem('skills')}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-500"
                      >
                        + Add Skill
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep}
                    >
                      <ChevronLeft size={16} className="mr-2" />
                      Back
                    </Button>
                    <Button 
                      type="button" 
                      variant="primary" 
                      onClick={nextStep}
                    >
                      Preview
                      <ChevronRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Preview */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Preview Job Posting</h2>
                  
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        {formData.company.logo && (
                          <div className="w-12 h-12 rounded-md overflow-hidden mr-4">
                            <img 
                              src={formData.company.logo} 
                              alt={formData.company.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <h1 className="text-2xl font-bold text-gray-900">{formData.title}</h1>
                          <p className="text-gray-600">{formData.company.name}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center text-gray-600">
                          <MapPin size={18} className="mr-2 text-gray-400" />
                          {formData.location || 'Location not specified'}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Briefcase size={18} className="mr-2 text-gray-400" />
                          <Badge variant="default">
                            {formData.type}
                          </Badge>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <DollarSign size={18} className="mr-2 text-gray-400" />
                          {formData.salary || 'Salary not specified'}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar size={18} className="mr-2 text-gray-400" />
                          {formData.deadline ? `Deadline: ${formData.deadline}` : 'No deadline specified'}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {formData.skills.filter(Boolean).map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Job Description</h3>
                        <p className="text-gray-700 whitespace-pre-line">
                          {formData.description || 'No description provided.'}
                        </p>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Requirements</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {formData.requirements.filter(Boolean).map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Responsibilities</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {formData.responsibilities.filter(Boolean).map((resp, index) => (
                            <li key={index}>{resp}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep}
                    >
                      <ChevronLeft size={16} className="mr-2" />
                      Edit
                    </Button>
                    <Button 
                      type="submit" 
                      variant="primary"
                    >
                      Post Job
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};