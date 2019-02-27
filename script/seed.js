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

  const cody = await User.create({
    name: 'cody',
    email: 'cody@email.com',
    password: '123',
    isAdmin: true
  })

  await User.create({
    name: 'Jan',
    email: 'jan@email.com',
    password: '123'
  })

  await User.create({
    name: 'Anna',
    email: 'anna@email.com',
    password: '123'
  })

  await User.create({
    name: 'Delilah',
    email: 'delilah@email.com',
    password: '123'
  })

  await User.create({
    name: 'Tom',
    email: 'tom@email.com',
    password: '123'
  })

  await User.create({
    name: 'Garrett',
    email: 'garrett@email.com',
    password: '123'
  })

  const address = await Address.create({
    address_line1: '2228 Hickory Point',
    address_line2: '2R',
    city_province: 'Chicago',
    postalCode: 49024,
    country: 'Korea'
  })

  const order = await Order.create({
    status: 'Completed'
  })

  const category = await Category.create({
    title: 'Material'
  })
  const review = await Review.create({
    content: 'This is review test number one',
    rating: 3
  })
  const product = await Product.create({
    title: 'Dutch Oven',
    price: 23.14,
    quantity: 3,
    description: 'This is a test description',
    imgUrl: 'dutch-oven.jpg'
  })

  await Product.create({
    title: 'Basting Brushes',
    price: 13.14,
    quantity: 2,
    description: 'This is a test description',
    imgUrl: 'basting-brushes.jpg'
  })

  await Product.create({
    title: 'Bench Knife',
    price: 10.99,
    quantity: 10,
    description: 'This is a test description',
    imgUrl: 'bench-knife.jpg'
  })

  await Product.create({
    title: 'Cookie Cutters',
    price: 4.99,
    quantity: 15,
    description: 'This is a test description',
    imgUrl: 'cookie-cutters.jpg'
  })

  await Product.create({
    title: 'Mixer',
    price: 199.99,
    quantity: 5,
    description: 'This is a test description',
    imgUrl: 'mixer.jpg'
  })

  await Product.create({
    title: 'Plastic Dough Scraper',
    price: 7.99,
    quantity: 50,
    description: 'This is a test description',
    imgUrl: 'plastic-dough-scraper.jpg'
  })

  await Product.create({
    title: 'Whisk',
    price: 8.99,
    quantity: 30,
    description: 'This is a test description',
    imgUrl: 'whisk.jpg'
  })

  await review.setUser(cody)
  await order.setUser(cody)
  // this magic method does not actually save association in database..??
  await cody.hasAddress(address)

  // console.log('This is product magic', Object.keys(product.__proto__))
  // console.log('This is user magic', Object.keys(cody.__proto__))
  // console.log('This is review magic', Object.keys(review.__proto__))
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
