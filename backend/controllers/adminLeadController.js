const leadService = require('../services/leadService');
const LeadResource = require('../resources/leadResource');
const { apiResponse } = require('../utils/apiResponse');

exports.getLeads = async (req, res, next) => {
  try {
    const { page, limit, score, status } = req.query;
    const result = await leadService.findAll({ page, limit, score, status });
    return res.json(apiResponse(true, 'Leads retrieved', LeadResource.list(result.leads), result.meta));
  } catch (err) {
    next(err);
  }
};

exports.getLead = async (req, res, next) => {
  try {
    const result = await leadService.findById(req.params.id);
    return res.json(apiResponse(true, 'Lead retrieved', LeadResource.single(result)));
  } catch (err) {
    next(err);
  }
};

exports.updateLead = async (req, res, next) => {
  try {
    const result = await leadService.updateLead(req.params.id, req.body);
    return res.json(apiResponse(true, 'Lead updated', LeadResource.single(result)));
  } catch (err) {
    next(err);
  }
};
