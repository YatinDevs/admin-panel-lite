// digitalocean-sequelize.js
const { Sequelize } = require("sequelize");
const digitalOceanDBConfig = require("../config/digitalocean-db.config");

const digitalOceanSequelize = new Sequelize(
  digitalOceanDBConfig.DB,
  digitalOceanDBConfig.USER,
  digitalOceanDBConfig.PASSWORD,
  {
    host: digitalOceanDBConfig.HOST,
    port: digitalOceanDBConfig.PORT,
    dialect: digitalOceanDBConfig.dialect,
    timezone: "+05:30",
    pool: {
      max: digitalOceanDBConfig.pool.max,
      min: digitalOceanDBConfig.pool.min,
      acquire: digitalOceanDBConfig.pool.acquire,
      idle: digitalOceanDBConfig.pool.idle,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Add this option to accept self-signed certificates
      },
    },
  }
);

module.exports = digitalOceanSequelize;
