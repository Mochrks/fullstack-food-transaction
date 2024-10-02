const prisma = require("../config/prismaClient");

const createFood = async (data) => {
  return await prisma.foods.create({ data });
};

const getAllFoods = async () => {
  return await prisma.foods.findMany();
};

const updateFoods = async (id, data) => {
  return await prisma.foods.update({ where: { food_id: parseInt(id) }, data });
};

const deleteFoods = async (id) => {
  return await prisma.foods.delete({ where: { food_id: parseInt(id) } });
};

module.exports = {
  createFood,
  getAllFoods,
  updateFoods,
  deleteFoods,
};
