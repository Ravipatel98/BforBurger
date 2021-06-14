const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

require("./config/passport");
app.use(passport.initialize());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
mongoose.set("returnOriginal", false);

const itemRouter = require("./routes/item");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");

app.use("/item", itemRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
