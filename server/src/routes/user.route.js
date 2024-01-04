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
const { getAllUserStore } = require("../controllers/store.controller");

const router = new express.Router();

// public store route to get all the available stores
router.get("/store", getAllUserStore);

// user specific route to get all the orders of the currently logged in user
router.get("/order", validateOrderGetSchema, orderGet);
// allows to create an order
router.post("/order", validateOrderCreateSchema, orderCreate);

// meant to send the info of a user given their username
router.get("/:username", validateGetUserByUsername, getUserByUsername);

module.exports = router;
