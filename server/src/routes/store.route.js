const express = require("express");
const {
  getStore,
  getAllStore,
  createStore,
  editStore,
  deleteStore,
  getAllAdminStore,
} = require("../controllers/store.controller");
const {
  validateStoreCreateSchema,
  validateStoreGetSchema,
  validateStoreDeleteSchema,
  validateStoreEditSchema,
} = require("../middlewares/store.middleware");
const { authorizeUserSession } = require("../utils/session");

const router = new express.Router();

router.use(authorizeUserSession);

router.get("/:id", validateStoreGetSchema, getStore);
router.get("/", getAllAdminStore);

router.post("/", validateStoreCreateSchema, createStore);

router.patch("/", validateStoreEditSchema, editStore);

router.delete("/:id", validateStoreDeleteSchema, deleteStore);

module.exports = router;
