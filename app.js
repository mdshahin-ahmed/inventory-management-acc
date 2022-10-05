const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

// routes
const productRoute = require("./routs/product.route");
const brandRoute = require("./routs/brand.route");
const categoryRoute = require("./routs/category.route");
const storeRoute = require("./routs/store.route");
const supplierRoute = require("./routs/supplier.route");
const stockRoute = require("./routs/stock.route");
const userRoute = require("./routs/user.route");

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

// posting to detabase
app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/store", storeRoute);
app.use("/api/v1/supplier", supplierRoute);
app.use("/api/v1/stock", stockRoute);
app.use("/api/v1/user", userRoute);

module.exports = app;
