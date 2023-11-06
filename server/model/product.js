const mongoose = require("mongoose")
const ProductsSchema =  new mongoose.Schema({   
   name:{
        type:String,
        required: true
    },
  details:{
      type:String,
      required: true
  },   
  price:{
    type:Number,
    required: true
  },
  category:{
    type:String 
},
quantity:{ type:Number, required: true},

})
module.exports = mongoose.model("Product",ProductsSchema)