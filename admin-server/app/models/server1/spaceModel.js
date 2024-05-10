const { DataTypes } = require("sequelize");
const digitalOceanSequelize = require("../../utils/digitalocean-sequelize");
const User = require("./userModel");

const Space = digitalOceanSequelize.define(
  "Space",
  {
    space_id: {
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
    },
  },
  {
    hooks: {
      beforeCreate: async (space, options) => {
        space.space_id = await generateAlphanumericKey();
      },
    },
    tableName: "Spaces",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

async function generateAlphanumericKey() {
  const latestSpace = await Space.findOne({
    order: [["space_id", "DESC"]],
  });
  if (!latestSpace) {
    return "S000001";
  } else {
    const numericPart = parseInt(latestSpace.space_id.slice(1), 10);
    const newNumericPart = numericPart + 1;
    const paddedNumericPart = newNumericPart.toString().padStart(6, "0");
    return "S" + paddedNumericPart;
  }
}

Space.associate = (models) => {
  // Space belongs to a User (as the creator)
  Space.belongsTo(models.User, {
    foreignKey: "created_by",
    as: "CreatedByUser",
  });
};

module.exports = Space;
