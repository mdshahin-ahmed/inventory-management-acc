const express = require("express");
const router = express.Router();
const productControler = require("../controlars/product.controlar");

// diffrent first
router.route("/bulk-update").patch(productControler.bulkUpdateProduct);
router.route("/bulk-delete").delete(productControler.bulkDeleteProduct);

// root middle
router
  .route("/")
  .get(productControler.getProducts)
  .post(productControler.createProduct);
// dynamic last
router
  .route("/:id")
  .patch(productControler.updateProductById)
  .delete(productControler.deleteProductById);

module.exports = router;
