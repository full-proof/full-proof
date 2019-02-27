const Sequelize = require('sequelize')
const db = require('../db')

const OrderedProducts = db.define('orderedProducts', {
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = OrderedProducts
