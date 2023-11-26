const express = require('express')
const authRoutes = require('./routes/authRoutes')

const app = express()
app.use(authRoutes)
// Don't need to run this code

app.listen(3333,  () => {
  console.log('Listening on port 3333')
})