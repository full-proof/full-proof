const adminOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    // Do I need req.user in the condiitional?
    next()
  } else {
    res.sendStatus(404)
  }
}

const userAndAdminOnly = (req, res, next) => {
  const userId = req.user.id
  if (req.user.id === userId || (req.user && req.user.isAdmin)) {
    next()
  } else {
    res.sendStatus(404)
  }
}

module.exports = {adminOnly, userAndAdminOnly}
