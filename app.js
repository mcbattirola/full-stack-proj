const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

//PORT
app.listen("3000", () => {
  console.log("server started on port 3000");
});

app.get("/", (req, res) => {
  res.send("its alive!");
});

app.get("/api/accounts", (req, res) => {
  res.send([1, 2, 3]);
});
