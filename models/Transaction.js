const mongoose = require("mongoose");
const TransactionSchema = new mongoose.Schema({
  item: { type: String, trim: true, required: [true, "Please, enter an item"] },
  amount: {
    type: Number,
    required: [true, "Please, enter an amount"],
  },
  createdAt: { type: Date, default: new Date() },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;
