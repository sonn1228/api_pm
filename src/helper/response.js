const successResponse = (res, status, message, data, options = {}) => {
  const response = {
    status,
    message,
    data,
    ...options,
  };
  return res.status(status).json(response);
};

const errorResponse = (res, status, message) => {
  const response = {
    status,
    message,
  };
  return res.status(status).json(response);
};

export { successResponse, errorResponse };
