const express = require("express");
const {
  getStore,
  createStore,
  editStore,
  removeStore,
} = require("../controllers/store.controller");
const {
  validateStoreCreateSchema,
  validateStoreGetSchema,
  authorizeUserSession,
} = require("../middlewares/store.middleware");

const router = new express.Router();

router.get("/:name", authorizeUserSession, validateStoreGetSchema, getStore);

router.post("/create", validateStoreCreateSchema, createStore);

router.patch("/edit", editStore);

router.delete("/remove", removeStore);

module.exports = router;
