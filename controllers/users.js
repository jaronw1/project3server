const router = require('express').Router()
const db = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authLockedRoute = require('./authLockedRoute')
const axios = require('axios')

// GET /users - test endpoint
router.get('/', (req, res) => {
    res.json({ msg: 'welcome to the users endpoint' })
})

// POST /users/register - CREATE new user
router.post('/register', async (req, res) => {
    try {
        // check if user exists already
        const findUser = await db.User.findOne({
            email: req.body.email,
        })

        // don't allow emails to register twice
        if (findUser) {
            return res.status(400).json({ msg: 'email exists already' })
        }

        // hash password
        const password = req.body.password
        const saltRounds = 12
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        // create new user
        const newUser = new db.User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })

        await newUser.save()

        // create jwt payload
        const payload = {
            name: newUser.name,
            email: newUser.email,
            _id: newUser.id,
        }

        // sign jwt and send back
        const token = jwt.sign(payload, process.env.JWT_SECRET)

        res.json({ token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'server error' })
    }
})

// POST /users/login -- validate login credentials
router.post('/login', async (req, res) => {
    try {
        // try to find user in the db
        const foundUser = await db.User.findOne({
            email: req.body.email,
        })

        const noLoginMessage = 'Incorrect username or password'

        // if the user is not found in the db, return and sent a status of 400 with a message
        if (!foundUser) {
            return res.status(400).json({ msg: noLoginMessage })
        }

        // check the password from the req body against the password in the database
        const matchPasswords = bcrypt.compare(
            req.body.password,
            foundUser.password
        )

        // if provided password does not match, return an send a status of 400 with a message
        if (!matchPasswords) {
            return res.status(400).json({ msg: noLoginMessage })
        }

        // create jwt payload
        const payload = {
            name: foundUser.name,
            email: foundUser.email,
            _id: foundUser.id,
            posts: foundUser.posts,
            favoriteGames: foundUser.favoriteGames
        }

        // sign jwt and send back
        const token = jwt.sign(payload, process.env.JWT_SECRET)

        res.json({ token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'server error' })
    }
})

// GET /auth-locked - will redirect if bad jwt token is found
router.get('/auth-locked', authLockedRoute, (req, res) => {
    // use res.locals.user here to do authorization stuff
    console.log('logged in user:', res.locals.user)
    res.json({ msg: 'welcome to the private route!' })
})

// ROUTE STUBS THAT NEED TO BE BUILT

router.get('/:id', (req, res) => {
	// redirect user to a user profile page
	res.json({ msg: `hello from /users/${id} get route` })
})

router.put('/', authLockedRoute, async (req, res) => {
	// update user info in DB
    const {name, email, posts, favoriteGames, _id} = req.body
    const foundUser = await db.User.findOne({
        _id: _id
    })
        foundUser.name = name
        foundUser.email = email
        foundUser.posts = posts
        foundUser.favoriteGames = favoriteGames
        await foundUser.save()
    res.send(foundUser.favoriteGames)
})

//Change password
router.put('/change-password', async (req, res) => {
    const { userId, oldPassword, newPassword, confirmNewPassword } = req.body;

    try {
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: 'passwords do not match' });
          }


      // Get the user object from the database
      const user = await db.User.findById(userId);

      // Check if the old password matches the one stored in the database
      const isMatch = bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect old password.' });
      }

      // Hash the new password and update the user object
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;

      // Save the updated user object to the database
      await user.save();

      // Send a success response
      res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
      // Send an error response
      res.status(500).json({ message: 'An error occurred while changing the password.' });
    }
  });

router.delete('/', authLockedRoute, (req, res) => {
	// destroy user in DB
	res.json({ msg: `hello from /users delete route` })
})

module.exports = router
