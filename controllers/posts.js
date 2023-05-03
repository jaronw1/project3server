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

router.post('/', (req, res) => {
    // create post in DB
    res.json({ msg: 'created a post' })
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
