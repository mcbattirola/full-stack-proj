const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const bodyParser = require("body-parser");
const path = require("path");
const logger = require("./middleware/logger");
const authenticate = require("./middleware/authenticate");
const startupDebugger = require("debug")("app:startup");
const databaseDebugger = require("debug")("app:db");
const accounts = require("./routes/accounts");
const home = require("./routes/home");

const app = express();

//Configuration
startupDebugger("Application name:", config.get("name"));
startupDebugger("Mail server:", config.get("mail.host"));
startupDebugger("mail password:", config.get("mail.password"));
startupDebugger(`app: ${app.get("env")}`);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //key=value&key=value
app.use(express.static("public"));
app.use(helmet());
app.use(morgan("tiny")); //for logging
app.use(logger);
app.use(authenticate);
//Routing
app.use("/api/accounts", accounts);
app.use("/", home);

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
