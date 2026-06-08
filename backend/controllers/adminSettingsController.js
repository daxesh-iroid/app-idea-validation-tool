const adminSettingsService = require('../services/adminSettingsService');
const AdminResource = require('../resources/adminResource');
const { apiResponse } = require('../utils/apiResponse');

exports.getWeights = async (req, res, next) => {
  try {
    const weights = await adminSettingsService.getWeights();
    return res.json(apiResponse(true, 'Score weights retrieved', AdminResource.weight(weights)));
  } catch (err) {
    next(err);
  }
};

exports.updateWeights = async (req, res, next) => {
  try {
    const result = await adminSettingsService.updateWeights(req.params.type, req.body);
    return res.json(apiResponse(true, 'Score weights updated', AdminResource.weight(result)));
  } catch (err) {
    next(err);
  }
};

exports.getTemplates = async (req, res, next) => {
  try {
    const templates = await adminSettingsService.getTemplates();
    return res.json(apiResponse(true, 'Email templates retrieved', AdminResource.template(templates)));
  } catch (err) {
    next(err);
  }
};

exports.updateTemplate = async (req, res, next) => {
  try {
    const result = await adminSettingsService.updateTemplate(req.params.id, req.body);
    return res.json(apiResponse(true, 'Email template updated', AdminResource.template(result)));
  } catch (err) {
    next(err);
  }
};
