const sequelize = require('../config/database');
const Validation = require('./Validation');
const Lead = require('./Lead');
const AdminUser = require('./AdminUser');
const ScoreWeight = require('./ScoreWeight');
const EmailTemplate = require('./EmailTemplate');

// Associations
Validation.hasOne(Lead, { foreignKey: 'validationId', as: 'lead' });
Lead.belongsTo(Validation, { foreignKey: 'validationId', as: 'validation' });

module.exports = {
  sequelize,
  Validation,
  Lead,
  AdminUser,
  ScoreWeight,
  EmailTemplate,
};
