require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan"); // logger
// Required Dependencies

// db setup
const sequelize = require("./utils/db");

// Models setup

const Employee = require("./models/employeeModel");
const Admin = require("./models/adminModel");

const models = {
  Employee,
  Admin,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});
const app = express();

// CORS policy
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json()); // body parser
app.use(express.urlencoded({ extended: true })); //
app.get("/dev", (req, res) => {
  res.send("RICH Backend");
});

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
    return sequelize.sync();
  })
  .then(() => {
    console.log("Models have been synchronized with the database.");

    const PORT = process.env.NODE_DOCKER_PORT || process.env.NODE_LOCAL_PORT;

    app.listen(PORT, () => {
      console.log(`Server is Running on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
