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
	let initialpassword = await bcrypt.compare(req.body.current_password,req.user.password);
	if (initialpassword) {
        if(req.body.new_password === req.body.confirm_password){
			
            try {
                const newhashed = await bcrypt.hash(req.body.new_password, 10);
                const user = await User.findById(req.user._id);
                user.password = newhashed
                await user.save()
                return res.status(201).json(user)
                
            } catch (error) {
                console.error(error)
				res.status(401).json("password could not save ,try again later")
            }	
	} else {
        res.locals.message= "incorrect current password";
         
	}
} else {
    res.locals.message="incorrect current password";
     
}
};

exports.login = async (req, res) => {
	const errorMessage = req.flash('error'); // Retrieve flash error message
  
	// Check if there is an error message
	if (errorMessage.length > 0) {
	  res.status(401).json({ message: errorMessage }); // Respond with the error message
	} else {
	  res.status(200).json({ message: 'Login successful' }); // Respond with a success message
	}
  };

exports.authenticatelogin = async (req, res, next) => {
	if (req.isAuthenticated()) {
		// Authentication successful, send a success message
		res.locals.message = "Login successful";
    return next();
	  } else {
		// Authentication failed, send an error message
		const errorMessage = req.flash("error")[0]; // Retrieve the error message from flash
		res.status(401).json({ message: "Authentication failed", error: errorMessage });
	  }
};



exports.logout = async (req, res) => {
	const user = await User.findOne({_id:req.user.id})
    req.logout();
	res.locals.message= "you are logedOut";
	res.status(200).json({ message: res.locals.message });
};