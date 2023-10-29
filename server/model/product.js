const mongoose = require("mongoose")
const ProductsSchema =  new mongoose.Schema({   
   name:{
        type:String
    },
  details:{
      type:String
  },   
  price:{
    type:Number
  },
  category:{
    type:String 
},
quantity:{ type:Number},

productId: {
  type: mongoose.Schema.Types.ObjectId, // Assuming product IDs are MongoDB ObjectIds
  ref: 'Product', // Reference to the Product model
  required: true,
},


})
module.exports = mongoose.model("Product",ProductsSchema)