const { Validation } = require('../models');
const scoringService = require('./scoringService');
const ValidationResource = require('../resources/validationResource');
const { paginate } = require('../utils/paginate');

const createAndScore = async (data) => {
  const scores = scoringService.calculateAllScores(data);
  const validation = await Validation.create({ ...data, ...scores });
  return ValidationResource.single(validation);
};

const findById = async (id) => {
  const validation = await Validation.findByPk(id);
  if (!validation) {
    const err = new Error('Validation not found');
    err.status = 404;
    throw err;
  }
  return ValidationResource.single(validation);
};

const findAll = async (query = {}) => {
  const { page, limit, offset, meta } = paginate(query);

  const { count, rows } = await Validation.findAndCountAll({
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });

  return {
    validations: rows.map((v) => ValidationResource.single(v)),
    meta: meta(count),
  };
};

module.exports = {
  createAndScore,
  findById,
  findAll,
};
