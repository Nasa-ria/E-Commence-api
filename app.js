require('dotenv').config();
const express = require("express");
// const flash = require("express-flash");
const PORT = process.env.PORT;
const app = express();


app.use(express.json());
// app.use(flash())
app.use(express.urlencoded({extended: false}));


const userroute = require("./server/route/userRoute");
app.use('/',userroute)

	app.listen(PORT, () => {
		console.log(`Server listening on port :${PORT}`);
	});

