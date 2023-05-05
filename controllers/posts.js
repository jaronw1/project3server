const router = require('express').Router()
const db = require('../models')
const jwt = require('jsonwebtoken')
const authLockedRoute = require('./authLockedRoute')

// FEATURE COMPLETE ROUTES

router.get('/', async (req, res) => {
    /* this route currently gets the 10 newest posts from the DB -- 10 is
    an arbitrary choice for now, can revisit this limit as needed when fully
    implementing the home page */
    try {
        const fetchedPosts = await db.Post.find().limit(10).sort('-createdAt')
        res.json(fetchedPosts)
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const foundPost = await db.Post.findOne({
            _id: req.params.id,
        })
        console.log(foundPost)
        if (foundPost) {
            res.json(foundPost)
        } else {
            // this else block only fires if the id param is a valid hash that is not found in the DB.  if id param is not a valid hash, an error will be thrown and we'll end up in the catch block.  Need to implement decent error handling for any possible input of req.params.id
            res.sendStatus(404)
        }
    } catch (error) {
        console.log(error)
    }
})

router.post('/', authLockedRoute, async (req, res) => {
    /* currently using placeholder null values for all post details. when
    fully implemented, this route will receive post details from a form */
    try {
        console.log(req.body)
        const {postTitle, postBody, taggedGame, rating, isReview, imageUrl} = req.body
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
        console.log(newPost)
        // Will send back id of new posts so client can navigate to page of post.
        res.send(newPost._id)
    } catch (error) {
        console.log(error)
    }
})

router.put('/', authLockedRoute, async (req, res) => {
    /* this route is currently functional but in "proof of concept" mode --
    will eventually receive information from the req that will (a) determine
    which post the user wants to update, and (b) determine what fields are being
    updated with what info */
    try {
        console.log(req.body)
        const {postTitle, postBody, taggedGame, rating, isReview, imageUrl} = req.body
        let postToUpdate = await db.Post.findOne({
            _id: req.body._id,
        })
        postToUpdate.postTitle = postTitle
        postToUpdate.postBody = postBody
        postToUpdate.taggedGame = taggedGame
        postToUpdate.rating = rating
        postToUpdate.isReview = isReview
        postToUpdate.imageUrl = imageUrl
        await postToUpdate.save()
        console.log(postToUpdate)
        res.send(postToUpdate)
    } catch (error) {
        console.log(error)
    }
})

// INCOMPLETE ROUTES/STUBS

router.delete('/', (req, res) => {
    // destroy post in DB
    res.json({ msg: 'deleted a post' })
})

module.exports = router
