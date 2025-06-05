import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SearchBar } from '../components/SearchBar';
import { JobCard } from '../components/JobCard';
import { JobFilters } from '../components/JobFilters';
import { getFilteredJobs } from '../lib/mockData';
import { pageTransition } from '../lib/utils';
import { SlidersHorizontal } from 'lucide-react';

export const JobList: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const initialSearchTerm = queryParams.get('term') || '';
  const initialLocation = queryParams.get('location') || '';
  
  const [searchParams, setSearchParams] = useState({
    term: initialSearchTerm,
    location: initialLocation
  });
  
  const [filters, setFilters] = useState({
    jobType: '',
    location: '',
    experience: ''
  });
  
  const [jobs, setJobs] = useState(getFilteredJobs(searchParams.term, filters.jobType, filters.location, filters.experience));
  
  useEffect(() => {
    setJobs(getFilteredJobs(searchParams.term, filters.jobType, filters.location, filters.experience));
  }, [searchParams, filters]);
  
  const handleSearch = (query: { term: string; location: string }) => {
    setSearchParams(query);
  };
  
  const handleFilter = (newFilters: { jobType: string; location: string; experience: string }) => {
    setFilters(newFilters);
  };

  return (
    <motion.div className="bg-gray-50 min-h-screen py-8" {...pageTransition}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Job</h1>
          <SearchBar 
            onSearch={handleSearch} 
            className="mb-6"
          />
          
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">
              Found <span className="font-medium text-gray-900">{jobs.length}</span> jobs matching your criteria
            </div>
            <div className="flex items-center md:hidden">
              <SlidersHorizontal size={18} className="mr-1 text-gray-500" />
              <span className="text-sm text-gray-500">Use filters to refine results</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar with filters */}
          <div className="md:col-span-1">
            <JobFilters onFilter={handleFilter} />
          </div>
          
          {/* Job listings */}
          <div className="md:col-span-3">
            {jobs.length > 0 ? (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria to find more results.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};