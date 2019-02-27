const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM(
      'Created',
      'Processing',
      'Cancelled',
      'Completed',
      'In Cart'
    )
  }
})

module.exports = Order
