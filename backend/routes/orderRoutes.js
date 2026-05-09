const express = require("express");

const Order = require("../models/Order");

const router = express.Router();


// CREATE ORDER
router.post("/", async (req, res) => {

  try {

    const newOrder = new Order(req.body);

    await newOrder.save();

    res.json({
      message: "Order saved successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error saving order"
    });
  }
});


// GET ALL ORDERS
router.get("/", async (req, res) => {

  try {

   const { username } = req.query;

const filter = username ? { username } : {};

const orders = await Order.find(filter)
  .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching orders"
    });
  }
});

module.exports = router;