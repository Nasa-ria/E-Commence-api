const express = require("express");
const controller = require("../controller/cartController");
const authenticateToken = require("../function/middleController");
const router = require("express").Router();

 router.post("/addtocart",authenticateToken,controller.addtoCart);
 router.post("/updatetocart/:id",controller.updateCart);
 router.get("/cartItems",authenticateToken,controller.cartItems);
module.exports = router;

