const adminOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    // Do I need req.user in the condiitional?
    next()
  } else {
    res.sendStatus(404)
  }
}

const userAndAdminOnly = (req, res, next) => {
  // REVIEW: when would this throw an error?
  const userId = req.user.id
  // REVIEW: what will this ever be false?
  if (req.user.id === userId || (req.user && req.user.isAdmin)) {
    next()
  } else {
    res.sendStatus(404)
  }
}

module.exports = {adminOnly, userAndAdminOnly}
