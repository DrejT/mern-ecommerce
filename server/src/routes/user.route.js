const express = require("express");
const {
  validateGetUserByUsername,
} = require("./../middlewares/user.middleware");
const { getUserByUsername } = require("./../controllers/user.controller");
const {
  validateOrderGetSchema,
  validateOrderCreateSchema,
} = require("../middlewares/order.middleware");
const { orderGet, orderCreate } = require("../controllers/order.controller");

const router = new express.Router();

router.get("/order", validateOrderGetSchema, orderGet);
router.post("/order", validateOrderCreateSchema, orderCreate);

router.get("/:username", validateGetUserByUsername, getUserByUsername);

module.exports = router;
