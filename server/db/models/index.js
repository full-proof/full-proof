const User = require('./User')
const Address = require('./Address')
const UserAddress = require('./UserAddress')
const Product = require('./Product')
const Order = require('./Order')
const Category = require('./Category')
const Review = require('./Review')
const OrderedProducts = require('./OrderedProducts')

User.belongsToMany(Address, {through: UserAddress})
Address.belongsToMany(User, {through: UserAddress})

Product.belongsToMany(Order, {through: OrderedProducts})
Order.belongsToMany(Product, {through: OrderedProducts})

Order.belongsTo(User)
User.hasMany(Order)

Product.belongsToMany(Category, {through: 'ProductsWithCategories'})
Category.belongsToMany(Product, {through: 'ProductsWithCategories'})

Product.hasMany(Review)
Review.belongsTo(Product)

User.hasMany(Review)
Review.belongsTo(User)

module.exports = {
  User,
  Address,
  UserAddress,
  Order,
  Product,
  Category,
  Review,
  OrderedProducts
}
