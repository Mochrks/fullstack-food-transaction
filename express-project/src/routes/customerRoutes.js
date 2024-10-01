const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const validate = require("../middlewares/validateMiddleware");
const {
  createCustomerSchema,
  updateCustomerSchema,
} = require("../utils/customerValidation");

// Create a new customer
router.post(
  "/",
  validate(createCustomerSchema),
  customerController.createCustomer
);

// Get all customers
router.get("/", customerController.getAllCustomers);

// Get a single customer by ID
router.get("/:id", customerController.getCustomerById);

// Update a customer by ID
router.put(
  "/:id",
  validate(updateCustomerSchema),
  customerController.updateCustomer
);

// Delete a customer by ID
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
