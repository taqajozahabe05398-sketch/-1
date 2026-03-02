import React from 'react';
import { motion } from 'motion/react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  delay?: number;
}

export const AuroraCard: React.FC<CardProps> = ({ children, className = "", active = false, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
      className={`
        relative overflow-hidden rounded-xl backdrop-blur-md
        bg-aria-card border transition-all duration-300
        ${active 
          ? 'aurora-card-active border-aria-cyan/30' 
          : 'border-white/5 hover:border-aria-cyan/20 hover:-translate-y-0.5'
        }
        ${className}
      `}
    >
      {/* Subtle gradient overlay for active state */}
      {active && (
        <div className="absolute inset-0 bg-gradient-to-br from-aria-cyan/5 to-transparent opacity-20 pointer-events-none" />
      )}
      
      {children}
    </motion.div>
  );
};

export const AuroraButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }> = ({ 
  children, 
  className = "", 
  variant = 'primary',
  ...props 
}) => {
  const baseStyles = "relative px-6 py-2.5 rounded-lg font-display font-medium transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden group";
  
  const variants = {
    primary: "bg-gradient-to-br from-[#0066CC] to-aria-cyan text-white aurora-btn-hover border border-white/10",
    secondary: "bg-white/5 border border-white/10 text-aria-text-main hover:bg-white/10 hover:border-aria-cyan/30"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      )}
    </button>
  );
};
