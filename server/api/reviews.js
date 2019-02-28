const router = require('express').Router()
const {Review} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allReviews = await Review.findAll()
    res.json(allReviews)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id)
    res.json(review)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const tempReview = Review.build({
      content: req.body.review.content,
      rating: req.body.review.rating
    })
    tempReview.setProduct(req.body.productId)
    tempReview.setUser(req.body.userId)

    const newReview = await tempReview.save()
    res.json(newReview)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Review.findById(req.params.id)
    res.sendStatus(202)
  } catch (err) {
    next(err)
  }
})
