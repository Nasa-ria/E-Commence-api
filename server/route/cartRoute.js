const express = require("express");
const controller = require("../controller/cartController");
// const order = require("../model/order");
const Cart = require("../model/cart");
const router = require("express").Router();

 router.post("/addtocart/:userId",controller.addtoCart);
 router.post("/updatetocart/:userId",controller.updateCart);
 router.post("/checkout",controller.checkout);

module.exports = router;