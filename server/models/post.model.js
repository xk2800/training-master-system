/**
 * Post model
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
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  content: {
    type: DataTypes.BLOB,
    allowNull: false
  }
}
