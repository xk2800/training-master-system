/**
 * Template model for reference
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
  number: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}
