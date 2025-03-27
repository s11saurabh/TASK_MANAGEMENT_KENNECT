import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onStatusChange, onDelete, loading }) => {
  if (loading) {
    return <div className="text-center py-4">Loading tasks...</div>;
  }

  if (!tasks.length) {
    return (
      <div className="text-center py-4 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No tasks found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map(task => (
        <TaskCard
          key={task._id}
          task={task}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;