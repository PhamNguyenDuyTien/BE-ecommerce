const UserRouter = require('./UserRouter')
const BrandRouter = require('./BrandRouter')
const CategoryRouter = require('./CategoryRouter')
const ProductRouter = require('./ProductRouter')
// const OrderRouter = require('./OrderRouter')
// const PaymentRouter = require('./PaymentRouter')

const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/brand', BrandRouter)
    app.use('/api/category', CategoryRouter)
    app.use('/api/product', ProductRouter)
    // app.use('/api/order', OrderRouter)
    // app.use('/api/payment', PaymentRouter)
}

module.exports = routes