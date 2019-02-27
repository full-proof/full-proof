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
    // Make sure it logs two decimal places for dollar amount
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0
  },

  //try {
  //  const result = await sequelize.transaction(async function (t) => {
  //    const aProduct = await Product.findByPk(1, { transation: t })
  //    await aProduct.update({
  //      quantity: aProduct.quantity + 10
  //    }, { transaction: t })
  //  })
  //}
  //catch (err) {
  //  // res.send(xxx)
  //}


  // REVIEW: discuss inventory
  // aProduct.update({ quantity: 100 })
  // if (we have enough) {
  //   aProduct.update({ quantity: aProduct.quantity - order.quantity })
  // }
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
    defaultValue: 'bread.jpg'
  }
})

module.exports = Product

Product.prototype.decrementQuantity = function(num) {
  if (Product.quantity > num) {
    Product.quantity = Product.quantity - num
    return Product.quantity
  }
}
