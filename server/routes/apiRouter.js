const router = require('express').Router()

const userRouter = require('./user')
const authRouter = require('./auth')
const stockRouter = require('./stock')
const nearbySearchRouter = require('./nearbySearch')

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/stock', stockRouter)
router.use('/nearbySearch', nearbySearchRouter)

module.exports = router