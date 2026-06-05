const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ScoreWeight = sequelize.define('ScoreWeight', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  scoreType: { type: DataTypes.STRING, allowNull: false, unique: true },
  weights: { type: DataTypes.JSON, allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  tableName: 'score_weights',
  timestamps: true,
  underscored: true,
});

module.exports = ScoreWeight;
