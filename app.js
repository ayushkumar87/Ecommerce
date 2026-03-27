require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const authRoutes=require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes=require("./routes/cartRoutes")

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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});