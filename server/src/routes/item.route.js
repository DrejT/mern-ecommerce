const express = require("express");
const {
  validateItemGetSchema,
  validateItemCreateSchema,
  validateItemEditSchema,
  validateItemDeleteSchema,
  validateItemGetAllSchema,
  uploadImage,
} = require("../middlewares/item.middleware");
const {
  getItem,
  getAllItem,
  createItem,
  editItem,
  deleteItem,
} = require("../controllers/item.controller");
const { authorizeAdminSession } = require("../utils/session");
const upload = require("../utils/multer");

const router = new express.Router();

router.get("/:id", validateItemGetSchema, getItem);
router.get("/", authorizeAdminSession, validateItemGetAllSchema, getAllItem);

router.post(
  "/",
  upload.single("itemImage"),
  validateItemCreateSchema,
  uploadImage,
  createItem
);

router.patch("/", validateItemEditSchema, editItem);

router.delete("/:id", validateItemDeleteSchema, deleteItem);

module.exports = router;
