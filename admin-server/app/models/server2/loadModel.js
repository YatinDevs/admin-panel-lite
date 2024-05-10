const { DataTypes } = require("sequelize");
const localSequelize = require("../../utils/local-sequelize");
const UserS2 = require("./userModel");

const LoadS2 = localSequelize.define(
  "LoadS2",
  {
    load_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    from_city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    from_pin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    to_city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to_pin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image_urls: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: localSequelize.literal(
        "NOW() + INTERVAL '5 hours 30 minutes'"
      ),
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: localSequelize.literal(
        "NOW() + INTERVAL '5 hours 30 minutes'"
      ),
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserS2,
        key: "user_id",
      },
    },
    length: {
      type: DataTypes.FLOAT,
    },
    width: {
      type: DataTypes.FLOAT,
    },
    height: {
      type: DataTypes.FLOAT,
    },
    weight: {
      type: DataTypes.FLOAT,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "LoadsS2",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

module.exports = LoadS2;
