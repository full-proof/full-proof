/* eslint-disable camelcase */
const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
  address_line1: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  address_line2: {
    type: Sequelize.STRING
  },
  city_province: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  postalCode: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Address
