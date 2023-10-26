const express = require("express");
const controller = require("../controller/userController");
const router = require("express").Router();

router.post("/changePassword", controller.changePassword);