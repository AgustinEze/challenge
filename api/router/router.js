import express from 'express'
import userRoutes from '../router/routes/user.route.js'
import paymentRoutes from '../router/routes/paymet.route.js'

const router = express.Router()

router.use('/user', userRoutes)
router.use('/payments',paymentRoutes)

export default router
