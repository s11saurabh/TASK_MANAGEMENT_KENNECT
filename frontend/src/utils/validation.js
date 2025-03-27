export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validatePassword = (password) => {
  
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };
  
  export const validateTaskInput = (task) => {
    const errors = {};
  
    if (!task.title?.trim()) {
      errors.title = 'Title is required';
    }
  
    if (!task.startTime) {
      errors.startTime = 'Start time is required';
    }
  
    if (!task.endTime) {
      errors.endTime = 'End time is required';
    }
  
    if (task.priority < 1 || task.priority > 5 || !Number.isInteger(task.priority)) {
      errors.priority = 'Priority must be an integer between 1 and 5';
    }
  
    if (!['pending', 'finished'].includes(task.status)) {
      errors.status = 'Invalid status value';
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };