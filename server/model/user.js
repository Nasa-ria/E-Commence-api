
const mongoose = require("mongoose")
const UsersSchema =  new mongoose.Schema({
    name:{
        type:String
    },
  password:{
      type:String
  },   
  email:{
    type:String
  },
  reset_password:{
    type:Boolean,
    default:false
} ,
 status:{
  type: Boolean,
  default:true 
},
orderHistory: {
  type: mongoose.Schema.Types.ObjectId, // Assuming product IDs are MongoDB ObjectIds
  ref: 'Order', // Reference to the Product model
  required: true,
},

})
module.exports = mongoose.model("User",UsersSchema)