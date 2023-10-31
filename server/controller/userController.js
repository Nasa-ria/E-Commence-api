require('dotenv').config();
require("../model/databaseConnection");
const User = require("../model/user");
const jwt =  require("jsonwebtoken")
const bcrypt = require('bcrypt');



exports.register= async (req, res) => {
	try { 
	  const hashedPassword = await bcrypt.hash(req.body.password, 10);
	  const user = new User({
		name: req.body.name,
		password:hashedPassword,
		email: req.body.email,
	  });
	  await user.save();
	  return res.status(201).json(user); 
  
	} catch (error) {
		console.error(error);
	  return res.status(500).json({ error: 'Internal Server Error' });
	}

	
  };


  exports.update = async(req, res) => {
	try{
		let id = req.params.id
	const user = await User.updateOne({_id:id},{
		name: req.body.name,
		email: req.body.email,
	  });
	  return res.status(201).json(user); 
	}catch(error){
		console.error(error);
	}
  };

  exports.user = async (req, res) => {
	let id = req.params.id;
	const user = await User.findById(id);
	return res.status(201).json(user)
};

exports.users = async(req ,res) => {
	const users = await User.find({})
	return res.status(201).json(users)
};


exports.delete = async(req,res)=>{
  let id = req.params.id 
    const user =await User.deleteOne({_id:id})
	res.locals.message= "user deleted"
};

exports.changePassword  = async(req ,res) => {
	const user = await User.findOne({_id:req.user.id})
	if (user){
	let initialpassword = await bcrypt.compare(req.body.current_password,user.password);
	if (initialpassword) {
        if(req.body.new_password === req.body.confirm_password){
            try {
                const newhashed = await bcrypt.hash(req.body.new_password, 10);
                user.password = newhashed
                await user.save()
                return res.status(201).json(user)
                
            } catch (error) {
                console.error(error)
				res.status(401).json("password could not save ,try again later")
            }	
	} else {
        console.error(error)
				res.status(401).json( "incorrect current password");       
	}
} else {
    res.status(401).json("incorrect current password");  
}
	}else{
		res.status(401).json("user not found"); 
	}
};

exports.authenticatelogin = async (req, res) => {
	try{
        const user = await User.findOne({email: req.body.email})
        if(user){
            const passwordVerify = await bcrypt.compare(req.body.password ,user.password)
           if(passwordVerify){
               const payload={
                   id:user._id,
                   name:user.name,
                   email:user.email,
               }
               const accessToken= jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:"1h"})
                 token={accessToken}  
           }else{
			   return res.status(400).json("error when verifying password")
           }   
        }else{
            return res.status(400).json("error when logging in");
        }
         res.status(201).json({feedback,message:"login successful"});
    }catch(error){
        console.log(error)
    }
};



exports.logout = async (req, res) => {
	const user = await User.findOne({_id:req.user.id})
    req.logout();
	res.locals.message= "you are logedOut";
	res.status(200).json({ message: res.locals.message });
};