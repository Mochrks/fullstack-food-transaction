const Joi = require("joi");

const createCustomerSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
});

const updateCustomerSchema = Joi.object({
  name: Joi.string().optional(),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
};
