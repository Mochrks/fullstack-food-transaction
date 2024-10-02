require("dotenv").config();
const express = require("express");
const cors = require("cors");
const customerRoutes = require("./routes/customerRoutes");
const foodRoutes = require("./routes/foodRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const prisma = require("./prismaClient");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Cek connection db
async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("Connection success!");
  } catch (error) {
    console.error("Connection failed:", error);
    process.exit(1);
  }
}

checkDatabaseConnection();
// Routes
app.use("/customers", customerRoutes);
app.use("/foods", foodRoutes);
app.use("/transactions", transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
