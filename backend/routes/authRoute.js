const express = require("express");
const { body } = require("express-validator");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validate,
  registerUser,
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  loginUser,
);

router.get("/profile", verifyToken, getUserProfile);

module.exports = router;
