export const TASK_STATUS = {
    PENDING: 'pending',
    FINISHED: 'finished'
  };
  
  export const PRIORITY_LEVELS = [
    { value: 1, label: 'Very Low' },
    { value: 2, label: 'Low' },
    { value: 3, label: 'Medium' },
    { value: 4, label: 'High' },
    { value: 5, label: 'Very High' }
  ];
  
  export const SORT_OPTIONS = {
    START_TIME_ASC: 'Start time: Oldest first',
    START_TIME_DESC: 'Start time: Newest first',
    END_TIME_ASC: 'End time: Earliest first',
    END_TIME_DESC: 'End time: Latest first'
  };
  
  export const ITEMS_PER_PAGE = 10;
  
  export const DATE_FORMAT = 'DD-MM-YYYY HH:mm';
  
  export const ERROR_MESSAGES = {
    REQUIRED_FIELD: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PASSWORD: 'Password must be at least 8 characters long with 1 uppercase, 1 lowercase and 1 number',
    INVALID_PRIORITY: 'Priority must be between 1 and 5',
    INVALID_TIME_RANGE: 'End time must be after start time'
  };