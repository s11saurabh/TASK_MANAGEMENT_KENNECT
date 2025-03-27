const calculateHoursDifference = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.max(0, (end - start) / (1000 * 60 * 60));
  };
  
  const calculateTimeLapsed = (startDate) => {
    const start = new Date(startDate);
    const now = new Date();
    return now < start ? 0 : (now - start) / (1000 * 60 * 60);
  };
  
  const calculateTimeLeft = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    return now > end ? 0 : (end - now) / (1000 * 60 * 60);
  };
  
  const isValidDateRange = (startDate, endDate) => {
    return new Date(startDate) < new Date(endDate);
  };
  
  const formatDate = (date) => {
    return new Date(date).toISOString();
  };
  
  module.exports = {
    calculateHoursDifference,
    calculateTimeLapsed,
    calculateTimeLeft,
    isValidDateRange,
    formatDate
  };