const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");

mongoose
  .connect(config.mongoUrl)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

//errorHandler is the only middleware for now, therefore used by default
app.use(middleware);

module.exports = app;
