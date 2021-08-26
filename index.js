const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");

dotenv.config();

//mondodb
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("mongodb is connected");
  }
);

//midlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// routers
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.listen(5000, () => {
  console.log("Backend server is running at port 5000");
});
