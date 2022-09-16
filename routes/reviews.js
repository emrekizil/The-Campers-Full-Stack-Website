const express = require("express");
const {
  validateReview,
  isLoggedIn,
  isReviewAuth,
} = require("../middlewares/middleware");
const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campground");

const reviews = require("../controllers/reviews");

const Review = require("../models/review");
const router = express.Router({ mergeParams: true });

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuth,
  catchAsync(reviews.deleteReview)
);
module.exports = router;
