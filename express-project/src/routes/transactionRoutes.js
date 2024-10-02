const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const validate = require("../middlewares/validateMiddleware");
const {
  createTransactionSchema,
  updateTransactionSchema,
} = require("../utils/transactionValidation");

router.post(
  "/",
  validate(createTransactionSchema),
  transactionController.createTransaction
);
router.get("/", transactionController.getAllTransactions);
router.put(
  "/:id",
  validate(updateTransactionSchema),
  transactionController.updateTransactions
);

router.delete("/:id", transactionController.deleteTransaction);

module.exports = router;
