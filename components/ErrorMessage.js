import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="w-full bg-red-900/50 border border-red-500 text-red-300 p-4 rounded-lg flex items-center space-x-3">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;