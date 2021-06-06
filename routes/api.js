var express = require("express");
var authRouter = require("./auth");
var jobRouter = require("./job");

var app = express();

app.use("/auth/", authRouter);
app.use("/book/", jobRouter);

module.exports = app;