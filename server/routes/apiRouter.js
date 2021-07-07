const router = require('express').Router()

const userRouter = require('./user')
const authRouter = require('./auth')
const stockRouter = require('./stock')

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/stock', stockRouter)

module.exports = router