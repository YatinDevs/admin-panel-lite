const { DataTypes } = require("sequelize");
const digitalOceanSequelize = require("../../utils/digitalocean-sequelize");
const User = require("./userModel");

const Load = digitalOceanSequelize.define(
  "Load",
  {
    load_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    from_city: {
      type: DataTypes.STRING,
    },
    from_pin: {
      type: DataTypes.INTEGER,
    },
    to_city: {
      type: DataTypes.STRING,
    },
    to_pin: {
      type: DataTypes.INTEGER,
    },
    image_urls: {
      type: DataTypes.ARRAY(DataTypes.STRING),
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
    created_by: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
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
    hooks: {
      beforeCreate: async (load, options) => {
        load.load_id = await generateAlphanumericKey();
      },
    },
    tableName: "Loads",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

async function generateAlphanumericKey() {
  const latestLoad = await Load.findOne({
    order: [["load_id", "DESC"]],
  });
  if (!latestLoad) {
    return "L000001";
  } else {
    const numericPart = parseInt(latestLoad.load_id.slice(1), 10);
    const newNumericPart = numericPart + 1;
    const paddedNumericPart = newNumericPart.toString().padStart(6, "0");
    return "L" + paddedNumericPart;
  }
}
Load.associate = (models) => {
  // Load belongs to a User (as the creator)
  Load.belongsTo(models.User, {
    foreignKey: "created_by",
    as: "CreatedByUser",
  });
};

module.exports = Load;
