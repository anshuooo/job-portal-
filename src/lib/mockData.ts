import { Company, Job, User, JobApplication } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'jobseeker',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'recruiter',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'TechCorp',
    logo: 'https://images.pexels.com/photos/15013609/pexels-photo-15013609/free-photo-of-logo-of-a-tech-company.jpeg?auto=compress&cs=tinysrgb&w=150',
    description: 'Leading tech company focused on innovation and cutting-edge solutions.',
    website: 'https://techcorp.example.com',
    location: 'San Francisco, CA'
  },
  {
    id: '2',
    name: 'Digital Innovations',
    logo: 'https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=150',
    description: 'Digital transformation consultancy helping businesses leverage technology.',
    website: 'https://digitalinnovations.example.com',
    location: 'New York, NY'
  },
  {
    id: '3',
    name: 'GrowthStartup',
    logo: 'https://images.pexels.com/photos/16129877/pexels-photo-16129877/free-photo-of-company-logo-on-building.jpeg?auto=compress&cs=tinysrgb&w=150',
    description: 'Fast-growing startup focused on scalable solutions for businesses.',
    website: 'https://growthstartup.example.com',
    location: 'Austin, TX'
  }
];

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: mockCompanies[0],
    type: 'Full-time',
    location: 'San Francisco, CA',
    salary: '$100,000 - $130,000',
    description: 'We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces and implementing design systems.',
    requirements: [
      'Strong proficiency in JavaScript, HTML, and CSS',
      'Experience with React.js and modern frontend frameworks',
      'Knowledge of responsive design and cross-browser compatibility',
      'Understanding of RESTful APIs and asynchronous request handling'
    ],
    responsibilities: [
      'Develop new user-facing features',
      'Build reusable components and libraries for future use',
      'Ensure the technical feasibility of UI/UX designs',
      'Optimize application for maximum performance and scalability'
    ],
    postedAt: '2023-05-15',
    deadline: '2023-06-15',
    skills: ['React', 'TypeScript', 'CSS', 'HTML', 'Redux'],
    experience: '3-5 years'
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: mockCompanies[1],
    type: 'Full-time',
    location: 'New York, NY',
    salary: '$110,000 - $140,000',
    description: 'Digital Innovations is seeking a talented Backend Engineer to develop and maintain server-side applications and databases.',
    requirements: [
      'Proficiency in Node.js, Python, or Java',
      'Experience with database technologies (SQL, NoSQL)',
      'Understanding of server-side architecture',
      'Knowledge of API design and implementation'
    ],
    responsibilities: [
      'Design and implement scalable backend services',
      'Optimize existing systems for performance and reliability',
      'Collaborate with frontend teams to integrate user-facing elements',
      'Implement security and data protection measures'
    ],
    postedAt: '2023-05-10',
    deadline: '2023-06-10',
    skills: ['Node.js', 'Express', 'MongoDB', 'SQL', 'Docker'],
    experience: '3-6 years'
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: mockCompanies[2],
    type: 'Remote',
    location: 'Remote',
    salary: '$90,000 - $115,000',
    description: 'GrowthStartup is looking for a creative UI/UX Designer to create engaging and effective user experiences for our products.',
    requirements: [
      'Strong portfolio demonstrating UI/UX design skills',
      'Experience with design tools like Figma, Sketch, Adobe XD',
      'Understanding of user-centered design principles',
      'Knowledge of usability testing methodologies'
    ],
    responsibilities: [
      'Create wireframes, prototypes, and mockups',
      'Conduct user research and testing',
      'Collaborate with developers to implement designs',
      'Iterate on designs based on user feedback'
    ],
    postedAt: '2023-05-12',
    deadline: '2023-06-12',
    skills: ['Figma', 'Sketch', 'User Research', 'Prototyping', 'Information Architecture'],
    experience: '2-4 years'
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: mockCompanies[0],
    type: 'Full-time',
    location: 'San Francisco, CA',
    salary: '$120,000 - $150,000',
    description: 'TechCorp is seeking a DevOps Engineer to help automate and optimize our infrastructure and deployment processes.',
    requirements: [
      'Experience with cloud platforms (AWS, Azure, GCP)',
      'Knowledge of infrastructure as code (Terraform, CloudFormation)',
      'Familiarity with CI/CD pipelines',
      'Understanding of containerization (Docker, Kubernetes)'
    ],
    responsibilities: [
      'Design and implement infrastructure automation',
      'Optimize deployment pipelines for efficiency and reliability',
      'Monitor system performance and security',
      'Collaborate with development teams to improve processes'
    ],
    postedAt: '2023-05-18',
    deadline: '2023-06-18',
    skills: ['AWS', 'Terraform', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins'],
    experience: '4-7 years'
  },
  {
    id: '5',
    title: 'Product Manager',
    company: mockCompanies[1],
    type: 'Full-time',
    location: 'New York, NY',
    salary: '$115,000 - $145,000',
    description: 'Digital Innovations is looking for a Product Manager to oversee product development and drive strategic initiatives.',
    requirements: [
      'Experience in product management or related field',
      'Strong analytical and problem-solving skills',
      'Excellent communication and leadership abilities',
      'Understanding of agile methodologies'
    ],
    responsibilities: [
      'Define product vision, strategy, and roadmap',
      'Gather and prioritize product requirements',
      'Work with engineering, design, and marketing teams',
      'Analyze market trends and competitive landscape'
    ],
    postedAt: '2023-05-20',
    deadline: '2023-06-20',
    skills: ['Product Strategy', 'Agile', 'Market Research', 'Roadmapping', 'User Stories'],
    experience: '4-6 years'
  },
  {
    id: '6',
    title: 'Data Scientist',
    company: mockCompanies[2],
    type: 'Part-time',
    location: 'Remote',
    salary: '$60,000 - $80,000',
    description: 'GrowthStartup is seeking a part-time Data Scientist to analyze data and develop machine learning models to drive business insights.',
    requirements: [
      'Strong background in statistics, mathematics, or related field',
      'Experience with data analysis tools and programming languages (Python, R)',
      'Knowledge of machine learning algorithms and techniques',
      'Ability to communicate complex findings to non-technical stakeholders'
    ],
    responsibilities: [
      'Analyze data to identify patterns and trends',
      'Develop and implement machine learning models',
      'Create visualizations and reports',
      'Collaborate with product and engineering teams'
    ],
    postedAt: '2023-05-16',
    deadline: '2023-06-16',
    skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization', 'Statistics'],
    experience: '2-5 years'
  }
];

