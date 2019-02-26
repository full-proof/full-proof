const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    //make sure it logs two decimal places for dollar amount
    type: Sequelize.FLOAT,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: Sequelize.TEXT,
  imgUrl: Sequelize.STRING
})

module.exports = Product

Product.prototype.decrementQuantity = function(num) {
  return Product.quantity = Product.quantity - num
}
