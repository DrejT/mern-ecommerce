const express = require("express");
const { createSession, destroySession } = require("./../utils/session");
const { register, getUserById } = require("../controllers/auth.controller");
const {
  validateRegisterSchema,
  validateLoginSchema,
  filterLogin,
  fetchLogin,
  sendLogin,
} = require("../middlewares/auth.middleware");

const router = new express.Router();

router.post("/register", validateRegisterSchema, register);

router.use(
  createSession // starts a session
);

router.get("/:id", getUserById);

router.post("/login", validateLoginSchema, fetchLogin, filterLogin, sendLogin);

router.delete("/logout", destroySession);

module.exports = router;
