import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export default function Card({
  children,
  className = '',
  title,
  onClick,
  hoverable = false,
}: CardProps) {
  const baseStyle = 'bg-white rounded-lg shadow p-4';
  const hoverStyle = hoverable ? 'transition-transform duration-200 hover:scale-105 hover:shadow-md cursor-pointer' : '';
  
  return (
    <div 
      className={`${baseStyle} ${hoverStyle} ${className}`}
      onClick={onClick}
    >
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {children}
    </div>
  );
} 