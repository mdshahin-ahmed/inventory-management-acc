const express = require("express");
const router = express.Router();
const stockController = require("../controlars/stock.controlar");

// router.route("/bulk-update").patch(stockController.bulkUpdateProduct);
// router.route("/bulk-delete").delete(stockController.bulkDeleteProduct);

router
  .route("/")
  .get(stockController.getStocks)
  .post(stockController.createStock);

router.route("/:id").get(stockController.getStockById);
// .patch(stockController.updateStockById)
// .delete(stockController.deleteStockById)

module.exports = router;
