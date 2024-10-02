const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const validate = require("../middlewares/validateMiddleware");
const {
  createCustomerSchema,
  updateCustomerSchema,
} = require("../utils/customerValidation");

router.post(
  "/",
  validate(createCustomerSchema),
  customerController.createCustomer
);

router.get("/", customerController.getAllCustomers);

router.get("/:id", customerController.getCustomerById);

router.put(
  "/:id",
  validate(updateCustomerSchema),
  customerController.updateCustomer
);

router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
