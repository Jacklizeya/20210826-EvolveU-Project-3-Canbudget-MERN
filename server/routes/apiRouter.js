const router = require('express').Router()

const userRouter = require('./user')
const authRouter = require('./auth')
const stockRouter = require('./stock')
const nearbySearchRouter = require('./nearbySearch')
const textSearchRouter = require('./textSearch')
const plaidRouter = require(`./plaid`)
const settingsRouter = require(`./settings`)


router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/stock', stockRouter)
router.use('/nearbySearch', nearbySearchRouter)
router.use('/textSearch', textSearchRouter)
router.use('/plaid', plaidRouter)
router.use('/settings', settingsRouter)

module.exports = router