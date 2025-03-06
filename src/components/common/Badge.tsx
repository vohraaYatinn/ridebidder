
import { cn } from '@/lib/utils';
import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger' | 'info';
}

const Badge = ({ className, variant = 'default', ...props }: BadgeProps) => {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        {
          'bg-primary text-primary-foreground': variant === 'default',
          'bg-secondary text-secondary-foreground': variant === 'secondary',
          'bg-transparent border border-border text-foreground': variant === 'outline',
          'bg-green-500/20 text-green-500 border border-green-500/10': variant === 'success',
          'bg-yellow-500/20 text-yellow-500 border border-yellow-500/10': variant === 'warning',
          'bg-red-500/20 text-red-500 border border-red-500/10': variant === 'danger',
          'bg-blue-500/20 text-blue-500 border border-blue-500/10': variant === 'info',
        },
        className
      )}
      {...props}
    />
  );
};

export default Badge;
