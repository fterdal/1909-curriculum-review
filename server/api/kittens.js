const express = require('express')
const router = express.Router()

const kittens = [
  {
    id: 1,
    name: 'Shelly',
    color: 'black',
    indoor: false,
    age: 1.5,
  },
  {
    id: 2,
    name: 'Gurturde',
    color: 'brown',
    indoor: true,
    age: 0.5,
  },
  {
    id: 3,
    name: 'Rigatoni',
    color: 'orange',
    indoor: true,
    age: 1.3,
  },
]

// /api/kittens
router.get('/', (req, res, next) => {
  res.json(kittens)
})

module.exports = router
