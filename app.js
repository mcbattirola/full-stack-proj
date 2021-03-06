const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const bodyParser = require("body-parser");
const path = require("path");
const logger = require("./middleware/logger");
const startupDebugger = require("debug")("app:startup");
const databaseDebugger = require("debug")("app:db");
const users = require("./routes/users");
const transfer = require("./routes/transfer");
const home = require("./routes/home");
const contacts = require("./routes/contacts");
const auth = require("./routes/auth");

const app = express();

//Mongo connection
databaseDebugger("===Starting Mongo Connection===");
mongoose
  .connect(config.get("db.path"), { useNewUrlParser: true })
  .then(() => databaseDebugger("Connected to mongodb"))
  .catch(() => databaseDebugger("Failed to connected to mongodb"));

//Configuration
startupDebugger("Application name:", config.get("name"));
startupDebugger(`app environment: ${app.get("env")}`);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //key=value&key=value
app.use(express.static("public"));
app.use(helmet());
app.use(morgan("tiny")); //for logging
app.use(logger);

//Routing
app.use("/", home);
app.use("/api/users", users);
app.use("/api/transfer", transfer);
app.use("/api/auth", auth);
app.get("*", home);
// app.use("/api/users/:id/contacts", contacts);

//PORT listening
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
