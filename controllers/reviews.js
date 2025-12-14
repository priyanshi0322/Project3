const Content = require("../models/content");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
    console.log(req.params.id);
    let content = await Content.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    content.review.push(newReview);

    await newReview.save();
    await content.save();
    req.flash("success", "New Review created");
    res.redirect(`/content/${content._id}`);
};

module.exports.destoryReview = async(req, res) => {
    let { id, reviewId } = req.params;
    await Content.findByIdAndUpdate(id, {$pull: {review : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted");
    res.redirect(`/content/${id}`);
};