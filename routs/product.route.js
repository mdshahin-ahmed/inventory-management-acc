const express = require("express");
const router = express.Router();
const productControler = require("../controlars/product.controlar");
const authorization = require("../middleware/authorization");
const uploader = require("../middleware/uploader");
const verifyToken = require("../middleware/verifyToken");

router.post(
  "/file-upload",
  uploader.array("image"),
  productControler.fileUpload
);
// <input type="file" name="image" />

// const formData = new formData();
// formData.append('image',formData)

// diffrent first
router.route("/bulk-update").patch(productControler.bulkUpdateProduct);
router.route("/bulk-delete").delete(productControler.bulkDeleteProduct);

// root middle
router
  .route("/")
  .get(productControler.getProducts)
  .post(
    verifyToken,
    authorization("admin", "store-manager"),
    productControler.createProduct
  );
// dynamic last
router
  .route("/:id")
  .patch(productControler.updateProductById)
  .delete(authorization("admin"), productControler.deleteProductById);

module.exports = router;
