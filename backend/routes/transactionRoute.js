const router = require("express").Router();
const { body } = require("express-validator");
const { verifyToken } = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/rbac");
const validate = require("../middlewares/validate");
const {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

// Authentication required to access any transaction route
router.use(verifyToken);

// Viewing for all users
router.get("/", getTransactions);
router.get("/:id", getTransactionById);

//For Admin only
router.post(
  "/",
  authorize("admin"),
  [
    body("amount")
      .isFloat({ min: 0.01 })
      .withMessage("Amount must be greater than 0"),
    body("type")
      .isIn(["income", "expense"])
      .withMessage("Type must be income or expense"),
    body("category").notEmpty().withMessage("Category is required"),
    body("date")
      .optional()
      .isISO8601()
      .withMessage("Date must be a valid ISO date"),
  ],
  validate,
  createTransaction,
);

router.put(
  "/:id",
  authorize("admin"),
  [
    body("amount")
      .optional()
      .isFloat({ min: 0.01 })
      .withMessage("Amount must be greater than 0"),
    body("type")
      .optional()
      .isIn(["income", "expense"])
      .withMessage("Type must be income or expense"),
    body("category").optional().notEmpty().withMessage("Category is required"),
    body("date")
      .optional()
      .isISO8601()
      .withMessage("Date must be a valid ISO date"),
  ],
  validate,
  updateTransaction,
);

router.delete("/:id", authorize("admin"), deleteTransaction);

module.exports = router;
