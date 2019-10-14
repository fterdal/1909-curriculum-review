const app = require('./server')
const { db } = require('./server/db')
const PORT = 1337


db.sync()
.then(() => {
  console.log('DB is synced')
  app.listen(PORT, () => console.log(`studiously serving silly sounds on port ${PORT}`))
})
