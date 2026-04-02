const router = require("express").Router();
const { body } = require("express-validator");
const authorize = require("../middlewares/rbac");
const validate = require("../middlewares/validate");
const {
  getAllUsers,
  updateUserRole,
  toggleUserStatus,
} = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");

// All user management routes: admin only
router.use(verifyToken, authorize("admin"));

router.get("/", getAllUsers);

router.patch(
  "/:id/role",
  [
    body("role")
      .isIn(["viewer", "analyst", "admin"])
      .withMessage("Role must be viewer, analyst, or admin"),
  ],
  validate,
  updateUserRole,
);

router.patch("/:id/status", toggleUserStatus);

module.exports = router;
