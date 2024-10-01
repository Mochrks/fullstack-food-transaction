require("dotenv").config();
const express = require("express");
const cors = require("cors");
const customerRoutes = require("./routes/customerRoutes");
const prisma = require("./prismaClient");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Cek koneksi db
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
