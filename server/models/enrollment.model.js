/**
 * Enrollment model for recording user enrolled course
 */

import sql from 'sequelize'
const { DataTypes } = sql

export default {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  course_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  trainer_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  enrollDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  grade: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  rateSubmitted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  traineeRateNum: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
}
