const express = require("express");

const { register } = require("../controllers/auth.controller");
const {
  validateRegisterSchema,
  validateLoginSchema,
  filterLogin,
  fetchLogin,
  sendLogin,
} = require("../middlewares/auth.middleware");

const router = new express.Router();

router.post("/register", validateRegisterSchema, register);

router.post("/login", validateLoginSchema, fetchLogin, filterLogin, sendLogin);

router.delete("/logout");

module.exports = router;
