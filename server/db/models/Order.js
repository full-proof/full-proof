const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  shipStatus: Sequelize.BOOLEAN,
  defaultValue: false
})

module.exports = Order
