require("dotenv").config();
const mongoose = require("mongoose");
const { User } = require("../models/userModel");
const Transaction = require("../models/transactionModel");

const seedDB = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to MongoDB");

  // Clear existing data
  await User.deleteMany({});
  await Transaction.deleteMany({});

  // Create users (passwords will be hashed by the pre-save hook)
  const admin = await User.create({
    name: "Admin User",
    email: "admin@test.com",
    password: "admin123",
    role: "admin",
  });
  const analyst = await User.create({
    name: "Analyst User",
    email: "analyst@test.com",
    password: "analyst123",
    role: "analyst",
  });
  const viewer = await User.create({
    name: "Viewer User",
    email: "viewer@test.com",
    password: "viewer123",
    role: "viewer",
  });

  console.log("Users seeded");

  // Create ~20 transactions spread over the last 6 months
  const categories = [
    "salary",
    "freelance",
    "food",
    "rent",
    "utilities",
    "entertainment",
    "transport",
    "health",
  ];
  const transactions = [];
  for (let i = 0; i < 20; i++) {
    const isIncome = i % 3 === 0; // roughly 1/3 income, 2/3 expense
    const monthsAgo = Math.floor(Math.random() * 6);
    const date = new Date();
    date.setMonth(date.getMonth() - monthsAgo);
    date.setDate(Math.floor(Math.random() * 28) + 1);

    transactions.push({
      amount: parseFloat((Math.random() * 5000 + 100).toFixed(2)),
      type: isIncome ? "income" : "expense",
      category: categories[Math.floor(Math.random() * categories.length)],
      description: `Sample transaction #${i + 1}`,
      date,
      createdBy: admin._id,
    });
  }
  await Transaction.insertMany(transactions);
  console.log("Transactions seeded");

  console.log("\n--- Seed Complete ---");
  console.log("Admin login:   admin@test.com / admin123");
  console.log("Analyst login: analyst@test.com / analyst123");
  console.log("Viewer login:  viewer@test.com / viewer123");

  await mongoose.disconnect();
};

seedDB().catch(console.error);
