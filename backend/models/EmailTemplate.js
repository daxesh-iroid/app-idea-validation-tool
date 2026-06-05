const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EmailTemplate = sequelize.define('EmailTemplate', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  subject: { type: DataTypes.STRING, allowNull: false },
  body: { type: DataTypes.TEXT, allowNull: false },
  variables: { type: DataTypes.JSON },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  tableName: 'email_templates',
  timestamps: true,
  underscored: true,
});

module.exports = EmailTemplate;
