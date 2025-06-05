export interface User {
  id: string;
  name: string;
  email: string;
  role: 'jobseeker' | 'recruiter';
  avatar?: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  website?: string;
  location: string;
}

export interface Job {
  id: string;
  title: string;
  company: Company;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote';
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedAt: string;
  deadline?: string;
  skills: string[];
  experience: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  appliedAt: string;
  resume: string;
  coverLetter?: string;
}