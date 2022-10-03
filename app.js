const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

// routes
const productRoute = require("./routs/product.route");
const brandRoute = require("./routs/brand.route");

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

// posting to detabase
app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);

module.exports = app;
