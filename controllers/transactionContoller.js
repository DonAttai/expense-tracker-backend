const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");
const createError = require("http-errors");

(exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({});
    res.json({ data: transactions, count: transactions.length });
  } catch (error) {
    next(error);
  }
}),
  (exports.addTransaction = async (req, res, next) => {
    try {
      const transaction = new Transaction(req.body);
      const newTransaction = await transaction.save();
      res.status(201).json({ data: newTransaction });
    } catch (error) {
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map(
          (value) => value.message
        );
        return res.status(400).json({
          error: messages,
        });
        // return next(createError(422, error.messages));
      }

      next(error);
    }
  }),
  (exports.removeTransaction = async (req, res, next) => {
    try {
      const id = req.params.id;
      const transaction = await Transaction.findByIdAndDelete(id);
      if (!transaction) {
        throw next(createError(404, "Transaction does not exist"));
      }
      res.status(200).json({ data: {} });
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Transaction id"));
      }
      next(error);
    }
  });
