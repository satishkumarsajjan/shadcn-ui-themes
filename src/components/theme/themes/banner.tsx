import { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BannerProps {
  title: string;
  icon?: ReactNode;
  endIcon?: ReactNode;
  variant?: 'default' | 'subtle' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  bgColor?: string;
}

export const Banner: FC<BannerProps> = ({
  title,
  icon,
  endIcon,
  variant = 'default',
  size = 'md',
  className,
  bgColor,
}) => {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm gap-2',
    md: 'px-4 py-3 text-base gap-3',
    lg: 'px-5 py-4 text-lg gap-4',
  };

  return (
    <div
      className={cn(
        'flex items-center rounded-lg w-fit',
        sizeClasses[size],
        variant === 'default' && !bgColor && 'bg-primary/10 text-primary',
        variant === 'subtle' && !bgColor && 'bg-muted text-muted-foreground',
        variant === 'outline' && 'border border-border',
        className
      )}
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      {icon && (
        <div
          className={cn(
            size === 'sm' && 'text-lg',
            size === 'md' && 'text-xl',
            size === 'lg' && 'text-2xl'
          )}
        >
          {icon}
        </div>
      )}
      <h1
        className={cn(
          'font-medium',
          size === 'sm' && 'text-sm',
          size === 'md' && 'text-base',
          size === 'lg' && 'text-lg'
        )}
      >
        {title}
      </h1>
      {endIcon && (
        <div
          className={cn(
            size === 'sm' && 'text-lg',
            size === 'md' && 'text-xl',
            size === 'lg' && 'text-2xl'
          )}
        >
          {endIcon}
        </div>
      )}
    </div>
  );
};
