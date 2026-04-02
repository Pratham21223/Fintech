const Transaction = require("../models/transactionModel");
const getSummary = async (req, res, next) => {
  try {
    const result = await Transaction.aggregate([
      { $match: { isDeleted: false } }, // exclude deleted
      {
        $group: {
          _id: "$type", // group by "income" or "expense"
          total: { $sum: "$amount" }, // sum all amounts in each group
        },
      },
    ]);

    // Convert aggregation result into a readable object
    let totalIncome = 0,
      totalExpenses = 0;
    result.forEach((item) => {
      if (item._id === "income") totalIncome = item.total;
      if (item._id === "expense") totalExpenses = item.total;
    });

    res.json({
      success: true,
      data: {
        totalIncome,
        totalExpenses,
        netBalance: totalIncome - totalExpenses,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getCategoryBreakdown = async (req, res, next) => {
  try {
    const result = await Transaction.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: { category: "$category", type: "$type" }, //group by category + type
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } }, //highest totals first
    ]);

    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

const getMonthlyTrend = async (req, res, next) => {
  try {
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const result = await Transaction.aggregate([
      { $match: { isDeleted: false, date: { $gte: twelveMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            type: "$type",
          },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

const getRecentTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ isDeleted: false })
      .sort({ date: -1 })
      .limit(5)
      .populate("createdBy", "name email");

    res.json({ success: true, data: transactions });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getSummary,
  getCategoryBreakdown,
  getMonthlyTrend,
  getRecentTransactions,
};