require("../model/databaseConnection");
const Cart = require("../model/cart");
const Product = require("../model/product");
const Order = require("../model/order")
const User = require("../model/user")

exports.addtoCart =  async (req, res) => {
    const userId = req.params.userId;
    const { productId, quantity } = req.body;
  
    try {
      // Find the user's cart or create one if it doesn't exist
      let cart = await Cart.findOne({ _id: userId });
  
      if (!cart) {
        cart = new Cart({ _id: userId, items: [] });
      }
  
      // Check if the product is already in the cart
      const existingItem = cart.items.find(item => item.productId.equals(productId));
  
      if (existingItem) {
        // If the product is already in the cart, update its quantity
        existingItem.quantity += quantity;
      } else {
        // If the product is not in the cart, add a new item
        cart.items.push({ product: productId, quantity });
      }
  
      // Save the updated cart
      await cart.save();
  
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add item to cart' });
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

  exports.checkout = async (req, res) => {
    const { userId, shippingAddress, paymentInfo, cart } = req.body;
  
    try {
      // Create a new order document
      const order = new Order({
        userId,
        shippingAddress,
        items: cart.items,
        // Calculate the order total based on cart items and additional fees
      });
  
      // Process payment using the Stripe payment gateway
      const stripePayment = await stripe.charges.create({
        amount: order.total * 100, // Amount in cents
        currency: 'usd', // Change to your desired currency
        source: paymentInfo.token, // Payment token obtained from the frontend
      });
  
      if (stripePayment.status === 'succeeded') {
        // Save the order to the database
        await order.save();
  
        // Deduct inventory (if applicable)
        for (const item of cart.items) {
          // Assuming you have a Product model
          const product = await Product.findById(item.product);
          if (product) {
            product.quantity -= item.quantity;
            await product.save();
          }
        }
  
        // Update the user's order history
        const user = await User.findById(userId);
        if (user) {
          user.orderHistory.push(order); // Assuming you have an orderHistory field in the User model
          await user.save();
        }
  
        // Send an order confirmation email
  
        // Clear or update the user's cart
        const userCart = await Cart.findOne({ userId });
      if (userCart) {
        userCart.items = []; // Clear all items in the cart
        await userCart.save();
      }
  
        // Redirect to a confirmation page
        res.status(200).json({ message: 'Order processed successfully' });
      } else {
        res.status(400).json({ error: 'Payment processing failed' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to process the order' });
    }
  };
  