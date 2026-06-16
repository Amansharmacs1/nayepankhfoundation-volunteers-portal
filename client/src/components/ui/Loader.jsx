import { Loader2 } from 'lucide-react';

const Loader = ({ className, size = 'md' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  return (
    <div className={`flex justify-center items-center ${className || ''}`}>
      <Loader2 className={`animate-spin text-primary ${sizes[size]}`} />
    </div>
  );
};

export const FullPageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <Loader size="xl" />
  </div>
);

export default Loader;
