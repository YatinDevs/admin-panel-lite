const { DataTypes } = require("sequelize");
const localSequelize = require("../../utils/local-sequelize");
const UserS2 = require("./userModel");

const SpaceS2 = localSequelize.define(
  "SpaceS2",
  {
    space_id: {
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
    stop_1: {
      type: DataTypes.STRING,
    },
    stop_2: {
      type: DataTypes.STRING,
    },
    stop_3: {
      type: DataTypes.STRING,
    },
    stop_4: {
      type: DataTypes.STRING,
    },
    stop_5: {
      type: DataTypes.STRING,
    },
    stop_6: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "SpacesS2",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

module.exports = SpaceS2;
