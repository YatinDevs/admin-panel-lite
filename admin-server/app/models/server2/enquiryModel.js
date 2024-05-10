const { DataTypes } = require("sequelize");
const localSequelize = require("../../utils/local-sequelize");
const UserS2 = require("./userModel");
const LoadS2 = require("./loadModel");
const SpaceS2 = require("./spaceModel");

const EnquiryS2 = localSequelize.define("EnquiryS2", {
  enquiry_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  by_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserS2,
      key: "user_id",
    },
  },
  to_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserS2,
      key: "user_id",
    },
  },
  for_load_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: LoadS2,
      key: "load_id",
    },
  },
  for_space_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: SpaceS2,
      key: "space_id",
    },
  },
  status: {
    type: DataTypes.ENUM("pending", "confirmed"),
    defaultValue: "pending",
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: localSequelize.literal(
      "NOW() + INTERVAL '5 hours 30 minutes'"
    ),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: localSequelize.literal(
      "NOW() + INTERVAL '5 hours 30 minutes'"
    ),
  },
});

module.exports = EnquiryS2;
