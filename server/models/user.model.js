/**
 * User model
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
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
};
