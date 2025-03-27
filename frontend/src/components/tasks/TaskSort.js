import React from 'react';

const TaskSort = ({ sortBy, sortOrder, onSortChange }) => {
  const handleSortChange = (field) => {
    if (sortBy === field) {
      onSortChange(field, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      onSortChange(field, 'asc');
    }
  };

  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg shadow">
      <div>
        <label className="block mb-1">Sort By:</label>
        <div className="flex gap-2">
          <button
            onClick={() => handleSortChange('startTime')}
            className={`px-3 py-1 rounded ${
              sortBy === 'startTime' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Start Time {sortBy === 'startTime' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSortChange('endTime')}
            className={`px-3 py-1 rounded ${
              sortBy === 'endTime' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            End Time {sortBy === 'endTime' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSortChange('priority')}
            className={`px-3 py-1 rounded ${
              sortBy === 'priority' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Priority {sortBy === 'priority' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskSort;