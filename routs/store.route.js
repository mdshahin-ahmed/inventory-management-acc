const express = require("express");
const router = express.Router();
const storeController = require("../controlars/store.controller");

router
  .route("/")
  .get(storeController.getStores)
  .post(storeController.createStore);

router.route("/:id").get(storeController.getStoreById);

module.exports = router;
