const express = require('express')

const router = express.Router()

router.post('/signup', (req, res) => {
  res.send('You mage a post request')
})

module.exports = router
