import { forwardRef } from 'react';
import { cn } from '@/core/utils/cn';
import type { ButtonProps } from './types';

/**
 * @component Button
 * @summary A customizable button component with different variants.
 * @domain core
 * @type ui-component
 * @category form
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = 'default', ...props }, ref) => {
    const baseClasses =
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variantClasses = {
      default:
        'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      destructive:
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      outline:
        'border border-gray-300 bg-transparent hover:bg-gray-100 focus:ring-gray-500',
      ghost: 'hover:bg-gray-100 focus:ring-gray-500',
    };

    return (
      <button
        className={cn(baseClasses, variantClasses[variant], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
