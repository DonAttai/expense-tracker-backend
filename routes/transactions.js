const express = require("express");

const router = express.Router();

const {
  getTransactions,
  addTransaction,
  removeTransaction,
} = require("../controllers/transactionContoller");

// GET ALL TRANSACTIONS
router.get("/", getTransactions);

// CREATE A TRANSACTION
router.post("/", addTransaction);

// DELETING TRANSACTION
router.delete("/:id", removeTransaction);

module.exports = router;