export const mockApplications: JobApplication[] = [
  {
    id: '1',
    jobId: '1',
    userId: '1',
    status: 'pending',
    appliedAt: '2023-05-20',
    resume: 'resume-link-1.pdf',
    coverLetter: 'I am excited to apply for this position...'
  },
  {
    id: '2',
    jobId: '3',
    userId: '1',
    status: 'reviewed',
    appliedAt: '2023-05-18',
    resume: 'resume-link-2.pdf'
  }
];

// Helper function to get jobs by filter
export const getFilteredJobs = (
  searchTerm: string = '',
  jobType: string = '',
  location: string = '',
  experience: string = ''
): Job[] => {
  return mockJobs.filter(job => {
    const matchesSearch = searchTerm 
      ? job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    const matchesType = jobType ? job.type === jobType : true;
    const matchesLocation = location ? job.location.includes(location) : true;
    const matchesExperience = experience ? job.experience.includes(experience) : true;
    
    return matchesSearch && matchesType && matchesLocation && matchesExperience;
  });
};

// Helper function to get job by id
export const getJobById = (id: string): Job | undefined => {
  return mockJobs.find(job => job.id === id);
};

// Helper function to get applications by user id
export const getApplicationsByUserId = (userId: string): JobApplication[] => {
  return mockApplications.filter(app => app.userId === userId);
};

// Helper function to get applications by job id
export const getApplicationsByJobId = (jobId: string): JobApplication[] => {
  return mockApplications.filter(app => app.jobId === jobId);
};