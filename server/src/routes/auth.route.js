const express = require("express");

const { register, login } = require("../controllers/auth.controller");
const {
  validateRegisterSchema,
  validateLoginSchema,
} = require("../middlewares/auth.middleware");

const router = new express.Router();

router.post("/register", validateRegisterSchema, register);

router.post("/login", validateLoginSchema, login);

router.delete("/logout");

module.exports = router;
