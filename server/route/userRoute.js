// requiring exress
const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const controller = require("../controller/userController");
const bcrypt = require('bcrypt');
const User = require("../model/user");
const router = require("express").Router();


passport.use(
	new LocalStrategy({ passReqToCallback: true }, async function verify(req,username,password,cb) {
		// checks if the phone number inputed  matches
		const user = await User.findOne({ email:username });
        console.log(user)
		if (user) {
			//   user attempt
			// if (user.status) {
				const passwordVerified = await bcrypt.compare(password ,user.password)
				//   and the password too
				if(passwordVerified){
					return cb(null, user); /* verification succesfull */
				
			}
			// } else {
			// 	return cb(null, false, {
			// 		message: "your account has been deactivated",
			// 	});
			// }
		}
		// Tracklogin(req, user);
		return cb(null, false, {
			message: "incorrect  email or password",
		}); /* verification failed */
	}),
);


// const Tracklogin = async (req, user) => {
// 	const session = req.session;
// 	if (!session.maxFailedAttempts) {
// 		session.maxFailedAttempts = 5;
// 	} else {
// 		session.maxFailedAttempts -= 1;
// 		const maxFailedAttempts = session.maxFailedAttempts;
// 		if (maxFailedAttempts <= 1) {
// 			user.status = false;
// 			await user.save();
// 		}
// 	}

// };
passport.serializeUser(function (user, done) {
	// Store only the user id in the session
	done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
	// Retrieve the user from the database using the id
	User.findById(id, function (err, user) {
	  done(err, user);
	});
  });

router.use(passport.initialize());
router.use(passport.session());


router.get("/user/login", controller.login);
// outsourcing the authentication to  passport
router.post("/user/login", passport.authenticate("local", {
    failureRedirect: "/user/login",
    failureFlash: true,
}), controller.authenticatelogin);



// router.post("/user/register", controller.register);

const isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next(); 
	  }
	  res.redirect("/user/login"); 
  };

  router.use(isAuthenticated)
// router.use(loginAuthentication)
router.post("/user/register", controller.register);
router.post("/user/changePassword",controller.changePassword);
router.get("/user/edit/:id", controller.edit);
router.post("/user/update/:id",controller.update);
router.get("/user/user/:id", controller.user);
router.get("/user/users", controller.users);
router.get("/user/delete/:id", controller.delete);


module.exports = router;

