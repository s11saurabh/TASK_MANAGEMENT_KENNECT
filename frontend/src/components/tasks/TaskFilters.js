import React from 'react';
import { PRIORITY_LEVELS, TASK_STATUS } from '../../utils/constants';

const TaskFilters = ({ onFilterChange }) => {
  const handlePriorityChange = (e) => {
    onFilterChange('priority', e.target.value);
  };

  const handleStatusChange = (e) => {
    onFilterChange('status', e.target.value);
  };

  const clearFilters = () => {
    onFilterChange('priority', '');
    onFilterChange('status', '');
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <div className="flex items-center">
        <label htmlFor="priority" className="mr-2 text-gray-700 text-sm font-medium">
          Priority:
        </label>
        <select
          id="priority"
          onChange={handlePriorityChange}
          className="rounded-md border border-gray-300 bg-white py-1.5 px-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
        >
          <option value="">All Priorities</option>
          {PRIORITY_LEVELS.map((priority) => (
            <option key={priority.value} value={priority.value}>
              {priority.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center">
        <label htmlFor="status" className="mr-2 text-gray-700 text-sm font-medium">
          Status:
        </label>
        <select
          id="status"
          onChange={handleStatusChange}
          className="rounded-md border border-gray-300 bg-white py-1.5 px-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
        >
          <option value="">All Status</option>
          <option value={TASK_STATUS.PENDING}>Pending</option>
          <option value={TASK_STATUS.FINISHED}>Finished</option>
        </select>
      </div>

      <button
        onClick={clearFilters}
        className="text-sm text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md transition-colors duration-200"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default TaskFilters;