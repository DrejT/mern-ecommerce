const express = require("express");

const { register, login } = require("./../controllers/user.controller");

const router = new express.Router();

router.post("/register", register);

router.post("/login", login);

router.delete("/logout");

module.exports = router;
