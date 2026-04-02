const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {
    amount: { type: Number, required: true, min: 0.01 },
    type: { type: String, enum: ["income", "expense"], required: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    date: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isDeleted: { type: Boolean, default: false }, //Deleted flag so they are easily recoverable 
  },
  { timestamps: true },
);

// For faster queries on filter fields
transactionSchema.index({ type: 1, category: 1, date: -1 });
transactionSchema.index({ isDeleted: 1 });

module.exports = model("Transaction", transactionSchema);