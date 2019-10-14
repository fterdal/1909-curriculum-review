const express = require('express')
const router = express.Router()
const { Kitten } = require('../db')

// /api/kittens
router.get('/', async (req, res, next) => {
  try {
    const kittens = await Kitten.findAll()
    res.json(kittens)
  } catch (err) {
    next(err)
  }
})

module.exports = router
