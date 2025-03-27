import React, { useState } from 'react';
import api from '../../services/api';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const TaskForm = ({ isOpen, onClose, onTaskAdded, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    priority: '1',
    status: 'pending',
    startTime: null,
    endTime: null
  });
  const [errors, setErrors] = useState({});

  const handleDateChange = (date, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: date
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';
    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = 'End time must be after start time';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const dataToSubmit = {
        title: formData.title.trim(),
        priority: parseInt(formData.priority),
        status: formData.status,
        startTime: formData.startTime.toISOString(),
        endTime: formData.endTime.toISOString()
      };

      const response = initialData?._id
        ? await api.put(`/tasks/${initialData._id}`, dataToSubmit)
        : await api.post('/tasks', dataToSubmit);

      if (response.data) {
        await onTaskAdded(response.data.data || response.data);
        onClose();
        setFormData({
          title: '',
          priority: '1',
          status: 'pending',
          startTime: null,
          endTime: null
        });
      }
    } catch (error) {
      console.error('Error saving task:', error);
      setErrors({ 
        submit: error.response?.data?.message || 'Failed to save task' 
      });
    }
  };

  const handleToggleStatus = () => {
    setFormData(prev => ({
      ...prev,
      status: prev.status === 'pending' ? 'finished' : 'pending'
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">
            {initialData ? 'Edit task' : 'Add new task'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`mt-1 p-2 w-full border rounded-md ${errors.title ? 'border-red-500' : ''}`}
              placeholder="Enter task title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <div className="mt-2 flex items-center justify-between">
              <span className={formData.status === 'pending' ? 'text-yellow-600' : 'text-gray-500'}>
                Pending
              </span>
              <button
                type="button"
                onClick={handleToggleStatus}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  formData.status === 'finished' ? 'bg-green-500' : 'bg-gray-200'
                }`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  formData.status === 'finished' ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
              <span className={formData.status === 'finished' ? 'text-green-600' : 'text-gray-500'}>
                Finished
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Start Time</label>
            <DatePicker
              selected={formData.startTime}
              onChange={(date) => handleDateChange(date, 'startTime')}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className={`mt-1 p-2 w-full border rounded-md ${errors.startTime ? 'border-red-500' : ''}`}
              placeholderText="Select start date and time"
            />
            {errors.startTime && (
              <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">End Time</label>
            <DatePicker
              selected={formData.endTime}
              onChange={(date) => handleDateChange(date, 'endTime')}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className={`mt-1 p-2 w-full border rounded-md ${errors.endTime ? 'border-red-500' : ''}`}
              placeholderText="Select end date and time"
              minDate={formData.startTime}
            />
            {errors.endTime && (
              <p className="mt-1 text-sm text-red-600">{errors.endTime}</p>
            )}
          </div>

          {errors.submit && (
            <div className="text-red-600 text-sm">{errors.submit}</div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              {initialData ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;