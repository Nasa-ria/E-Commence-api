require("../model/databaseConnection");
const User = require("../model/user");
const bcrypt = require('bcrypt');

exports.changePassword  = async(req ,res) => {
	let initialpassword = await bcrypt.compare(req.body.current_password,req.user.password);
	if (initialpassword) {
        if(req.body.new_password === req.body.confirm_password){
            try {
                const newhashed = await bcrypt.hash(req.body.new_password, 10);
                const user = await User.findById(req.user._id);
                user.password = newhashed
                await user.save()
              
                // await User.updateOne( { _id: req.user._id }, { password: newhashed, force_change_password: false });
                // req.user.force_change_password =false;/
                return res.status(201).json(user)
                
            } catch (error) {
                console.error(error)
               res.locals.message="password could not save ,try again later"
            }
    
		
	} else {
        res.locals.message= "incorrect current password";
         
	}
} else {
    res.locals.message="incorrect current password";
     
}
};