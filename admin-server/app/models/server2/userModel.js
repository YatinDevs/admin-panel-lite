const { DataTypes } = require("sequelize");
const localSequelize = require("../../utils/local-sequelize");
const LoadS2 = require("./loadModel");
const SpaceS2 = require("./spaceModel");
const EnquiryS2 = require("./enquiryModel");

const UserS2 = localSequelize.define(
  "UserS2",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "UsersS2",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

module.exports = UserS2;
