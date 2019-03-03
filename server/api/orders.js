const router = require('express').Router()
const {Order, User, Product} = require('../db/models')
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
    const order = await Order.findById(req.params.id, {
      include: [User, Product]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const userSession = req.session.id
    const currentProduct = req.body.singleProduct
    const quantity = req.body.quantity
    // see if we can eager load order associations here
    const response = await Order.findOrCreate({
      where: {session: userSession},
      defaults: {status: 'In Cart', session: userSession}
    })
    const currentOrder = response[0]
    const magicProduct = await Product.findById(currentProduct.id)
    await currentOrder.addProduct(magicProduct, {
      through: {quantity: quantity, price: magicProduct.price}
    })
    res.json(currentOrder)
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
