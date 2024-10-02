const foodService = require("../services/foodService");
const { Food } = require("../dto/requestDTO");
const { successResponse, errorResponse } = require("../dto/responseDTO");

const createFood = async (req, res) => {
  try {
    const validateFood = Food(req.body);
    const foods = await foodService.createFood(validateFood);
    res
      .status(201)
      .json(successResponse(foods, "Foods create successfully", 201));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

const getAllFoods = async (req, res) => {
  try {
    const foods = await foodService.getAllFoods();
    res
      .status(200)
      .json(successResponse(foods, "Foods retrieved successfully"));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

const updateFoods = async (req, res) => {
  try {
    const updatedFood = await foodService.updateFoods(req.params.id, req.body);
    res
      .status(200)
      .json(successResponse(updatedFood, "Food Update Successfuly"));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

const deleteFoods = async (req, res) => {
  try {
    await foodService.deleteFoods(req.params.id);
    res.status(200).json(successResponse(null, "Customer deleted succesfully"));
  } catch (error) {}
};
module.exports = {
  createFood,
  deleteFoods,
  updateFoods,
  getAllFoods,
};
