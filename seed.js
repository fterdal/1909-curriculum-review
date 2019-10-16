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

const people = [{ name: 'Finn' }, { name: 'Collin' }, { name: 'Priti' }]

const seed = async () => {
  try {
    await db.sync({ force: true })
    console.log('Synced to the database')
    // const createdKittens = await Kitten.bulkCreate(kittens, { returning: true, validate: true })
    // await Kitten.create(kittens[0])
    // await Kitten.create(kittens[1])
    // await Kitten.create(kittens[2])
    const [shelly, gurturde, rigatoni] = await Promise.all(
      kittens.map(kitten => Kitten.create(kitten))
    )
    const [finn, collin, priti] = await Promise.all(
      people.map(person => Person.create(person))
    )

    await rigatoni.addPerson(finn)
    await rigatoni.addPerson(collin)

    // EAGER LOADING
    // const retrievedKitten = await Kitten.findByPk(rigatoni.id, {
    //   include: [{ model: Person}]
    // })
    // console.log(retrievedKitten)

    const rigatonisPeople = await rigatoni.getPeople()
    console.log(rigatonisPeople)

    // console.log('createdKittens[2].createdAt', createdKittens[2].createdAt)
    // console.log(`Seeded ${kittens.length} kittens!`)
    db.close()
  } catch (err) {
    console.log(err)
  }
}

seed()
