const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Content = require("../models/content.js");
const Review = require("../models/review.js");
const { isLoggedIn, isOwner, validateContent } = require("../middleware.js");
const contentController = require("../controllers/contents.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


router.route("/")
    .get(wrapAsync(contentController.index))
    .post(isLoggedIn, upload.single("content[image]"), validateContent, wrapAsync(contentController.createContent));

router.get("/new", isLoggedIn, contentController.renderNewForm);

router.route("/:id")
    .get(wrapAsync(contentController.showContent))
    .put(isLoggedIn, isOwner, upload.single("content[image]"), validateContent, wrapAsync(contentController.updateContent))
    .delete(isLoggedIn, isOwner, wrapAsync(contentController.destoryContent));

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(contentController.renderEditForm));


module.exports = router;