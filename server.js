// require packages
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const rowdy = require('rowdy-logger')
const axios = require('axios')

// config express app
const app = express()
const PORT = process.env.PORT || 8000
// for debug logging
const rowdyResults = rowdy.begin(app)
// cross origin resource sharing
app.use(cors())
// request body parsing
app.use(express.json())

// GET / -- test index route
app.get('/', (req, res) => {
    res.json({ msg: 'hello backend 🤖' })
})

app.get('/games', (req, res) => {
    const { search } = req.query
    const url = `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&page_size=5&search=${search}`
    axios.get(url)
        .then(response => {
            res.send(response.data)
        })
        .catch(console.warn)
})

app.get('/game/details', (req, res) => {
    const { id } = req.query
    const url = `https://api.rawg.io/api/games/${id}?key=${process.env.REACT_APP_API_KEY}`
    axios.get(url)
        .then(response => {
            res.send(response.data)
        })
        .catch(console.warn)
})

// controllers
app.use('/users', require('./controllers/users.js'))
app.use('/posts', require('./controllers/posts.js'))

// hey listen
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`is that port ${PORT} I hear? 🙉`)
})
