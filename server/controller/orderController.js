require("../model/databaseConnection");
const Order = require("../model/order");
const User = require("../model/user");
const Product = require("../model/product");
const Cart = require("../model/cart")

// exports.create = async(req, res)=>{
//     const { orderDate, products } = req.body;
// console.log(req.user);
//   // Create a new order instance
//   const newOrder = new Order({
//     userId :req.user.id,
//     orderDate,
//     products: []  
//   });
//  console.log(newOrder)
//   // Iterate through the products array from req.body and add them to the order
//   for (const productData of products) {
//     const { productId, quantity } = productData;

//     // Push a new product object into the products array
//     newOrder.products.push({
//       productId,
//       quantity
//     });
// }
// }




// exports.update = (req, res) => {
//   const orderId = req.params.id; // Assuming you receive the order ID in the URL
//   const { productId, quantity,status } = req.body;

//   // Find the order by ID
//   Order.findById(orderId, (err, order) => {
//     if (err) {
//       // Handle the error, e.g., send an error response
//       return res.status(500).json({ error: 'Could not find the order' });
//     }

//     // Find the product within the order based on the productId
//     const productToUpdate = order.products.find((product) => product.productId == productId);

//     if (!productToUpdate) {
//       // Handle the case where the product is not found in the order
//       return res.status(404).json({ error: 'Product not found in the order' });
//     }

//     // Update the product's quantity
//     productToUpdate.quantity = quantity;
//     productToUpdate.status = status;

//     // Save the updated order
//     order.save((err) => {
//       if (err) {
//         // Handle the error, e.g., send an error response
//         return res.status(500).json({ error: 'Could not update the order' });
//       }

//       // Order updated successfully, send a success response
//       res.status(200).json(order);
//     });
//   });
// };

exports.order= async(req,res)=>{
  const id = req.params.id;
  const order = await Order.findById(id);
  res.status(201).json(order);
}

exports.findOrdersByUser = (req, res) => {
  const userId = req.params.userId; // Assuming you receive the user ID in the URL parameters

  // Use Mongoose to find orders with a matching userId
  Order.find({ userId: userId }, (err, orders) => {
    if (err) {
      // Handle the error, e.g., send an error response
      return res.status(500).json({ error: 'Could not retrieve orders' });
    }

    // Orders found successfully, send a success response
    res.status(200).json(orders);
  });
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
