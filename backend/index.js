require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoute");
const dashboardRoutes = require("./routes/dashboardRoute");

const app = express();
const PORT = process.env.PORT || 3000;

//Global middlewares
app.use(cors());
app.use(helmet()); // for secure headers
app.use(morgan("dev")); // request logging
app.use(express.json()); // parse JSON bodies
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // 100requests/15min

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);

//Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

//Db Setup
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
});
