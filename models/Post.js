const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
        },
        username: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const PostSchema = new mongoose.Schema(
    {
        postId: {
            Number,
        },
        userId: {
            Number,
        },
        isReview: {
            Boolean,
        },
        postTitle: {
            String,
        },
        postBody: {
            String,
        },
        taggedGame: {
            Number,
        },
        rating: {
            Number,
        },
        imageUrl: {
            String,
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
