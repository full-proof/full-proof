const Sequelize = require('sequelize')
const db = require('../db')

const OrderedProducts = db.define('orderedProducts', {
  // REVIEW: floats
  price: {
    type: Sequelize.FLOAT,
    // INTEGER
    // DECIMAL(10,2)
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = OrderedProducts
