export const calculateTimeInHours = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffInMs = end - start;
    return Math.max(diffInMs / (1000 * 60 * 60), 0);
  };
  
  export const calculateTimeLapsed = (startTime) => {
    const start = new Date(startTime);
    const now = new Date();
    if (now < start) return 0;
    return (now - start) / (1000 * 60 * 60);
  };
  
  export const calculateTimeLeft = (endTime) => {
    const end = new Date(endTime);
    const now = new Date();
    if (now > end) return 0;
    return (end - now) / (1000 * 60 * 60);
  };
  
  export const formatDateTime = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  export const validateTimeRange = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    return start < end;
  };