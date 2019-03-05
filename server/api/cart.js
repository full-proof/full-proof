const router = require('express').Router()
const {Order, Product} = require('../db/models')
module.exports = router

// find a specific cart
router.get('/:userId', (req, res, next) => {
  try {
    if (req.params.userId === 'undefined') {
      Order.findOrCreate({
        where: {session: req.session.id, status: 'In Cart'},
        include: [Product]
      }).spread((cart, created) => {
        if (created) {
          cart.session = req.session.id
          cart.save()
        }
        res.json(cart)
      })
    } else {
      Order.findOrCreate({
        where: {userId: req.params.userId, status: 'In Cart'},
        include: [Product]
      }).spread((cart, created) => {
        if (created) {
          cart.userId = req.params.userId
          cart.save()
        }
        res.json(cart)
      })
    }
  } catch (err) {
    next(err)
  }
})

// adding a product
router.put('/:userId', async (req, res, next) => {
  try {
    const singleProduct = req.body.singleProduct
    const quantity = req.body.quantity

    if (req.params.userId === 'undefined') {
      const cart = await Order.findOrCreate({
        where: {session: req.session.id},
        include: [Product]
      })
      const userCart = cart[0]
      const magicProduct = await Product.findById(singleProduct.id)
      if (quantity === 0) await userCart.removeProduct(magicProduct)
      else
        await userCart.addProduct(magicProduct, {
          through: {
            quantity: quantity,
            price: Number(magicProduct.price) * quantity
          }
        })
      res.json(userCart)
    } else {
      const cart = await Order.findOrCreate({
        where: {userId: req.params.userId, status: 'In Cart'},
        include: [Product]
      })
      const userCart = cart[0]
      const magicProduct = await Product.findById(singleProduct.id)
      if (quantity === 0) await userCart.removeProduct(magicProduct)
      else
        await userCart.addProduct(magicProduct, {
          through: {
            quantity: quantity,
            price: Number(magicProduct.price) * quantity
          }
        })
      res.json(userCart)
    }
  } catch (err) {
    next(err)
  }
})
