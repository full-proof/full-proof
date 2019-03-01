const Sequelize = require('sequelize')
const db = require('../db')

const OrderedProducts = db.define('orderedProducts', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

module.exports = OrderedProducts
