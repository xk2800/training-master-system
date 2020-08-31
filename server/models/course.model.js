/**
 * Course model
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
    type: DataTypes.BLOB,
    allowNull: false
  }
}
