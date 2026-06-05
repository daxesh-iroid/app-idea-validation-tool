const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Lead = sequelize.define('Lead', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  validationId: { type: DataTypes.INTEGER },
  fullName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  whatsapp: { type: DataTypes.STRING },
  country: { type: DataTypes.STRING },
  companyName: { type: DataTypes.STRING },
  ideaName: { type: DataTypes.STRING },
  expectedBudget: { type: DataTypes.STRING },
  expectedTimeline: { type: DataTypes.STRING },
  readiness: { type: DataTypes.ENUM('just_exploring', 'validating_idea', 'looking_for_mvp', 'need_estimate', 'ready_to_start', 'looking_for_partner') },
  leadScore: { type: DataTypes.ENUM('hot', 'warm', 'cold'), defaultValue: 'cold' },
  leadStatus: { type: DataTypes.ENUM('new', 'contacted', 'qualified', 'converted', 'lost'), defaultValue: 'new' },
  salesNotes: { type: DataTypes.TEXT },
  followUpDate: { type: DataTypes.DATE },
  emailSent: { type: DataTypes.BOOLEAN, defaultValue: false },
  reportDownloaded: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
  tableName: 'leads',
  timestamps: true,
  underscored: true,
});

module.exports = Lead;
