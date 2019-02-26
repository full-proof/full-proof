const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address_line1: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address_line2: {
    type: Sequelize.STRING
  },
  city_province: {
    type: Sequelize.STRING,
    allowNull: false
  },
  postalCode: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Address
