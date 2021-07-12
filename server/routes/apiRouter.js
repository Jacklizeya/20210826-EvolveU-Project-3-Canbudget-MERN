const router = require('express').Router()

const userRouter = require('./user')
const authRouter = require('./auth')
const stockRouter = require('./stock')
const nearbySearchRouter = require('./nearbySearch')
const textSearchRouter = require('./textSearch')

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/stock', stockRouter)
router.use('/nearbySearch', nearbySearchRouter)
router.use('/textSearch', textSearchRouter)

module.exports = router