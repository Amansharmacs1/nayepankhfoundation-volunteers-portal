import React from 'react';

const Card = ({ className, children, ...props }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children, ...props }) => (
  <div className={`px-6 py-4 border-b border-gray-100 ${className || ''}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className, children, ...props }) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight text-gray-900 ${className || ''}`} {...props}>
    {children}
  </h3>
);

export const CardContent = ({ className, children, ...props }) => (
  <div className={`p-6 ${className || ''}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className, children, ...props }) => (
  <div className={`px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center ${className || ''}`} {...props}>
    {children}
  </div>
);

export default Card;
