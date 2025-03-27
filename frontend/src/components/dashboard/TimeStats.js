import React from 'react';

const TimeStats = ({ averageCompletionTime }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Time Statistics</h3>
      <div>
        <div className="mb-4">
          <span className="text-gray-600">Average Completion Time:</span>
          <span className="ml-2 font-semibold">{averageCompletionTime.toFixed(1)} hours</span>
        </div>
      </div>
    </div>
  );
};

export default TimeStats;