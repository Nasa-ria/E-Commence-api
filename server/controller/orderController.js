require("../model/databaseConnection");
const Order = require("../model/order");
const User = require("../model/user")

exports.create = async(req, res)=>{
    const { userId, Orderdate, products } = req.body;

  // Create a new order instance
  const newOrder = new Order({
    userId,
    Orderdate,
    products: []  
  });

  // Iterate through the products array from req.body and add them to the order
  for (const productData of products) {
    const { productId, quantity } = productData;

    // Push a new product object into the products array
    newOrder.products.push({
      productId,
      quantity
    });
}
}


exports.update = (req, res) => {
  const orderId = req.params.id; // Assuming you receive the order ID in the URL
  const { productId, quantity,status } = req.body;

  // Find the order by ID
  Order.findById(orderId, (err, order) => {
    if (err) {
      // Handle the error, e.g., send an error response
      return res.status(500).json({ error: 'Could not find the order' });
    }

    // Find the product within the order based on the productId
    const productToUpdate = order.products.find((product) => product.productId == productId);

    if (!productToUpdate) {
      // Handle the case where the product is not found in the order
      return res.status(404).json({ error: 'Product not found in the order' });
    }

    // Update the product's quantity
    productToUpdate.quantity = quantity;
    productToUpdate.status = status;

    // Save the updated order
    order.save((err) => {
      if (err) {
        // Handle the error, e.g., send an error response
        return res.status(500).json({ error: 'Could not update the order' });
      }

      // Order updated successfully, send a success response
      res.status(200).json(order);
    });
  });
};

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

