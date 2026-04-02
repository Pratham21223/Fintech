const Transaction = require("../models/transactionModel");
const createTransaction = async (req, res, next) => {
  try {
    const { amount, type, category, description, date } = req.body;
    const transaction = await Transaction.create({
      amount,
      type,
      category,
      description,
      date,
      createdBy: req.user.userId,
    });
    res.status(201).json({
      success: true,
      message: "Transaction created",
      data: transaction,
    });
  } catch (err) {
    next(err);
  }
};

const getTransactions = async (req, res, next) => {
  try {
    const {
      type,
      category,
      startDate,
      endDate,
      search,
      page = 1,
      limit = 10,
      sort = "-date",
    } = req.query;

    // Excluding soft-deleted entries
    const filter = { isDeleted: false };

    if (type) filter.type = type; // ?type=income
    if (category) filter.category = new RegExp(category, "i"); // i for insensitive search
    if (startDate || endDate) {
      // ?startDate=2025-01-01&endDate=2025-12-31
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    if (search) {
      // Normal search for descrption and category
      filter.$or = [
        { description: new RegExp(search, "i") },
        { category: new RegExp(search, "i") },
      ];
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [transactions, total] = await Promise.all([
      Transaction.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limitNum)
        .populate("createdBy", "name email"), //show who created it
      Transaction.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: transactions,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (err) {
    next(err);
  }
};

const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      isDeleted: false,
    }).populate("createdBy", "name email");
    if (!transaction)
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    res.json({ success: true, data: transaction });
  } catch (err) {
    next(err);
  }
};

const updateTransaction = async (req, res, next) => {
  try {
    const { amount, type, category, description, date } = req.body;
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { amount, type, category, description, date },
      { new: true, runValidators: true },
    );
    if (!transaction)
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    res.json({
      success: true,
      message: "Transaction updated",
      data: transaction,
    });
  } catch (err) {
    next(err);
  }
};

const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true }, // just flip the flag, don't actually delete
      { new: true },
    );
    if (!transaction)
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    res.json({ success: true, message: "Transaction deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
