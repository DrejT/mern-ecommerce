const express = require("express");
const {
  validateAdminRegisterSchema,
  validateAdminLoginSchema,
} = require("../middlewares/admin.middleware");
const { login, register } = require("../controllers/auth.controller");

const router = new express.Router();

router.post("/register", validateAdminRegisterSchema, register);
router.post("/login", validateAdminLoginSchema, login);

module.exports = router;
