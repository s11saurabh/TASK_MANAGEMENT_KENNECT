import React from 'react';

const TaskProgress = ({ totalTasks, completedPercentage, pendingPercentage }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Task Progress</h3>
      <div className="space-y-4">
        <div>
          <span className="text-gray-600">Total Tasks:</span>
          <span className="ml-2 font-semibold">{totalTasks}</span>
        </div>
        <div>
          <p className="text-gray-600 mb-1">Completion Status</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-600 h-2.5 rounded-full" 
              style={{ width: `${completedPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span>Completed: {completedPercentage}%</span>
            <span>Pending: {pendingPercentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskProgress;
