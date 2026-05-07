export const sendResponse = (
  res,
  statusCode,
  success,
  message,
  data = null,
  meta = null,
) => {
  const response = {
    success,
    message,
  };

  if (data !== null && data !== undefined) {
    response.data = data;
  }

  if (meta) {
    response.meta = meta;
  }

  return res.status(statusCode).json(response);
};
