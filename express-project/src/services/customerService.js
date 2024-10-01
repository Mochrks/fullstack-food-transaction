const prisma = require("../prismaClient");

const createCustomer = async (data) => {
  return await prisma.customer.create({ data });
};

const getAllCustomers = async () => {
  return await prisma.customer.findMany();
};

const getCustomerById = async (id) => {
  return await prisma.customer.findUnique({
    where: { customer_id: parseInt(id) },
  });
};

const updateCustomer = async (id, data) => {
  return await prisma.customer.update({
    where: { customer_id: parseInt(id) },
    data,
  });
};

const deleteCustomer = async (id) => {
  return await prisma.customer.delete({
    where: { customer_id: parseInt(id) },
  });
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
