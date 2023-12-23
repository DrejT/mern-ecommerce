const express = require("express");
const {
  getStore,
  getAllStore,
  createStore,
  editStore,
  deleteStore,
} = require("../controllers/store.controller");
const {
  validateStoreCreateSchema,
  validateStoreGetSchema,
  validateStoreDeleteSchema,
  validateStoreEditSchema,
} = require("../middlewares/store.middleware");
const { authorizeAdminSession } = require("../middlewares/auth.middleware");

const router = new express.Router();

router.use(authorizeAdminSession);

router.get("/:id", validateStoreGetSchema, getStore);
router.get("/", getAllStore);

router.post("/", validateStoreCreateSchema, createStore);

router.patch("/", validateStoreEditSchema, editStore);

router.delete("/:id", validateStoreDeleteSchema, deleteStore);

module.exports = router;
