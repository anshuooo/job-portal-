import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { cardHoverAnimation } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  animated = false,
  onClick
}) => {
  const baseStyles = "bg-white rounded-lg border border-gray-200 overflow-hidden";
  
  if (animated) {
    return (
      <motion.div
        className={cn(baseStyles, className)}
        initial="rest"
        whileHover="hover"
        variants={cardHoverAnimation}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div 
      className={cn(baseStyles, className)} 
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ 
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn("p-4 border-b border-gray-200", className)}>
    {children}
  </div>
);

export const CardTitle: React.FC<{ 
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <h3 className={cn("text-lg font-semibold", className)}>
    {children}
  </h3>
);

export const CardContent: React.FC<{ 
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn("p-4", className)}>
    {children}
  </div>
);

export const CardFooter: React.FC<{ 
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn("p-4 border-t border-gray-200", className)}>
    {children}
  </div>
);