const express = require("express");
const controller = require("../controller/productController");
const product = require("../model/product");
const router = require("express").Router();

router.post("/create", controller.create);
router.post("/update/:id",controller.update);
router.delete("/delete/:id",controller.delete);
router.get("/product/:id",controller.product);
router.get("/products",controller.products)


module.exports = router;