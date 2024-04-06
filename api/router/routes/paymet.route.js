import express from 'express'
import {PaymentController} from '../../controllers/payment.controller.js'
const router = express.Router()

const paymentController = new PaymentController()

router.post('/create', async(req, res) => {
    
        try {

            const payment = await paymentController.createPayment(req)
            return res.json(payment)
        } catch (error) {
            return res.status(500).json({
                error: "Error al crear un pago",
                message: error.message
            })
        }

})


// Ruta para traer todos los pagos
router.get('/all/:user_id', async (req, res) => {
    try {
        const payments =await  paymentController.getAllPayments(req)
        return res.json(payments)
    } catch (error) {
        return res.status(500).json({
            error: "Ocurrio un error al buscar los pagos",
            message: error.message
        })
    }
    
})
// Ruta para buscar un pago por su ID
router.get('/:user_id/:payment_id',async (req, res) => {

    try {
        const payment = await paymentController.getPaymentById(req)
        return res.json(payment)
    } catch (error) {
        return res.status(500).json({
            error: "Ocurrio un error al buscar el pago solicitado",
            message: error.message
        })
    }

})

export default router