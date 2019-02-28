const router = require('express').Router()
const {Order, User, Product, OrderedProducts} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll({
      include: [User]
    })
    res.json(allOrders)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    console.log('this is the api route')

    const order = await Order.findById(req.params.id, {
      include: [{model: User}]
    })
    const products = await order.getProducts()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body)
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Order.findById(req.params.id)
    res.sendStatus(202)
  } catch (err) {
    next(err)
  }
})
