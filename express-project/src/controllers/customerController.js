const customerService = require("../services/customerService");
const { successResponse, errorResponse } = require("../dto/responseDTO");
const { Customer } = require("../dto/requestDTO");

const createCustomer = async (req, res) => {
  try {
    const validatedData = Customer(req.body);
    const customer = await customerService.createCustomer(validatedData);

    res
      .status(201)
      .json(successResponse(customer, "Customer created successfully", 201));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await customerService.getAllCustomers();
    const totalCustomers = customers.length;
    res
      .status(200)
      .json(
        successResponse(
          customers,
          "Customers retrieved successfully",
          200,
          totalCustomers
        )
      );
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer = await customerService.getCustomerById(req.params.id);
    if (!customer)
      return res.status(404).json(errorResponse("Customer not found", 404));
    res
      .status(200)
      .json(successResponse(customer, "Customer retrieved successfully"));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

const updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await customerService.updateCustomer(
      req.params.id,
      req.body
    );
    res
      .status(200)
      .json(successResponse(updatedCustomer, "Customer updated successfully"));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

const deleteCustomer = async (req, res) => {
  try {
    await customerService.deleteCustomer(req.params.id);
    res
      .status(200)
      .json(successResponse(null, "Customer deleted successfully"));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
