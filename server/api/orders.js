const router = require('express').Router()
const {adminOnly, userAndAdminOnly} = require('./utilities')
const pick = require('lodash.pick')
const {Order, User, Product} = require('../db/models')
module.exports = router

router.get('/', adminOnly, async (req, res, next) => {
  try {
    const allOrders = await Order.findAll({
      include: [User]
    })
    res.json(allOrders)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', userAndAdminOnly, async (req, res, next) => {
  // We might want to change this to admin only, and make it so that authorized users only view their orders when viewing their own profiles.
  try {
    const order = await Order.findById(req.params.id, {
      include: [User, Product]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.post('/', userAndAdminOnly, async (req, res, next) => {
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

const adminUpdatableFields = ['status']

router.put('/:id', adminOnly, async (req, res, next) => {
  // Currently, only admin can update an order—but I've made it so that, should we decide that user's can update an order as well, it would be easy to refactor accordingly.
  const id = req.params.id
  let updateInfo
  try {
    if (req.user.isAdmin) {
      updateInfo = pick(req.body, adminUpdatableFields)
      const order = await Order.findById(id)
      await order.update(updateInfo)
      const updatedOrder = await Order.findById(id, {
        include: [User, Product]
      })
      res.json(updatedOrder)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', userAndAdminOnly, async (req, res, next) => {
  try {
    await Order.findById(req.params.id)
    res.sendStatus(202)
  } catch (err) {
    next(err)
  }
})
