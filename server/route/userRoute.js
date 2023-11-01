// requiring exress
const express = require("express");
const authenticateToken = require("../function/middleController");
const controller = require("../controller/userController");
const router = require("express").Router();




router.post("/user/login", controller.authenticatelogin);
router.post("/user/register" ,controller.register);
router.post("/user/changePassword",authenticateToken,controller.changePassword);
router.post("/user/update/:id",authenticateToken,controller.update);
router.get("/user/user/:id", controller.user);
router.get("/user/users", controller.users);
router.delete("/user/delete/:id",authenticateToken, controller.delete);


module.exports = router;

