// Required Modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

// db Sequelize connections
const localSequelize = require("./utils/local-sequelize");
const digitalOceanSequelize = require("./utils/digitalocean-sequelize");

// Routers

const app = express();

// middlewares
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:8084",
    "http://localhost:4004",
    "http://192.168.0.107:5173",
    "http://192.168.0.107:5174",
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(morgan("dev")); // logs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Set allowed origin(s)

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH"); // Set allowed HTTP methods
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials
  next();
});

// Authenticate and synchronize connections to databases
Promise.all([
  localSequelize.authenticate(),
  digitalOceanSequelize.authenticate(),
])
  .then(() => {
    console.log(
      "Connection to the Both database has been established successfully."
    );
    return Promise.all([
      localSequelize.sync(), // Sync models with local database
      digitalOceanSequelize.sync(), // Sync models with Digital Ocean managed database
    ]);
  })
  .then(() => {
    console.log("Models have been synchronized with the Both database.");
    const PORT = process.env.NODE_DOCKER_PORT || 8084;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
