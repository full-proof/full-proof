const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'name', 'isAdmin', 'passwordExpired']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const user = await User.findOne({
      where: {id},
      attributes: ['name', 'email', 'isAdmin']
      // Include orders in the future...
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/orders', async (req, res, next) => {
  const id = req.params.id
  try {
    const orders = await Order.findAll({
      where: {userId: id},
      include: [Product],
      attributes: ['id', 'status', 'createdAt']
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  const id = req.params.id
  const updateInfo = req.body
  try {
    const user = await User.findById(id)
    const updatedUser = await user.update(updateInfo)
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    await User.destroy({where: {id}})
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
