const express = require("express");
const cors = require("cors");

const app = express();
const createError = require("http-errors");
const port = process.env.PORT || 5000;

const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./db");

connectDB();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Expense tracker backend is running");
});

const transactionRouter = require("./routes/transactions");
app.use("/api/transactions", transactionRouter);

app.use((req, res, next) => {
  // const err = new Error("Not found");
  // err.status = 404;
  // next(err);
  next(createError(404, "Not Found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(port, () =>
  console.log(`server started on port ${port} in ${process.env.NODE_ENV} Mode`)
);
