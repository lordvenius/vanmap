const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const items = require("./routes/api/items");

const app = express();

// Middleware

app.use(bodyParser.json());
app.use(cors());

// DB Config

const db = require("./config/Keys").mongouri;

// Connect to Mongo

mongoose
  .connect(db)
  .then(() => console.log("mongoDB Connected"))
  .catch((err) => console.log(err));

// use routes
app.use("/api/items", items);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`sever started on port ${port}`));
