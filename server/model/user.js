
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

})
module.exports = mongoose.model("User",UsersSchema)