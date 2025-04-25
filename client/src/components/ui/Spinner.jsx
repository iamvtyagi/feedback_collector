import React from 'react';

const Spinner = ({ size = 'md', color = 'blue' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    blue: 'border-blue-600 border-t-transparent',
    purple: 'border-purple-600 border-t-transparent',
    white: 'border-white border-t-transparent'
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} border-2 rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Spinner;
