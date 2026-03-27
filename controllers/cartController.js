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

//get cart
exports.getCart=async(req,res)=>{
  try{
    const userId=req.user.userId

    //find cart and populate product details
    const cart=await Cart.findOne({user:userId})
    .populate("items.product")

    if(!cart){
      return res.json({message:"Cart is empty"})
    }
    res.json(cart)
  }catch(error){
    res.status(500).json({message:error.message})
  }
}

//update qty
exports.updateQuantity=async(req,res)=>{
  try{
    const userId=req.user.userId
    const {productId,quantity}=req.body;

    const cart=await Cart.findOne({user:userId})

    if(!cart){
      return res.status(404).json({message:"Cart added sucessfully"})
    }

    const itemIndex=cart.items.findIndex(
      item=>item.product.toString()===productId
    )

    if(itemIndex===-1){
      return res.status(400).json({message:"Product not in cart"})
    }

    //Imp logic
    if(quantity<1){
      return res.status(400).json({message:"Qty must be atleats1"})
    }

    cart.items[itemIndex].quantity=quantity;

    await cart.save()

    res.json({message:"Qty updated",cart})
  }catch(error){
    res.status(500).json({message:error.message})
  }
}

//Remove utem fromn cart
exports.removeFromCart=async(req,res)=>{
  try{
    const userId=req.user.userId;
    const {productId}=req.body
    const cart =await Cart.findOne({user: userId})

    if(!cart){
      return res.status(404).json({message:"Cart not founnd"})
    }

    //Remove item using filter
    cart.items=cart.items.filter(
      item=>item.product.toString()!==productId
    )
    await cart.save()
    res.json({message:"item removed",cart})
  }catch(error){
    res.status(500).json({message:error.message})
  }
}

