const successResponse = (data, message = "Success", statusCode = 200) => {
  return {
    data,
    status: "success",
    statusCode,
    message,
  };
};

const errorResponse = (message = "Error", statusCode = 500) => {
  return {
    status: "error",
    statusCode,
    message,
  };
};

module.exports = {
  successResponse,
  errorResponse,
};
