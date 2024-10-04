const successResponse = (
  data,
  message = "Success",
  statusCode = 200,
  totalData = 1
) => {
  return {
    totalData,
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
