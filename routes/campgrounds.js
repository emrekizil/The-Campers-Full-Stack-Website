const express = require("express");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({
  storage,
});

const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campground");

const campgrounds = require("../controllers/campgrounds");
const router = express.Router();
const {
  isLoggedIn,
  isAuthor,
  validateCampground,
} = require("../middlewares/middleware");

router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.createCamp)
  );
router.get("/new", isLoggedIn, campgrounds.renderForm);
router
  .route("/:id")
  .get(catchAsync(campgrounds.showCamp))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.updateCamp)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCamp));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
