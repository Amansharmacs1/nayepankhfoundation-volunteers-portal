import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-sm',
    secondary: 'bg-secondary text-primary-dark hover:bg-orange-100',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700',
    danger: 'bg-danger text-white hover:bg-red-600 shadow-sm',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
    white: 'bg-white text-primary hover:bg-gray-100 shadow-sm font-semibold',
    'white-outline': 'border-2 border-white bg-transparent hover:bg-white hover:text-primary text-white font-semibold transition-all',
  };

  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 py-2 px-4',
    lg: 'h-11 px-8 text-lg',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ''}`;

  return (
    <button ref={ref} className={classes} disabled={isLoading || props.disabled} {...props}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
