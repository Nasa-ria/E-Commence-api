const express = require("express");
const controller = require("../controller/orderController");
// const order = require("../model/order");
const Order = require('../model/order')
const router = require("express").Router();


router.post("/create", controller.create);

module.exports = router;


