const express = require("express");
const controller = require("../controller/orderController");
// const order = require("../model/order");
const authenticateToken = require("../function/middleController");
const router = require("express").Router();


router.post("/checkout", authenticateToken,controller.checkout);

module.exports = router;


