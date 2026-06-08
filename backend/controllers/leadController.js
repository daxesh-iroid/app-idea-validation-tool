const leadService = require('../services/leadService');
const emailService = require('../services/emailService');
const LeadResource = require('../resources/leadResource');
const { apiResponse } = require('../utils/apiResponse');

exports.createLead = async (req, res, next) => {
  try {
    const { scores, resultType, ...leadData } = req.body;
    const result = await leadService.createLead(leadData);

    try {
      await emailService.sendUserReport(leadData.email, leadData.fullName, scores || {}, resultType || 'needs_validation');
    } catch (_e) {
      // Email send failed but lead is created
    }

    try {
      await emailService.sendSalesNotification(result, scores || {}, resultType || 'needs_validation');
    } catch (_e) {
      // Sales notification failed but lead is created
    }

    return res.status(201).json(apiResponse(true, 'Lead created successfully', LeadResource.single(result)));
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
