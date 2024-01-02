const express = require("express");
const { getStore } = require("../controllers/store.controller");
const {
  createReview,
  editReview,
  deleteReview,
  getReview,
} = require("../controllers/review.controller");
const {
  validateReviewGetSchema,
  validateReviewCreateSchema,
  validateReviewDeleteSchema,
  validateReviewEditSchema,
} = require("../middlewares/review.middleware");

const router = new express.Router();

router.get("/:id", validateReviewGetSchema, getReview);

router.post("/", validateReviewCreateSchema, createReview);

router.patch("/", validateReviewEditSchema, editReview);

router.delete("/:id", validateReviewDeleteSchema, deleteReview);

module.exports = router;
