require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const authRoutes=require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes=require("./routes/cartRoutes")
const errorMiddleWare=require("./middleware/errorMiddleware")
const rateLimit=require("express-rate-limit")
const morgan=require("morgan")

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("E-commerce API running 🚀");
});

app.use("/api/auth",authRoutes)
app.use("/api/products",productRoutes)

app.use("/api/cart",cartRoutes)

app.use("/api/orders",orderRoutes)
app.use("/uploads",express.static("uploads"))

app.use(errorMiddleWare)

const limiter=rateLimit({
  windowsMs: 15*60*1000,
  max:100
})

app.use(limiter)

app.use(morgan("dev"))

app.listen(5000, () => {
  console.log("Server running on port 5000");
});