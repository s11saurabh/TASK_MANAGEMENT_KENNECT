import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import TaskForm from '../components/tasks/TaskForm';
import { PencilIcon } from '@heroicons/react/24/solid';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [filters, setFilters] = useState({
    priority: '',
    status: '',
    sort: ''
  });

  const formatTaskId = (id) => {
    const numericId = id.toString().padStart(5, '0');
    return `T-${numericId}`;
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).replace(',', '').toLowerCase().replace(/\s+/g, ' ');
  };

  const calculateTotalTime = (task) => {
    const startTime = new Date(task.startTime);
    const endTime = new Date(task.endTime);
    const diffInMs = endTime - startTime;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    return diffInHours.toFixed(2);
  };

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/tasks', { params: filters });
      const tasksData = response.data.data || response.data || [];
      setTasks(Array.isArray(tasksData) ? tasksData : []);
      setError(null);
    } catch (err) {
      console.error('Fetch tasks error:', err);
      setError('Error loading tasks');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleTaskAdded = async () => {
    await fetchTasks();
    setIsModalOpen(false);
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteSelected = async () => {
    if (!window.confirm('Are you sure you want to delete the selected tasks?')) return;
    
    try {
      setError(null);
      for (const taskId of selectedTasks) {
        await api.delete(`/tasks/${taskId}`);
      }
      setTasks(prevTasks => prevTasks.filter(task => !selectedTasks.includes(task._id)));
      setSelectedTasks([]);
      await fetchTasks();
    } catch (error) {
      setError('Failed to delete tasks. Please try again.');
    }
  };

  const handleFilterChange = (type, value) => {
    if (!value) {
      const newFilters = { ...filters };
      delete newFilters[type];
      setFilters(newFilters);
    } else {
      setFilters(prev => ({ ...prev, [type]: value }));
    }
  };

  const renderFilterDropdowns = () => (
    <div className="flex flex-wrap items-center gap-4">
      <select
        value={filters.sort || ''}
        onChange={(e) => handleFilterChange('sort', e.target.value)}
        className="px-4 py-2 bg-gray-800/50 text-gray-300 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-gray-600 transition-colors duration-200"
      >
        <option value="">Sort</option>
        <option value="startTime_asc">Start time: ASC</option>
        <option value="startTime_desc">Start time: DESC</option>
        <option value="endTime_asc">End time: ASC</option>
        <option value="endTime_desc">End time: DESC</option>
      </select>

      <select
        value={filters.priority || ''}
        onChange={(e) => handleFilterChange('priority', e.target.value)}
        className="px-4 py-2 bg-gray-800/50 text-gray-300 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-gray-600 transition-colors duration-200"
      >
        <option value="">Priority</option>
        {[1, 2, 3, 4, 5].map(num => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>

      <select
        value={filters.status || ''}
        onChange={(e) => handleFilterChange('status', e.target.value)}
        className="px-4 py-2 bg-gray-800/50 text-gray-300 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-gray-600 transition-colors duration-200"
      >
        <option value="">Status</option>
        <option value="pending">Pending</option>
        <option value="finished">Finished</option>
      </select>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-radial from-gray-700 via-gray-900 to-black">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-radial from-gray-700 via-gray-900 to-black">
      
      <div className="w-full px-8 py-8 flex-grow">
       
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-lg 
                        shadow-lg backdrop-blur-sm border border-gray-700/50 
                        hover:shadow-[0_0_40px_rgba(0,0,0,0.4)] transition-all duration-300">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="text-3xl font-bold text-gray-300">TASK LIST</h2>
              <button
                onClick={() => {
                  setSelectedTask(null);
                  setIsModalOpen(true);
                }}
                className="bg-gradient-to-r from-purple-500 to-teal-500 text-white px-6 py-3 rounded-lg shadow hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                + Add Task
              </button>
              <button
                onClick={handleDeleteSelected}
                disabled={selectedTasks.length === 0}
                className={`px-6 py-3 rounded-lg shadow transition-all duration-200 ${
                  selectedTasks.length === 0 
                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                    : 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
              >
                Delete Selected
              </button>
            </div>
            {renderFilterDropdowns()}
          </div>

          {error && (
            <div className="bg-red-800 border-l-4 border-red-500 p-4 mb-6 rounded">
              <p className="text-red-100">{error}</p>
            </div>
          )}

         
          <div className="overflow-x-auto rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.3)] 
                          backdrop-blur-sm border border-gray-700/50 
                          hover:shadow-[0_0_40px_rgba(0,0,0,0.4)] transition-all duration-300 p-4">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-b border-gray-700">
                  <th className="p-4">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        setSelectedTasks(e.target.checked ? tasks.map(task => task._id) : []);
                      }}
                      checked={tasks.length > 0 && selectedTasks.length === tasks.length}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      aria-label="Select all tasks"
                    />
                  </th>
                  {['Task ID', 'Title', 'Priority', 'Status', 'Start Time', 'End Time', 'Total Time to Finish (Hrs)', 'Edit'].map((header, index) => (
                    <th
                      key={index}
                      className="text-left px-6 py-4 text-sm font-semibold text-gray-300 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {tasks.length > 0 ? (
                  tasks.map((task, index) => (
                    <tr key={task._id} className="hover:bg-gray-800/30 transition-colors duration-200">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedTasks.includes(task._id)}
                          onChange={() => {
                            setSelectedTasks(prev => {
                              if (prev.includes(task._id)) {
                                return prev.filter(id => id !== task._id);
                              }
                              return [...prev, task._id];
                            });
                          }}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          aria-label={`Select task ${formatTaskId(index + 1)}`}
                        />
                      </td>
                      <td className="px-6 py-4 text-lg font-medium text-gray-300">{formatTaskId(index + 1)}</td>
                      <td className="px-6 py-4 text-lg text-gray-300">{task.title}</td>
                      <td className="px-6 py-4 text-lg text-white">{task.priority}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                          task.status === 'finished' 
                            ? 'bg-green-500 text-green-100' 
                            : 'bg-yellow-500 text-yellow-100'
                        }`}>
                          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{formatDateTime(task.startTime)}</td>
                      <td className="px-6 py-4 text-gray-300">{formatDateTime(task.endTime)}</td>
                      <td className="px-6 py-4 text-gray-300">{calculateTotalTime(task)}</td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => handleEditClick(task)}
                          className="text-gray-300 hover:text-white transition-colors duration-200"
                          title="Edit Task"
                          aria-label={`Edit Task ${task.title}`}
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                      No tasks found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

     
      <footer className="bg-gradient-to-r from-purple-500 to-teal-500 text-white py-6 text-center border-t border-gray-700">
        <p className="text-lg font-medium tracking-wide animate-pulse">DEVELOPED BY SAURABH KUMAR</p>
      </footer>

     
      <TaskForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        onTaskAdded={handleTaskAdded}
        initialData={selectedTask}
      />
    </div>
  );
};

export default Tasks;
