const { DataTypes } = require("sequelize");
const localSequelize = require("../../utils/local-sequelize");
const Employee = localSequelize.define(
  "Employee",
  {
    emp_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("NOW() + INTERVAL '5 hours 30 minutes'"),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("NOW() + INTERVAL '5 hours 30 minutes'"),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "Employee",
  }
);

module.exports = Employee;
