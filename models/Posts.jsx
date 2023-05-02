const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    postId: {
        Number
    },
    userId: {
        Number
    }

})