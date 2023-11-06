const mongoose = require("mongoose")
const OrdersSchema =  new mongoose.Schema({
 
total:{type:Number },
quantity:{type:Number},
status :{type:String},
userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
    default: Date.now, 
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        // required: true,
      },
      quantity: {
        type: Number,
        required: true,
  
      },
    },
  ],
  shippingAddress:{type:String}

})
module.exports = mongoose.model("Order",OrdersSchema)