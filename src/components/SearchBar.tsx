import React, { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { debounce } from '../lib/utils';

interface SearchBarProps {
  onSearch: (query: { term: string; location: string }) => void;
  className?: string;
  large?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  className = '', 
  large = false 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  // Debounced search function
  const debouncedSearch = debounce((term, loc) => {
    onSearch({ term, location: loc });
  }, 500);

  useEffect(() => {
    debouncedSearch(searchTerm, location);
  }, [searchTerm, location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ term: searchTerm, location });
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`w-full ${className}`}
    >
      <div className={`flex flex-col md:flex-row gap-3 ${large ? 'max-w-4xl mx-auto' : ''}`}>
        <div className="flex-grow">
          <Input
            type="text"
            placeholder="Job title, keywords, or company"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            icon={<Search size={18} className="text-gray-400" />}
            className={large ? 'h-14 text-lg pl-12' : ''}
          />
        </div>
        <div className="flex-grow">
          <Input
            type="text"
            placeholder="City, state, or remote"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
            icon={<MapPin size={18} className="text-gray-400" />}
            className={large ? 'h-14 text-lg pl-12' : ''}
          />
        </div>
        <Button 
          type="submit" 
          variant="primary"
          className={large ? 'h-14 px-8 text-lg' : ''}
        >
          Search Jobs
        </Button>
      </div>
    </form>
  );
};