/**
 * Course model
 * 
 * Status: 1 - Active, 2 - Complete, 3 - Postpone, 4 - Close
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
  admin_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  trainer_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false
  }
}
