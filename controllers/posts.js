const router = require('express').Router()
const db = require('../models')
const jwt = require('jsonwebtoken')
const authLockedRoute = require('./authLockedRoute')

// FEATURE COMPLETE ROUTES

// INCOMPLETE ROUTES/STUBS

router.get('/', (req, res) => {
    // get several posts to populate home page
    res.json({ msg: 'welcome to the posts endpoint' })
})

router.post('/', authLockedRoute, async (req, res) => {
    try {
        let isReview = null,
            postTitle = null,
            postBody = null,
            taggedGame = null,
            rating = null,
            imageUrl = null
        const testUser = await db.User.findOne({
            _id: res.locals.user._id,
        })
        const newPost = db.Post({
            isReview,
            postTitle,
            postBody,
            taggedGame,
            rating,
            imageUrl,
            comments: [],
            poster: testUser._id,
        })
        res.locals.user.posts.push(newPost)
        await newPost.save()
        await res.locals.user.save()
        console.log('makin a post')
        res.json(newPost)
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', (req, res) => {
    // get single post from DB
    res.json({ msg: 'here is one single post' })
})

router.put('/', (req, res) => {
    // update one single post in DB
    res.json({ msg: 'updated a post' })
})

router.delete('/', (req, res) => {
    // destroy post in DB
    res.json({ msg: 'deleted a post' })
})

module.exports = router
