require("../model/databaseConnection");
const mongoose = require("mongoose")
const Cart = require("../model/cart");
const Product = require("../model/product");

exports.addtoCart = async (req, res) => {
  const user = req.user;
  const id= user.id;
  const { productId, quantity } = req.body;

  try {
    // Check if the product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }


    // Find the user's cart or create one if it doesn't exist
    let cart = await Cart.findOne({ user: id });

    if (!cart) {
      cart = new Cart({ user:id, items: [] });
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find(item => item.productId.equals(productId));

    if (existingItem) {
      // If the product is already in the cart, update its quantity
      existingItem.quantity += quantity;
    } else {
      // If the product is not in the cart, add a new item
      cart.items.push({ productId, quantity });
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add item to cart', details: error.message });
  }
};

  
exports.updateCart = async (req, res) => {
    const userId = req.params.userId;
    const updatedCart = req.body; 
  
    try {
      // Find the user's cart
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found for this user' });
      }
  
      // Update the cart data
      cart.items = updatedCart.items;
  
      // Save the updated cart
      await cart.save();
  
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update the cart' });
    }
  };

 