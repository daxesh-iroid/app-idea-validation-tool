const { ScoreWeight, EmailTemplate } = require('../models');

/**
 * Get all score weights.
 */
const getWeights = async () => {
  const weights = await ScoreWeight.findAll({
    where: { isActive: true },
    order: [['scoreType', 'ASC']],
  });
  return weights;
};

/**
 * Update weights for a specific score type.
 * Creates a new record if one doesn't exist.
 */
const updateWeights = async (scoreType, weights) => {
  let record = await ScoreWeight.findOne({
    where: { scoreType },
  });

  if (record) {
    await record.update({ weights });
  } else {
    record = await ScoreWeight.create({ scoreType, weights, isActive: true });
  }

  return record;
};

/**
 * Get all email templates.
 */
const getTemplates = async () => {
  const templates = await EmailTemplate.findAll({
    where: { isActive: true },
    order: [['name', 'ASC']],
  });
  return templates;
};

/**
 * Update an email template by ID.
 */
const updateTemplate = async (id, data) => {
  const template = await EmailTemplate.findByPk(id);

  if (!template) {
    const err = new Error('Email template not found');
    err.status = 404;
    throw err;
  }

  const updatableFields = ['subject', 'body', 'variables', 'isActive'];
  const updates = {};
  for (const field of updatableFields) {
    if (data[field] !== undefined) {
      updates[field] = data[field];
    }
  }

  await template.update(updates);
  return template;
};

module.exports = {
  getWeights,
  updateWeights,
  getTemplates,
  updateTemplate,
};
