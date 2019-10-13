const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.json({ message: 'the API is working' })
})

module.exports = router
