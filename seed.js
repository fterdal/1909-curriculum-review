const { db, Kitten } = require('./server/db')

const kittens = [
  {
    name: 'Shelly',
    color: 'black',
    indoor: false,
    age: 1.5,
  },
  {
    name: 'Gurturde',
    color: 'calico',
    indoor: true,
    age: 0.5,
  },
  {
    name: 'Rigatoni',
    color: 'orange',
    indoor: true,
    age: 1.3,
  },
]

const seed = async () => {
  try {
    await db.sync({ force: true })
    console.log('Synced to the database')
    // const createdKittens = await Kitten.bulkCreate(kittens, { returning: true, validate: true })
    const createdKittens = await Promise.all(kittens.map(kitten => Kitten.create(kitten)))
    console.log(createdKittens)
    console.log(`Seeded ${kittens.length} kittens!`)
    db.close()
  } catch (err) {
    console.log(err)
  }
}

seed()
