// local-sequelize.js
const { Sequelize } = require("sequelize");

const localDBConfig = require("../config/local-db.config.js");

const localSequelize = new Sequelize(
  localDBConfig.DB,
  localDBConfig.USER,
  localDBConfig.PASSWORD,
  {
    host: localDBConfig.HOST,
    port: localDBConfig.PORT,
    dialect: localDBConfig.dialect,
    timezone: "+05:30",
    pool: {
      max: localDBConfig.pool.max,
      min: localDBConfig.pool.min,
      acquire: localDBConfig.pool.acquire,
      idle: localDBConfig.pool.idle,
    },
  }
);

module.exports = localSequelize;
