const { validationResult } = require('express-validator');
const { apiResponse } = require('../utils/apiResponse');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = errors.array().map((e) => ({
      field: e.path,
      message: e.msg,
    }));
    return res.status(400).json(apiResponse(false, 'Validation failed', { errors: formatted }));
  }
  next();
};

module.exports = validate;
