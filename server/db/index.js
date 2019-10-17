const Sequelize = require('sequelize')

const db = new Sequelize('postgres://localhost:5432/kittensdb', {
  logging: false,
})

const Kitten = db.define('kitten', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  color: {
    type: Sequelize.ENUM([
      'brown',
      'orange',
      'black',
      'calico',
      'white',
      'grey',
    ]),
    // validate: {
    //   isIn: ['brown', 'orange', 'black', 'calico', 'white', 'grey'],
    // },
  },
  indoor: Sequelize.BOOLEAN,
  age: Sequelize.FLOAT,
})

const Person = db.define('person', {
  name: Sequelize.STRING
})

// const CatPerson = db.define('cat_person', {
//   adoptionDate: Sequelize.DATEONLY
// })

Kitten.belongsToMany(Person, { through: 'CatPerson' })
Person.belongsToMany(Kitten, { through: 'CatPerson' })

module.exports = {
  db,
  Kitten,
  Person,
}
