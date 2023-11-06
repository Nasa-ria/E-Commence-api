const express = require("express");
const controller = require("../controller/productController");
const authenticateToken = require("../function/middleController");
const router = require("express").Router();

router.post("/create", authenticateToken,controller.create);
router.post("/update/:id",authenticateToken,controller.update);
router.delete("/delete/:id",authenticateToken,controller.delete);
router.get("/product/:id",controller.product);
router.get("/products",controller.products)


module.exports = router;