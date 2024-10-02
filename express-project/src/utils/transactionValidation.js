const Joi = require("joi");

const createTransactionSchema = Joi.object({
  customer_id: Joi.number().integer().required(),
  food_id: Joi.number().integer().required(),
  qty: Joi.number().integer().min(1).required(),
  // total_price: Joi.number().integer().min(1).optional(),
  // transaction_date: Joi.date().required(),
});
const updateTransactionSchema = Joi.object({
  customer_id: Joi.number().integer().optional(),
  food_id: Joi.number().integer().optional(),
  qty: Joi.number().integer().min(1).optional(),
  // total_price: Joi.number().integer().min(1).optional(),
  // transaction_date: Joi.date().required(),
});

module.exports = {
  createTransactionSchema,
  updateTransactionSchema,
};
