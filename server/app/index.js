require("dotenv").config();
const express = require("express");

const app = express();

const PORT = process.env.NODE_DOCKER_PORT || process.env.NODE_LOCAL_PORT;

app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
