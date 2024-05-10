const { DataTypes } = require("sequelize");
const digitalOceanSequelize = require("../../utils/digitalocean-sequelize");
const User = require("./userModel");
const Load = require("./loadModel");
const Space = require("./spaceModel");

const Enquiry = digitalOceanSequelize.define("Enquiry", {
  enquiry_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  by_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "user_id",
    },
  },
  to_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "user_id",
    },
  },
  for_load_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Load,
      key: "load_id",
    },
  },
  for_space_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Space,
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
    defaultValue: digitalOceanSequelize.literal(
      "NOW() + INTERVAL '5 hours 30 minutes'"
    ),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: digitalOceanSequelize.literal(
      "NOW() + INTERVAL '5 hours 30 minutes'"
    ),
  },
});

Enquiry.associate = (models) => {
  // Enquiry belongs to a User (as the sender)
  Enquiry.belongsTo(models.User, { foreignKey: "by_user_id", as: "Enquirer" });

  // Enquiry belongs to a User (as the receiver)
  Enquiry.belongsTo(models.User, { foreignKey: "to_user_id", as: "Recipient" });

  // Enquiry belongs to a Load
  Enquiry.belongsTo(models.Load, {
    foreignKey: "for_load_id",
    as: "AssociatedLoad",
  });

  // Enquiry belongs to a Space
  Enquiry.belongsTo(models.Space, {
    foreignKey: "for_space_id",
    as: "AssociatedSpace",
  });
};

module.exports = Enquiry;
