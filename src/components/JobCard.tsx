import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Job } from '../types';
import { formatDate } from '../lib/utils';
import { MapPin, Briefcase, DollarSign, Calendar } from 'lucide-react';

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const getJobTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'Full-time':
        return 'default';
      case 'Part-time':
        return 'secondary';
      case 'Contract':
        return 'outline';
      case 'Remote':
        return 'success';
      case 'Internship':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Card animated className="mb-4 cursor-pointer">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="p-4 md:p-6 flex-grow">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 mr-3 rounded-md overflow-hidden flex-shrink-0">
                <img 
                  src={job.company.logo} 
                  alt={job.company.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <Link to={`/jobs/${job.id}`} className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                  {job.title}
                </Link>
                <p className="text-sm text-gray-600">{job.company.name}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin size={16} className="mr-2 text-gray-400" />
                {job.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Briefcase size={16} className="mr-2 text-gray-400" />
                <Badge variant={getJobTypeBadgeVariant(job.type)}>
                  {job.type}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign size={16} className="mr-2 text-gray-400" />
                {job.salary}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar size={16} className="mr-2 text-gray-400" />
                Posted {formatDate(job.postedAt)}
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 line-clamp-2">
                {job.description}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.slice(0, 4).map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {job.skills.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{job.skills.length - 4} more
                </Badge>
              )}
            </div>
          </div>
          
          <div className="p-4 md:p-6 md:border-l border-gray-200 flex flex-col justify-center items-center md:w-48">
            <Button 
              as={Link} 
              to={`/jobs/${job.id}`} 
              variant="primary" 
              size="md" 
              className="w-full mb-2"
            >
              View Details
            </Button>
            <Button 
              as={Link} 
              to={`/jobs/${job.id}/apply`} 
              variant="outline" 
              size="md" 
              className="w-full"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};