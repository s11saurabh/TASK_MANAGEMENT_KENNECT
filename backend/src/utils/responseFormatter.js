const formatSuccess = (data, message = 'Success') => {
    return {
      success: true,
      message,
      data
    };
  };
  
  const formatError = (message, errors = null) => {
    const response = {
      success: false,
      message
    };
  
    if (errors) {
      response.errors = errors;
    }
  
    return response;
  };
  
  const formatPaginatedResponse = (data, page, limit, total) => {
    return {
      success: true,
      data,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    };
  };
  
  module.exports = {
    formatSuccess,
    formatError,
    formatPaginatedResponse
  };