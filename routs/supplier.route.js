const express = require("express");
const supplierController = require("../controlars/supplier.controlar");

const router = express.Router();

router
  .route("/")
  .post(supplierController.createSupplier)
  .get(supplierController.getSuppliers);

router
  .route("/:id")
  .get(supplierController.getSupplierById)
  .patch(supplierController.updateSupplier);

module.exports = router;
