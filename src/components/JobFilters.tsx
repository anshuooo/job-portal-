import React, { useState } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Filter, X } from 'lucide-react';

interface JobFiltersProps {
  onFilter: (filters: {
    jobType: string;
    location: string;
    experience: string;
  }) => void;
}

export const JobFilters: React.FC<JobFiltersProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    jobType: '',
    location: '',
    experience: '',
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleApplyFilters = () => {
    onFilter(filters);
    setShowMobileFilters(false);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      jobType: '',
      location: '',
      experience: '',
    };
    setFilters(clearedFilters);
    onFilter(clearedFilters);
  };

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote', 'Internship'];
  const locations = ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Remote'];
  const experienceLevels = ['Entry Level', '1-3 years', '3-5 years', '5+ years'];

  const FilterContent = () => (
    <>
      <div className="mb-4">
        <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
          Job Type
        </label>
        <select
          id="jobType"
          name="jobType"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={filters.jobType}
          onChange={handleChange}
        >
          <option value="">All Types</option>
          {jobTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <select
          id="location"
          name="location"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={filters.location}
          onChange={handleChange}
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
          Experience Level
        </label>
        <select
          id="experience"
          name="experience"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={filters.experience}
          onChange={handleChange}
        >
          <option value="">All Experience Levels</option>
          {experienceLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col space-y-2">
        <Button onClick={handleApplyFilters} variant="primary" fullWidth>
          Apply Filters
        </Button>
        <Button onClick={handleClearFilters} variant="outline" fullWidth>
          Clear Filters
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden md:block">
        <Card className="sticky top-24">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
            <FilterContent />
          </CardContent>
        </Card>
      </div>

      {/* Mobile Filters Button */}
      <div className="md:hidden">
        <Button
          onClick={() => setShowMobileFilters(true)}
          variant="outline"
          className="w-full mb-4 flex items-center justify-center"
        >
          <Filter size={16} className="mr-2" />
          Filters
        </Button>

        {/* Mobile Filters Modal */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowMobileFilters(false)} />
            <div className="fixed inset-y-0 right-0 max-w-full flex">
              <div className="relative w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                      <button
                        type="button"
                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={() => setShowMobileFilters(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <X size={24} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <FilterContent />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};