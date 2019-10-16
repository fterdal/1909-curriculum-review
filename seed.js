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
  { name: 'Jonathon' },
  { name: 'Marie' },
  { name: 'Kelly' },
  { name: 'Mike' },
]

const seed = async () => {
  try {
    await db.sync({ force: true })
    console.log('Synced to the database')
    const [shelly, gurturde, rigatoni] = await Promise.all(
      kittens.map(kitten => Kitten.create(kitten))
    )
    const [jon, marie, kelly, mike] = await Promise.all(
      people.map(person => Person.create(person))
    )
    await Promise.all([
      shelly.addPerson(jon),
      marie.addKitten(rigatoni),
      gurturde.addPeople([ kelly, mike ]),
    ])

    await gurturde.removePerson(mike)

    // console.log('createdKittens[2]', createdKittens[2].addPerson)
    // console.log(`Seeded ${createdKittens.length} kittens!`)
    // console.log(`Seeded ${createdPeople.length} people!`)
    db.close()
  } catch (err) {
    console.log(err)
  }
}

seed()
