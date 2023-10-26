require('dotenv').config();
const express = require("express");
const session =require('express-session'); 
const flash = require("express-flash");
const PORT = process.env.PORT;
const app = express();


app.use(express.json());
app.use(flash())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret:process.env.SECRET,
    resave:true,
    saveUninitialized:true,
    // cookie: { maxAge: 10 * 60 * 1000 ,secure:false} // 5mins
}))

const userroute = require("./server/route/userRoute");
app.use('/',userroute)

	app.listen(PORT, () => {
		console.log(`Server listening on port :${PORT}`);
	});

