const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const orderRoutes =
  require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.log("MongoDB connection error:", error));

// Product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String
});

const Product = mongoose.model("Product", productSchema);

// Test route
app.get("/", (req, res) => {
  res.send("Adidas backend is running");
});

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error getting products" });
  }
});

// Add product
app.post("/api/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error adding product" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});