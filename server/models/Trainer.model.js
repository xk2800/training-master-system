/**
 * User model - Trainer
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
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT
  },
  rating: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
}