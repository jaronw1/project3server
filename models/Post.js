const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
        },
        postedBy: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const PostSchema = new mongoose.Schema(
    {
        isReview: {
            type: Boolean,
        },
        postTitle: {
            type: String,
        },
        postBody: {
            type: String,
        },
        taggedGame: {
            type: Number,
        },
        rating: {
            type: Number,
        },
        imageUrl: {
            type: String,
        },
        comments: [CommentSchema],
        poster: {
            // tell mongoose that this is a referenced
            type: mongoose.Schema.Types.ObjectId,
            // tell mongoose what is beging referenced
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model('Post', PostSchema)
