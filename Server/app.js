const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");

const products = require("./routes/productRoutes");
const auth = require("./routes/authRoutes");
const order = require("./routes/orderRoutes");

//to access json file data
app.use(express.json());

app.use(cookieParser());

//middleware for body parser
app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);

//using error middleware
app.use(errorMiddleware);

module.exports = app;
