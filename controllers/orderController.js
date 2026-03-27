const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// PLACE ORDER
exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user.userId;

    // 1️⃣ Get user's cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2️⃣ Calculate total price
    let total = 0;
    
    for (const item of cart.items) {
  // 🔴 Check stock
  if (item.product.stock < item.quantity) {
    return res.status(400).json({
      message: `Not enough stock for ${item.product.name}`
    });
  }

  // ✅ Reduce stock
  item.product.stock -= item.quantity;
  await item.product.save();

  // 💰 Calculate total
  total += item.product.price * item.quantity;
}
    

    // 3️⃣ Create order
    const order = new Order({
      user: userId,
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      })),
      totalAmount: total
    });

    await order.save();

    // 4️⃣ Clear cart
    cart.items = [];
    await cart.save();

    res.json({ message: "Order placed successfully", order });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get user order
exports.getOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await Order.find({ user: userId })
      .populate("items.product")
      .sort({ createdAt: -1 }); // latest first

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};