const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'This product has no description.'
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: '/dutch-oven.jpg'
  }
})

module.exports = Product

Product.prototype.decrementQuantity = function(num) {
  if (Product.quantity > num) {
    Product.quantity = Product.quantity - num
    return Product.quantity
  }
}
