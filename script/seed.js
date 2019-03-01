/* eslint-disable max-statements */
'use strict'

const db = require('../server/db')

const {
  User,
  Order,
  Address,
  Product,
  Review,
  UserAddress,
  Category,
  OrderedProducts
} = require('../server/db/models')
const productsSeedData = require('./SEED_DATA_Products')
const usersSeedData = require('./SEED_DATA_Users')
const reviewsSeedData = require('./SEED_DATA_Reviews')

const Sequelize = require('sequelize')

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

  const newUsers = await Promise.all(
    usersSeedData.map(newUser => {
      return User.create(newUser)
    })
  )

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

  const completedOrder = await Order.create({status: 'Completed'})

  const processingOrder = await Order.create({status: 'Processing'})

  const cancelledOrder = await Order.create({status: 'Cancelled'})

  const inCartOrder = await Order.create({status: 'In Cart'})

  const category = await Category.create({
    title: 'Material'
  })

  const review = await Review.create({
    content: 'This is review test number one',
    rating: 3
  })

  const dutchOven = await Product.create({
    title: 'Dutch Oven',
    price: 23.14,
    quantity: 3,
    description: 'This is a test description',
    imgUrl: '/dutch-oven.jpg'
  })

  const bastingBrushes = await Product.create({
    title: 'Basting Brushes',
    price: 13.14,
    quantity: 2,
    description: 'This is a test description',
    imgUrl: '/basting-brushes.jpg'
  })

  const benchKnife = await Product.create({
    title: 'Bench Knife',
    price: 10.99,
    quantity: 10,
    description: 'This is a test description',
    imgUrl: '/bench-knife.jpg'
  })

  const cookieCutters = await Product.create({
    title: 'Cookie Cutters',
    price: 4.99,
    quantity: 15,
    description: 'This is a test description',
    imgUrl: '/cookie-cutters.jpg'
  })

  const mixer = await Product.create({
    title: 'Mixer',
    price: 199.99,
    quantity: 5,
    description: 'This is a test description',
    imgUrl: '/mixer.jpg'
  })

  const plasticDoughScraper = await Product.create({
    title: 'Plastic Dough Scraper',
    price: 7.99,
    quantity: 50,
    description: 'This is a test description',
    imgUrl: '/plastic-dough-scraper.jpg'
  })

  const whisk = await Product.create({
    title: 'Whisk',
    price: 8.99,
    quantity: 30,
    description: 'This is a test description',
    imgUrl: '/whisk.jpg'
  })

  const newProducts = await Promise.all(
    productsSeedData.map(newProduct => {
      return Product.create(newProduct)
    })
  )

  await review.setUser(cody)
  await order.setUser(cody)
  await completedOrder.setUser(cody)
  await processingOrder.setUser(cody)
  await cancelledOrder.setUser(cody)
  await inCartOrder.setUser(cody)

  await completedOrder.addProduct(dutchOven, {
    through: {quantity: 2, price: 2.99}
  })
  await completedOrder.addProduct(whisk, {
    through: {quantity: 1, price: 2.99}
  })
  await completedOrder.addProduct(bastingBrushes, {
    through: {quantity: 6, price: 2.99}
  })

  await cody.hasAddress(address)

  const newReviews = await Promise.all(
    reviewsSeedData.map(newReview => {
      return Review.create(newReview)
    })
  )


  //seed orders
  const orderStatusChoices = [
    'Created',
    'Processing',
    'Cancelled',
    'Completed',
    'In Cart'
  ]

  const newOrders = await Promise.all(
    Array(200)
      .fill(null)
      .map(() => {
        const randomChoice = Math.round(
          Math.random() * (orderStatusChoices.length - 1)
        )

        const newOrder = {status: orderStatusChoices[randomChoice]}

        return Order.create(newOrder)
      })
  )

  await Promise.all(
    newOrders.map(orderToAssign => {
      const randomUserIdx = Math.round(Math.random() * (newUsers.length - 1))
      const randomUser = newUsers[randomUserIdx]
      return orderToAssign.setUser(randomUser)
    })
  )

  await Promise.all(
    newOrders.map(orderToPopulate => {
      const numberProducts = Math.round(Math.random() * 14) + 1
      const alreadyOrdered = {}
      return Array(numberProducts)
        .fill(null)
        .map(() => {
          let randomProductIdx
          do {
            randomProductIdx = Math.round(
              Math.random() * (newProducts.length - 1)
            )
          } while (alreadyOrdered[randomProductIdx])
          alreadyOrdered[randomProductIdx] = true
          const randomProduct = newProducts[randomProductIdx]

          const productQuantity = Math.round(Math.random() * 19) + 1

          const newOrderedProduct = {
            quantity: productQuantity,
            price: randomProduct.price
          }

          return orderToPopulate.addProduct(randomProduct, {
            through: newOrderedProduct
          })
        })
    })
  )

  await dutchOven.addCategory(category)

  await Promise.all(
    newReviews.map(reviewToAssign => {
      const randomUserIdx = Math.round(Math.random() * (newUsers.length - 1))
      const randomUser = newUsers[randomUserIdx]
      return reviewToAssign.setUser(randomUser)
    })
  )

  await Promise.all(
    newReviews.map(reviewToAssign => {
      const randomProductIdx = Math.round(
        Math.random() * (newProducts.length - 1)
      )
      const randomProduct = newProducts[randomProductIdx]

      return reviewToAssign.setProduct(randomProduct)
    })
  )

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
