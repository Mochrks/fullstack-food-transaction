const Customer = (data) => {
  const { name, phone, address } = data;

  return data;
};

const Food = (data) => {
  const { food_name, price, stock } = data;
  return data;
};

const Transaction = (data) => {
  const { customer_id, food_id, qty, total_price, transaction_date } = data;
  return data;
};

module.exports = {
  Customer,
  Food,
  Transaction,
};
