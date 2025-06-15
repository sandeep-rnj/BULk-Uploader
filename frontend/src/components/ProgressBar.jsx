import React from 'react';

function ProgressBar({ percent }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
      <div
        className="bg-blue-600 h-4 rounded-full transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
      <p className="text-sm text-center mt-1">{percent}%</p>
    </div>
  );
}

export default ProgressBar;
