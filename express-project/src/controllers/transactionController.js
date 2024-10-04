const transactionService = require("../services/transactionService");
const { successResponse, errorResponse } = require("../dto/responseDTO");
const { Transaction } = require("../dto/requestDTO");
const createTransaction = async (req, res) => {
  try {
    const validatedTransaction = Transaction(req.body);
    const transaction = await transactionService.createTransaction(
      validatedTransaction
    );
    res
      .status(201)
      .json(
        successResponse(transaction, "Transaction create successfully", 201)
      );
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getAllTransactions();
    const totalData = transactions.length;
    res
      .status(200)
      .json(
        successResponse(
          transactions,
          "Transaction retrieved successfully",
          200,
          totalData
        )
      );
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

const updateTransactions = async (req, res) => {
  try {
    const updatedTransactions = await transactionService.updateTransactions(
      req.params.id,
      req.body
    );
    res
      .status(200)
      .json(
        successResponse(updatedTransactions, "Transaction Update Successfuly")
      );
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

const deleteTransaction = async (req, res) => {
  try {
    await transactionService.deleteTransaction(req.params.id);
    res
      .status(200)
      .json(successResponse(null, "Transaction deleted succesfully"));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  deleteTransaction,
  updateTransactions,
};
