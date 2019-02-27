const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll()
    res.json(allOrders)
  } catch (err) {
    next(err)
  }
})

function loginRequered (req, res, next) {
  if (req.user) {
    next()
  }
  else {
    res.sendStatus(401)
  }
}
router.get('/:id', loginRequered, async (req, res, next) => {
  // req.user
  try {
    User.hasAccessTo(Order, { through: BuyingGroup })
    aUser.canAccessOrder(anOrder)
    const order = await Order.findOne({
      where: {
        id: req.params.id,
      },
      include: [{
        model: BuyingGroup,
        include: [{
          model: User,
          required: true,
          where: {
            id: req.user.id
          }
        }]
      }]
    })

    const order = await Order.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    })
    if (order) {
      res.json(order)
    }
    else {
      res.sendStatus(403)
    }

    const order = await Order.findById(req.params.id)
    if (order.userId === req.user.id) {
      res.json(order)
    }
    else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    // REVIEW: req.body danger zone
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
