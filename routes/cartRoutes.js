const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const cartController = require("../controllers/cartController");

router.use(authController.protect);

router
  .route("/")
  .get(cartController.getAllProductInCart)
  .post(cartController.addProductToCart);

router
  .route("/:id")
  .get(cartController.getProductInCart)
  .patch(cartController.addProductToCart)
  .delete(cartController.deleteProductFromCart);

module.exports = router;
