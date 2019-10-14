const express = require('express')
const router = express.Router()
const kittens = require('./kittens')

router.get('/', (req, res, next) => {
  res.json({ message: 'the API is working' })
})

router.use('/kittens', kittens)

module.exports = router
