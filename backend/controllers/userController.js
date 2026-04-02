const { User } = require("../models/userModel");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password"); // never return passwords
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body; // expected: "viewer", "analyst", or "admin"

    // Safety: admin can't demote themselves
    if (req.params.id === req.user.userId)
      return res
        .status(400)
        .json({ success: false, message: "Cannot change your own role" });

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true },
    ).select("-password");

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, message: `Role updated to ${role}`, data: user });
  } catch (err) {
    next(err);
  }
};

const toggleUserStatus = async (req, res, next) => {
  try {
    // Safety: admin can't deactivate themselves
    if (req.params.id === req.user.userId)
      return res.status(400).json({
        success: false,
        message: "Cannot deactivate your own account",
      });

    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    user.isActive = !user.isActive; // flip the boolean
    await user.save();

    res.json({
      success: true,
      message: `User ${user.isActive ? "activated" : "deactivated"}`,
      data: { id: user._id, name: user.name, isActive: user.isActive },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllUsers,
  updateUserRole,
  toggleUserStatus,
};
