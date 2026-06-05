const pdfService = require('../services/pdfService');
const { Validation, Lead } = require('../models');
const { apiResponse } = require('../utils/apiResponse');

exports.generatePdf = async (req, res, next) => {
  try {
    const validation = await Validation.findByPk(req.params.id, {
      include: [{ model: Lead, as: 'leads' }],
    });

    if (!validation) {
      const err = new Error('Validation not found');
      err.status = 404;
      throw err;
    }

    const lead = validation.leads && validation.leads.length > 0
      ? validation.leads[0]
      : null;

    const buffer = await pdfService.generateReport(validation, lead);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="validation-report-${req.params.id}.pdf"`);
    return res.send(buffer);
  } catch (err) {
    next(err);
  }
};
