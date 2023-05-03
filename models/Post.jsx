const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    postId: {
        Number
    },
    userId: {
        Number
    },
    isReview: {
        Boolean
    },
    postTitle: {
        String
    },
    postBody: {
        String
    },
    taggedGame: {
        Number
    },
    rating: {
        Number
    },
    imageUrl: {
        String
    }

}, {
	timestamps: true
})
module.exports = mongoose.model('Post', PostSchema)