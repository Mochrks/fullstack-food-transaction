// dto/customerRequestDTO.js
const Customer = (data) => {
  const { name, phone, address } = data;

  if (!name) {
    throw new Error("Name is required");
  }

  if (phone && phone.length < 9) {
    throw new Error("Phone number is too short");
  }

  return data;
};

module.exports = {
  Customer,
};
