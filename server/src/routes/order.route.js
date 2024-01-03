const express = require("express");
const {
  validateOrderCreateSchema,
  validateOrderGetSchema,
} = require("../middlewares/order.middleware");
const { orderCreate, orderGet } = require("../controllers/order.controller");

const router = new express.Router();

// router.get("/", validateOrderGetSchema, orderGet);
// router.post("/", validateOrderCreateSchema, orderCreate);

module.exports = router;
