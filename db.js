const mongoose = require("mongoose");

const MONGO_URI = () => {
  if (process.env.NODE_ENV === "development") {
    return process.env.DB_URI;
  }
  return process.env.MONGO_URI;
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI(), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`DB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDB;
