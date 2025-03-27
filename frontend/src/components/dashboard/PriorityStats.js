import React from 'react';

const PriorityStats = ({ stats }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Priority Distribution</h3>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((priority) => {
          const priorityStats = stats.find(stat => stat.priority === priority) || {
            timeElapsed: 0,
            estimatedTimeLeft: 0
          };
          
          return (
            <div key={priority} className="border-b pb-2">
              <div className="flex justify-between mb-1">
                <span>Priority {priority}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Time Elapsed:</span>
                  <span className="ml-2">{priorityStats.timeElapsed.toFixed(1)}h</span>
                </div>
                <div>
                  <span className="text-gray-600">Time Left:</span>
                  <span className="ml-2">{priorityStats.estimatedTimeLeft.toFixed(1)}h</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PriorityStats;