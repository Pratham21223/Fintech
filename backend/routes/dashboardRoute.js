const router = require("express").Router();
const {verifyToken} = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/rbac");
const {
  getSummary,
  getCategoryBreakdown,
  getMonthlyTrend,
  getRecentTransactions,
} = require("../controllers/dashboardController");

// All dashboard routes: analyst + admin only
router.use(verifyToken, authorize("analyst", "admin"));

router.get("/summary", getSummary);
router.get("/category-breakdown", getCategoryBreakdown);
router.get("/monthly-trend", getMonthlyTrend);
router.get("/recent", getRecentTransactions);

module.exports = router;