const { apiResponse } = require('../utils/apiResponse');

const errorHandler = (err, req, res, _next) => {
  const status = err.status || 500;
  const msg = err.message || 'Internal Server Error';
  if (status >= 500) {
    process.stderr.write(`[ERROR] ${req.method} ${req.path}: ${msg}\n`);
  }
  res.status(status).json(apiResponse(false, msg));
};

module.exports = errorHandler;
