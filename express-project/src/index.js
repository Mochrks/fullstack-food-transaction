require("dotenv").config();
const express = require("express");
const cors = require("cors");
const customerRoutes = require("./routes/customerRoutes");
const foodRoutes = require("./routes/foodRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const { connectDB, disconnectDB } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Cek connection db
connectDB();

// Routes
app.use("/customers", customerRoutes);
app.use("/foods", foodRoutes);
app.use("/transactions", transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("SIGINT", async () => {
  await disconnectDB();
  process.exit(0);
});
