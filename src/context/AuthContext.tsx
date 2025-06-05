import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { mockUsers } from '../lib/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: 'jobseeker' | 'recruiter') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.email === email);
        
        if (foundUser) {
          setUser(foundUser);
          localStorage.setItem('user', JSON.stringify(foundUser));
          setIsLoading(false);
          resolve(true);
        } else {
          setIsLoading(false);
          resolve(false);
        }
      }, 800);
    });
  };

  const register = async (
    name: string, 
    email: string, 
    password: string, 
    role: 'jobseeker' | 'recruiter'
  ): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if user already exists
        const existingUser = mockUsers.find(u => u.email === email);
        
        if (existingUser) {
          setIsLoading(false);
          resolve(false);
        } else {
          // Create new user (in a real app, this would be an API call)
          const newUser: User = {
            id: `${mockUsers.length + 1}`,
            name,
            email,
            role,
            avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150'
          };
          
          // In a real app we would persist to the server
          // For this demo, we just update local state
          setUser(newUser);
          localStorage.setItem('user', JSON.stringify(newUser));
          setIsLoading(false);
          resolve(true);
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};