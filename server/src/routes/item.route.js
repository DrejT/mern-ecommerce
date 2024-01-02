const express = require("express");
const {
  validateItemGetSchema,
  validateItemCreateSchema,
  validateItemEditSchema,
  validateItemDeleteSchema,
} = require("../middlewares/item.middleware");
const {
  createItem,
  getItem,
  editItem,
  deleteItem,
} = require("../controllers/item.controller");
const { authorizeAdminSession } = require("../middlewares/auth.middleware");

const router = new express.Router();
router.get("/:id", validateItemGetSchema, getItem);

router.get("/", authorizeAdminSession, validateItemGetSchema, getItem);

router.post("/", validateItemCreateSchema, createItem);

router.patch("/", validateItemEditSchema, editItem);

router.delete("/:id", validateItemDeleteSchema, deleteItem);

module.exports = router;
