// digitalocean-db.config.js
module.exports = {
  HOST: process.env.DO_DB_HOST,
  USER: process.env.DO_DB_USER,
  PASSWORD: process.env.DO_DB_PASSWORD,
  DB: process.env.DO_DB_NAME,
  PORT: process.env.DO_DB_PORT,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  ssl: true,
};
