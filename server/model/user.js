
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

})
module.exports = mongoose.model("User",UsersSchema)