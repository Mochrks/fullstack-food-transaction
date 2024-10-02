const prisma = require("../prismaClient");

const createTransaction = async (data) => {
  const food = await prisma.foods.findUnique({
    where: { food_id: data.food_id },
  });
  if (!food) throw new Error("Food not found");
  if (food.stock < data.qty) throw new Error("Insufficient stock");

  const totalPrice = data.qty * food.price;

  const transaction = await prisma.transactions.create({
    data: {
      customer_id: data.customer_id,
      food_id: data.food_id,
      qty: data.qty,
      total_price: totalPrice,
    },
  });

  await prisma.foods.update({
    where: { food_id: data.food_id },
    data: { stock: food.stock - data.qty },
  });

  return transaction;
};

const getAllTransactions = async () => {
  return await prisma.transactions.findMany({
    include: { customer: true, foods: true },
  });
};

const updateTransactions = async (id, data) => {
  const existingTransaction = await prisma.transactions.findUnique({
    where: { transaction_id: parseInt(id) },
  });
  if (!existingTransaction) throw new Error("Transaction not found");

  const food = await prisma.foods.findUnique({
    where: { food_id: data.food_id },
  });
  if (!food) throw new Error("Food not found");

  const qtyDifference = data.qty - existingTransaction.qty;

  if (qtyDifference > 0 && food.stock < qtyDifference) {
    throw new Error("Insufficient stock");
  }

  const totalPrice = data.qty * food.price;

  const transaction = await prisma.transactions.update({
    where: { transaction_id: parseInt(id) },
    data: {
      customer_id: data.customer_id,
      food_id: data.food_id,
      qty: data.qty,
      total_price: totalPrice,
    },
  });

  await prisma.foods.update({
    where: { food_id: data.food_id },
    data: { stock: food.stock - qtyDifference },
  });

  return transaction;

  // return await prisma.transactions.update({
  //   where: { transaction_id: parseInt(id) },
  //   data,
  // });
};

const deleteTransaction = async (id) => {
  const transaction = await prisma.transactions.delete({
    where: { transaction_id: parseInt(id) },
  });

  await prisma.foods.update({
    where: { food_id: transaction.food_id },
    data: { stock: { increment: transaction.qty } },
  });

  return transaction;
};

module.exports = {
  createTransaction,
  getAllTransactions,
  deleteTransaction,
  updateTransactions,
};
