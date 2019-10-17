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
  { name: 'Bob' },
  { name: 'Mary' },
  { name: 'Finn' },
  { name: 'Priti' },
  { name: 'Collin' },
]

const seed = async () => {
  try {
    await db.sync({ force: true })
    console.log('Synced to the database')
    // const createdKittens = await Promise.all(
    //   kittens.map(kitten => Kitten.create(kitten))
    // )
    const [shelly, gurturde, rigatoni] = await Kitten.bulkCreate(kittens, {
      returning: true,
      validate: true,
    })
    const [bob, mary, finn] = await Person.bulkCreate(people, {
      returning: true,
      validate: true,
    })
    // await rigatoni.addPerson(finn)
    // await gurturde.addPerson(bob)
    // await shelly.addPerson(mary)
    // await finn.addKitten(shelly)
    // await finn.removeKitten(shelly)
    await Promise.all([
      rigatoni.addPerson(finn),
      gurturde.addPerson(bob),
      shelly.addPerson(mary),
      finn.addKitten(shelly),
    ])

    db.close()
  } catch (err) {
    console.log(err)
  }
}

seed()
