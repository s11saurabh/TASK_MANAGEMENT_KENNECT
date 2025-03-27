import React from 'react';

const TaskCard = ({ task, onStatusChange, onDelete }) => {
  const getPriorityColor = (priority) => {
    const colors = {
      1: 'bg-green-100',
      2: 'bg-blue-100',
      3: 'bg-yellow-100',
      4: 'bg-orange-100',
      5: 'bg-red-100'
    };
    return colors[priority];
  };

  return (
    <div className={`p-4 rounded-lg shadow ${getPriorityColor(task.priority)}`}>
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <span className="px-2 py-1 text-sm rounded bg-gray-200">
          Priority: {task.priority}
        </span>
      </div>
      <div className="mt-4 space-y-2">
        <div>
          <span className="text-gray-600">Start:</span>
          <span className="ml-2">{new Date(task.startTime).toLocaleString()}</span>
        </div>
        <div>
          <span className="text-gray-600">End:</span>
          <span className="ml-2">{new Date(task.endTime).toLocaleString()}</span>
        </div>
        <div>
          <span className="text-gray-600">Status:</span>
          <span className={`ml-2 capitalize ${task.status === 'finished' ? 'text-green-600' : 'text-yellow-600'}`}>
            {task.status}
          </span>
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => onStatusChange(task._id)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {task.status === 'pending' ? 'Mark Complete' : 'Mark Pending'}
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;