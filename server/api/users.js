const router = require('express').Router()
const {adminOnly, userAndAdminOnly} = require('./utilities')
const pick = require('lodash.pick')
const {User, Order, Product} = require('../db/models')
module.exports = router

router.get('/', adminOnly, async (req, res, next) => {
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

router.get('/:id', userAndAdminOnly, async (req, res, next) => {
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

router.get('/:id/orders', userAndAdminOnly, async (req, res, next) => {
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

const userUpdatableFields = ['name']
const adminUpdatableFields = [
  ...userUpdatableFields,
  'isAdmin',
  'passwordExpired'
]

router.put('/:id', userAndAdminOnly, async (req, res, next) => {
  const id = req.params.id
  let updateInfo
  try {
    if (req.user.isAdmin) {
      updateInfo = pick(req.body, adminUpdatableFields)
    } else {
      updateInfo = pick(req.body, userUpdatableFields)
    }
    const user = await User.findById(id)
    const updatedUser = await user.update(updateInfo)
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', adminOnly, async (req, res, next) => {
  // This is adminOnly because, at least right now, users do no have the ability to delete their accounts.
  const id = req.params.id
  try {
    await User.destroy({where: {id}})
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
