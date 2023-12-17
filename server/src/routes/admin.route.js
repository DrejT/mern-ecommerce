const express = require("express");
const {
  validateAdminRegisterSchema,
  validateAdminLoginSchema,
} = require("../middlewares/admin.middleware");
const { register } = require("../controllers/auth.controller");
const {
  fetchLogin,
  filterLogin,
  sendLogin,
} = require("../middlewares/auth.middleware");

const router = new express.Router();

router.post("/register", validateAdminRegisterSchema, register);
router.post(
  "/login",
  validateAdminLoginSchema,
  fetchLogin,
  filterLogin,
  sendLogin
);

module.exports = router;
