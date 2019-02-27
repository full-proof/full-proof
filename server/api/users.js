const router = require('express').Router()
const {User} = require('../db/models')
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

const updatableFields = ['firstName', 'lastName', 'age']
const adminUpdatableFields = [...updatedUser, 'isAdmin']

req.body === {firstName: 'collin'}
req.body === {firstName: ''}
req.body === {firstName: undefined}
req.body === {}
userRecord.update({
  firstName: undefined,
  lastName: 'Miller',
})
userRecord.update({
  lastName: 'Miller'
})
router.put('/:id', async (req, res, next) => {
  const id = req.params.id
  let updateInfo
  if (req.user.isAdmin) {
    updateInfo = pick(req.body, adminUpdatableFields)
  }
  else {
    updateInfo = pick(req.body, updatableFields)
  }
  // { isAdmin: true }
  // { createdAt: <1000 years ago> }
  try {
    const user = await User.findById(id)
    const updatedUser = await user.update(updateInfo)
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
})

// ../util.js
function requireAdmin (req, res, next) {
  if (req.user && req.user.isAdmin) {
    next()
  }
  else {
    res.sendStatus(403)
  }
}


router.delete('/:id', requireAdmin, async (req, res, next) => {
  // REVIEW: access control
  const id = req.params.id
  try {
    await User.destroy({where: {id}})
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})



