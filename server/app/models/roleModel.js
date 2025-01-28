const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Role = sequelize.define(
  "Role",
  {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "roles",
    timestamps: true,
    underscored: true,
  }
);

module.exports = Role;
