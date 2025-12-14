const express = require("express");
const router = express.Router({mergeParams: true});
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("./utils/ExpressError.js");
const Content = require("../models/content.js");
const{ validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");



router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destoryReview));

module.exports = router;