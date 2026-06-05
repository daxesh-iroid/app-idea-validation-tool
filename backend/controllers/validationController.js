const validationService = require('../services/validationService');
const ValidationResource = require('../resources/validationResource');
const { apiResponse } = require('../utils/apiResponse');

exports.submitValidation = async (req, res, next) => {
  try {
    const result = await validationService.createAndScore(req.body);
    return res.status(201).json(apiResponse(true, 'Validation completed', ValidationResource.single(result)));
  } catch (err) {
    next(err);
  }
};

exports.getValidation = async (req, res, next) => {
  try {
    const result = await validationService.findById(req.params.id);
    return res.json(apiResponse(true, 'Validation retrieved', ValidationResource.single(result)));
  } catch (err) {
    next(err);
  }
};
