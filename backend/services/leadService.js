const { Lead, Validation, sequelize } = require('../models');
const { Op } = sequelize;
const LeadResource = require('../resources/leadResource');
const emailService = require('./emailService');
const { paginate } = require('../utils/paginate');

/**
 * Calculate lead score based on spec:
 *   Hot:  clarity>=60 AND has budget AND timeline<=3months AND has phone AND wants MVP
 *   Warm: clarity>=40 OR has budget OR wants validation
 *   Cold: otherwise
 */
const calculateLeadScore = (leadData, scores) => {
  const clarity = scores ? scores.ideaClarity : (leadData.ideaClarity || 0);
  const hasBudget = leadData.expectedBudget && leadData.expectedBudget !== 'not_sure' && leadData.expectedBudget !== '';
  const timelineMonths = leadData.expectedTimeline;
  const shortTimeline = timelineMonths === '1-3_months' || timelineMonths === '1-3 months';
  const hasPhone = leadData.whatsapp && leadData.whatsapp.trim().length > 0;
  const wantsMvp = leadData.readiness === 'ready_to_start' ||
    leadData.readiness === 'looking_for_mvp' ||
    leadData.readiness === 'need_estimate';

  // Hot: all conditions met
  if (clarity >= 60 && hasBudget && shortTimeline && hasPhone && wantsMvp) {
    return 'hot';
  }

  // Warm: at least one positive signal
  if (clarity >= 40 || hasBudget || wantsMvp) {
    return 'warm';
  }

  // Cold: default
  return 'cold';
};

const createLead = async (data) => {
  const leadScore = calculateLeadScore(data, data.scores);
  const lead = await Lead.create({ ...data, leadScore });
  const leadData = LeadResource.single(lead);

  try {
    await emailService.sendUserReport(lead.email, lead.fullName, data.scores || {}, data.resultType || 'needs_validation');
  } catch (_e) {
    // Email failed but lead is created
  }

  try {
    await emailService.sendSalesNotification(lead, data.scores || {}, data.resultType || 'needs_validation');
  } catch (_e) {
    // Sales notification failed but lead is created
  }

  return leadData;
};

const findById = async (id) => {
  const lead = await Lead.findByPk(id, {
    include: [{ model: Validation, as: 'validation' }],
  });
  if (!lead) {
    const err = new Error('Lead not found');
    err.status = 404;
    throw err;
  }
  return LeadResource.single(lead);
};

const findAll = async (query = {}) => {
  const { page, limit, offset, meta } = paginate(query);
  const where = {};

  if (query.score) where.leadScore = query.score;
  if (query.status) where.leadStatus = query.status;
  if (query.search) {
    where[Op.or] = [
      { fullName: { [Op.iLike]: `%${query.search}%` } },
      { email: { [Op.iLike]: `%${query.search}%` } },
      { ideaName: { [Op.iLike]: `%${query.search}%` } },
    ];
  }

  const { count, rows } = await Lead.findAndCountAll({
    where,
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });

  return {
    leads: LeadResource.list(rows),
    meta: meta(count),
  };
};

const updateLead = async (id, data) => {
  const lead = await Lead.findByPk(id);
  if (!lead) {
    const err = new Error('Lead not found');
    err.status = 404;
    throw err;
  }

  const updatableFields = [
    'leadStatus', 'salesNotes', 'followUpDate',
    'leadScore', 'emailSent', 'reportDownloaded',
  ];
  const updates = {};
  for (const field of updatableFields) {
    if (data[field] !== undefined) {
      updates[field] = data[field];
    }
  }

  await lead.update(updates);
  return LeadResource.single(lead);
};

module.exports = {
  createLead,
  findById,
  findAll,
  updateLead,
  calculateLeadScore,
};
