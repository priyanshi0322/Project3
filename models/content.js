const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;

const contentSchema = new mongoose.Schema({
    title:  {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

contentSchema.post("findOneAndDelete", async (content) => {
    if (content) {
    await review.deleteMany({_id : {$in: content.review}});
    }
});

const Content = mongoose.model("Content", contentSchema);
module.exports = Content;