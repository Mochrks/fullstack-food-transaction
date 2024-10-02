const prisma = require("./prismaClient");

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Error connecting to the database", error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log("🛑 Database disconnected successfully");
  } catch (error) {
    console.error("❌ Error disconnecting from the database", error);
  }
};

module.exports = {
  connectDB,
  disconnectDB,
};
