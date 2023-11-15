const mongoose = require("mongoose")
const CartsSchema =  new mongoose.Schema({   
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 

  },
      items: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product', 
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          }
        },
      ],
    });

module.exports = mongoose.model("Cart",CartsSchema)