const Joi = require("joi");

const createFoodSchema = Joi.object({
  food_name: Joi.string().required(),
  price: Joi.number().integer().required(),
  stock: Joi.number().integer().min(1).required(),
});
const updateFoodSchema = Joi.object({
  food_name: Joi.string().optional(),
  price: Joi.number().integer().optional(),
  stock: Joi.number().integer().min(1).optional(),
});

module.exports = {
  createFoodSchema,
  updateFoodSchema,
};
