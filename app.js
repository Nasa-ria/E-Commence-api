require('dotenv').config();
const express = require("express");
// const flash = require("express-flash");
const PORT = process.env.PORT;
const app = express();
app.use(express.json());



app.use(express.urlencoded({extended: false}));



const userroute = require("./server/route/userRoute");
app.use('/',userroute)

const productroute = require("./server/route/productRoute");
app.use('/product',productroute)

const orderroute = require("./server/route/orderRoute");
app.use('/order',orderroute)

const cartroute = require("./server/route/cartRoute");
app.use('/cart',cartroute)

	app.listen(PORT, () => {
		console.log(`Server listening on port :${PORT}`);
	});

