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
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  state_province: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  postalCode: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Address
