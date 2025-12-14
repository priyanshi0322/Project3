const Content = require("./models/content");
const Review = require("./models/review");
const { contentSchema, reviewSchema  } = require("./schema.js"); //schema
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => { 
     if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to create content!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => { 
     if(req.session.redirectUrl) {
        req.session.redirectUrl = req.session.redirectUrl;
     }
     next();
};

module.exports.isOwner = async (req, res, next) => {
   let { id } = req.params;
   let content = await Content.findById(id);
   if(!content.owner._id.equals(res.locals.currUser._id)){
      req.flash("error", "You are not the owner"); 
      return res.redirect(`/content/${id} `);
   }
   next();
};

module.exports.validateContent = (req, res, next) => {
    let { error } = contentSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.isReviewAuthor = async (req, res, next) => {
   let {id, reviewId } = req.params;
   let review = await Review.findById(reviewId);
   if(!review.author.equals(res.locals.currUser._id)){
      req.flash("error", "You are not the Author of this review"); 
      return res.redirect(`/content/${id} `);
   }
   next();
};