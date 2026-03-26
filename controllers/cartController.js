const Cart = require("../models/Cart");

// ADD TO CART
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.userId; // from token
    const { productId } = req.body;

    // 1️⃣ Find cart of user
    let cart = await Cart.findOne({ user: userId });

    // 2️⃣ If no cart → create new cart
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity: 1 }]
      });

      await cart.save();

      return res.json({ message: "Product added to new cart", cart });
    }

    // 3️⃣ Check if product already exists
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    // 4️⃣ If product exists → increase quantity
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } 
    // 5️⃣ Else → add new product
    else {
      cart.items.push({ product: productId, quantity: 1 });
    }

    // 6️⃣ Save updated cart
    await cart.save();

    res.json({ message: "Cart updated", cart });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};