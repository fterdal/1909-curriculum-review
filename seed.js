const { db, Kitten, Person } = require('./server/db')

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

const people = [
  { name: 'Collin' },
  { name: 'Priti' },
  { name: 'Finn' },
  { name: 'Dan' },
]

const seed = async () => {
  try {
    await db.sync({ force: true })
    console.log('Synced to the database')
    // const createdKittens = await Promise.all(kittens.map(kitten => Kitten.create(kitten)))
    const [ shelly, gurturde, rigatoni ] = await Kitten.bulkCreate(kittens, {
      returning: true,
      validate: true,
    })
    const [ collin, priti, finn, dan ] = await Person.bulkCreate(people, {
      returning: true,
      validate: true,
    })
    // await shelly.addPerson(finn)
    await shelly.addPerson(finn)
    await shelly.addPerson(dan)
    await collin.addKitten(rigatoni)


    // console.log(`Seeded ${kittens.length} kittens!`)
    db.close()
  } catch (err) {
    console.log(err)
  }
}

seed()
