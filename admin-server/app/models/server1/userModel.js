const { DataTypes } = require("sequelize");
const digitalOceanSequelize = require("../../utils/digitalocean-sequelize");

const User = digitalOceanSequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
    contact: {
      type: DataTypes.STRING(50),
    },
    password: {
      type: DataTypes.STRING(255),
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: digitalOceanSequelize.literal(
        "NOW() + INTERVAL '5 hours 30 minutes'"
      ),
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: digitalOceanSequelize.literal(
        "NOW() + INTERVAL '5 hours 30 minutes'"
      ),
      allowNull: false,
    },
  },
  {
    tableName: "Users", // Specify the table name explicitly
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

User.associate = (models) => {
  // User has many Loads
  User.hasMany(models.Load, { foreignKey: "created_by", as: "Loads" });

  // User has many Spaces
  User.hasMany(models.Space, { foreignKey: "created_by", as: "Spaces" });

  // User has many Enquiries as the sender
  User.hasMany(models.Enquiry, {
    foreignKey: "by_user_id",
    as: "EnquiriesSent",
  });

  // User has many Enquiries as the receiver
  User.hasMany(models.Enquiry, {
    foreignKey: "to_user_id",
    as: "EnquiriesReceived",
  });
};

module.exports = User;
