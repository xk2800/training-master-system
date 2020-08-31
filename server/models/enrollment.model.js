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
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  course_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  }
}
