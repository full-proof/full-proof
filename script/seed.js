'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Order} = require('../server/db/models')
const {Address} = require('../server/db/models')
const {Product} = require('../server/db/models')
const {Review} = require('../server/db/models')
const {UserAddress} = require('../server/db/models')
const {Category} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all([
    User.create({
      name: 'cody',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      name: 'murphy',
      email: 'murphy@email.com',
      password: '123'
    }),
    Order.create({
      shipStatus: false
    }),
    Order.create({
      shipStatus: false
    }),
    Address.create({
      address_line1: '2228 Hickory Point',
      address_line2: '2R',
      city_province: 'Chicago',
      postalCode: 49024,
      country: 'Korea'
    }),
    Category.create({
      title: 'Material'
    }),
    Category.create({
      title: 'Color'
    }),
    Review.create({
      content: 'This is review test number one',
      rating: 3
    }),
    Review.create({
      content: 'This is review test number two',
      rating: 5
    }),
    Product.create({
      title: 'Dutch Oven',
      price: 23.14,
      quantity: 3,
      description: 'This is a test description',
      imgUrl: 'test/image/url'
    }),
    Product.create({
      title: 'Mixer',
      price: 99.99,
      quantity: 1,
      description: 'This is a test description',
      imgUrl: 'test/image/url'
    })
  ])
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
