const Sequelize = require('sequelize')
const db = require('../db')

const UserAddress = db.define('userAddress', {
  type: {
    type: Sequelize.ENUM('billing', 'shipping'),
    allowNull: false
  }
})

module.exports = UserAddress
