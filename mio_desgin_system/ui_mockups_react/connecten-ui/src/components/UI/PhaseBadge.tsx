import React from 'react';

interface PhaseBadgeProps {
  phase: 1 | 2;
  compact?: boolean;
  className?: string;
}

const phaseStyles: Record<PhaseBadgeProps['phase'], string> = {
  1: 'bg-blue-100 text-blue-700',
  2: 'bg-emerald-100 text-emerald-700'
};

export const PhaseBadge: React.FC<PhaseBadgeProps> = ({ phase, compact = false, className = '' }) => {
  const sizeClasses = compact ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1';
  const label = phase === 1 ? 'Phase 1' : 'Phase 2';

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full ${phaseStyles[phase]} ${sizeClasses} ${className}`}
    >
      {label}
    </span>
  );
};
