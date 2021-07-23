const express = require("express");
const authController = require("../controllers/authController");
const transactionController = require("../controllers/transactionController");
const router = express.Router();

router.use(authController.protect);

router.route("/me").get(transactionController.getAllTransactionByIdCurrentUser);
router.route("/:id/user").get(transactionController.getAllTransactionByIdUser);

router
  .route("/")
  .get(transactionController.getAllTransaction)
  .post(transactionController.addTransaction);

router
  .route("/:id")
  .get(transactionController.getTransaction)
  .patch(transactionController.updateTransaction)
  .delete(transactionController.deleteTransaction);

module.exports = router;
