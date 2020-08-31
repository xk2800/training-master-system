
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
  course_id: {
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
  }
  /*
  fileName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  content: {
    type: DataTypes.BLOB("long"),
    allowNull: false
  }
  */
}
