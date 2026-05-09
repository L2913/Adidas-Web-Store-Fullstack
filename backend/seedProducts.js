const mongoose = require("mongoose");
require("dotenv").config();

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String
});

const Product = mongoose.model("Product", productSchema);

const products = [
  { name: "Ultraboost 22", price: 11200, image: "/ultraboost-22.png", description: "Comfortable running shoes." },
  { name: "NMD_R1", price: 8120, image: "/nmd-r1.jpg", description: "Modern streetwear shoes." },
  { name: "Superstar", price: 5800, image: "/superstar.png", description: "Classic Adidas shoes." },
  { name: "Stan Smith", price: 6380, image: "/stan-smith.png", description: "Clean white lifestyle shoes." },
  { name: "Forum Low", price: 5800, image: "/forum-low.png", description: "Retro basketball-inspired shoes." },
  { name: "Gazelle", price: 5800, image: "/gazelle.png", description: "Classic casual sneakers." },
  { name: "Samba OG", price: 6960, image: "/samba-og.png", description: "Iconic indoor-style sneakers." },
  { name: "Adizero SL", price: 6960, image: "/adizero-sl.png", description: "Lightweight running shoes." }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products added successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

seedProducts();