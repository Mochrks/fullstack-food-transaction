const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodController");
const validate = require("../middlewares/validateMiddleware");

const {
  createFoodSchema,
  updateFoodSchema,
} = require("../utils/foodValidation");

router.post("/", validate(createFoodSchema), foodController.createFood);

router.get("/", foodController.getAllFoods);
// router.get("/:id", foodController.getCustomerById);
router.put("/:id", validate(updateFoodSchema), foodController.updateFoods);
router.delete("/:id", foodController.deleteFoods);

module.exports = router;
