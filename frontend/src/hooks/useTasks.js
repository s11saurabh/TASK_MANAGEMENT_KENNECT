import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTasks = useCallback(async (filters = {}, sort = {}, page = 1) => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 10,
        ...filters,
        ...sort
      };
      
      const response = await api.get('/tasks', { params });
      setTasks(response.data.data.tasks);
      setTotalPages(response.data.data.totalPages);
      setCurrentPage(page);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      setTasks(prev => [...prev, response.data.data]);
      return response.data.data;
    } catch (err) {
      throw err.response?.data?.message || 'Failed to create task';
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      setTasks(prev => 
        prev.map(task => task._id === id ? response.data.data : task)
      );
      return response.data.data;
    } catch (err) {
      throw err.response?.data?.message || 'Failed to update task';
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (err) {
      throw err.response?.data?.message || 'Failed to delete task';
    }
  };

  return {
    tasks,
    loading,
    error,
    currentPage,
    totalPages,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask
  };
};

export default useTasks;