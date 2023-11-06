const express = require("express");
const controller = require("../controller/cartController");

const router = require("express").Router();

 router.post("/addtocart/:userId",controller.addtoCart);
 router.post("/updatetocart/:userId",controller.updateCart);

module.exports = router;