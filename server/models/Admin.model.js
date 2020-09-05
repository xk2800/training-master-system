/**
 * User model - Admin
 */

import sql from 'sequelize';
const { DataTypes } = sql;
 
export default {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  userId: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT
  }
}